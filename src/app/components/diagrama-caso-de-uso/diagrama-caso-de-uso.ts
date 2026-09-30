import { Component, computed, input } from '@angular/core';
import { DadosCasoDeUso } from '../../core/aulas.model';

@Component({
  selector: 'app-diagrama-caso-de-uso',
  templateUrl: './diagrama-caso-de-uso.html',
  styleUrl: './diagrama-caso-de-uso.scss',
})
export class DiagramaCasoDeUso {
  dados = input.required<DadosCasoDeUso>();

  readonly largura = 720;
  readonly cx = 360;
  readonly rx = 110;
  readonly ry = 26;
  readonly passo = 84;

  layout = computed(() => {
    const d = this.dados();
    const n = d.casos.length;
    const altura = 80 + (n - 1) * this.passo + 60;

    const casos = d.casos.map((c, i) => ({ ...c, x: this.cx, y: 80 + i * this.passo }));
    const casoPor = new Map(casos.map(c => [c.id, c]));

    const atores = (['esq', 'dir'] as const).flatMap(lado => {
      const grupo = d.atores.filter(a => a.lado === lado);
      return grupo.map((a, k) => ({
        ...a,
        x: lado === 'esq' ? 70 : this.largura - 70,
        y: (altura * (k + 1)) / (grupo.length + 1),
      }));
    });
    const atorPor = new Map(atores.map(a => [a.id, a]));

    const associacoes = d.associacoes.flatMap(r => {
      const a = atorPor.get(r.ator);
      const c = casoPor.get(r.caso);
      if (!a || !c) return [];
      const inicio = { x: a.lado === 'esq' ? a.x + 16 : a.x - 16, y: a.y - 8 };
      const fim = this.borda(c, inicio);
      return [{ x1: inicio.x, y1: inicio.y, x2: fim.x, y2: fim.y }];
    });

    const relacoes = (d.relacoes ?? []).flatMap(r => {
      const de = casoPor.get(r.de);
      const para = casoPor.get(r.para);
      if (!de || !para) return [];
      const p1 = this.borda(de, para);
      const p2 = this.borda(para, de);
      return [{
        x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
        rotulo: `«${r.tipo}»`,
        lx: (p1.x + p2.x) / 2 + 8,
        ly: (p1.y + p2.y) / 2 + 4,
      }];
    });

    return { altura, casos, atores, associacoes, relacoes };
  });

  /** Ponto onde a reta do centro da elipse até o alvo encosta na borda dela. */
  private borda(c: { x: number; y: number }, alvo: { x: number; y: number }) {
    const dx = alvo.x - c.x;
    const dy = alvo.y - c.y;
    const t = 1 / Math.sqrt((dx / this.rx) ** 2 + (dy / this.ry) ** 2);
    return { x: c.x + dx * t, y: c.y + dy * t };
  }
}