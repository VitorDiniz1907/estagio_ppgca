import { Component, computed, input } from '@angular/core';
import { DadosContexto } from '../../core/aulas.model';

@Component({
  selector: 'app-diagrama-contexto',
  templateUrl: './diagrama-contexto.html',
  styleUrl: './diagrama-contexto.scss',
})
export class DiagramaContexto {
  dados = input.required<DadosContexto>();

  readonly largura = 760;
  readonly caixaL = 150;
  readonly sisX = 300;
  readonly sisL = 160;
  readonly espaco = 36;
  readonly pad = 30;

  layout = computed(() => {
    const d = this.dados();

    const monta = (lado: 'esq' | 'dir') =>
      d.vizinhos
        .filter(v => v.lado === lado)
        .map(v => ({ ...v, h: Math.max(52, v.fluxos.length * 34 + 18) }));
    const grupos = { esq: monta('esq'), dir: monta('dir') };

    const total = (g: { h: number }[]) =>
      g.reduce((s, v) => s + v.h, 0) + Math.max(0, g.length - 1) * this.espaco;
    const altura = Math.max(total(grupos.esq), total(grupos.dir), 200) + 2 * this.pad;

    const posiciona = (lado: 'esq' | 'dir') => {
      const g = grupos[lado];
      let y = (altura - total(g)) / 2;
      const x = lado === 'esq' ? 10 : this.largura - 10 - this.caixaL;
      const borda = lado === 'esq' ? x + this.caixaL : x;
      const sis = lado === 'esq' ? this.sisX : this.sisX + this.sisL;

      return g.map(v => {
        const topo = y;
        y += v.h + this.espaco;
        const cy = topo + v.h / 2;
        const n = v.fluxos.length;
        const setas = v.fluxos.map((f, k) => {
          const yy = cy + (k - (n - 1) / 2) * 34;
          const [x1, x2] = f.sentido === 'entra' ? [borda, sis] : [sis, borda];
          return { x1, x2, y: yy, texto: f.texto, tx: (borda + sis) / 2 };
        });
        return {
          id: v.id, fora: !!v.fora, x, topo, h: v.h,
          cx: x + this.caixaL / 2, cy, setas, linhas: this.quebra(v.nome),
        };
      });
    };

    return {
      altura,
      vizinhos: [...posiciona('esq'), ...posiciona('dir')],
      linhas: this.quebra(d.sistema),
    };
  });

  /** Divide nomes longos em duas linhas equilibradas. */
  private quebra(t: string): string[] {
    const p = t.split(' ');
    if (t.length <= 18 || p.length < 2) return [t];
    let melhor = 1;
    let dif = Infinity;
    for (let i = 1; i < p.length; i++) {
      const a = p.slice(0, i).join(' ').length;
      const b = p.slice(i).join(' ').length;
      if (Math.abs(a - b) < dif) { dif = Math.abs(a - b); melhor = i; }
    }
    return [p.slice(0, melhor).join(' '), p.slice(melhor).join(' ')];
  }
}