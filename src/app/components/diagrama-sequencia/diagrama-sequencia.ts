import { Component, computed, input } from '@angular/core';
import { DadosSequencia, MensagemSeq } from '../../core/aulas.model';

@Component({
  selector: 'app-diagrama-sequencia',
  templateUrl: './diagrama-sequencia.html',
  styleUrl: './diagrama-sequencia.scss',
})
export class DiagramaSequencia {
  dados = input.required<DadosSequencia>();

  readonly largura = 720;
  readonly margem = 90;
  readonly caixaL = 140;
  readonly caixaA = 36;

  layout = computed(() => {
    const d = this.dados();
    const n = d.participantes.length;
    const passoX = n > 1 ? (this.largura - 2 * this.margem) / (n - 1) : 0;

    const participantes = d.participantes.map((p, i) => ({
      ...p,
      x: n > 1 ? this.margem + i * passoX : this.largura / 2,
    }));
    const xDe = new Map(participantes.map(p => [p.id, p.x]));

    const mensagens: {
      x1: number; x2: number; y: number; texto: string;
      retorno: boolean; auto: boolean; tx: number; caminho: string;
    }[] = [];
    const fragmentos: {
      topo: number; fim: number; condicao: string;
      divisores: { y: number; condicao: string }[];
    }[] = [];

    let y = 90;

    const empilha = (m: MensagemSeq) => {
      const x1 = xDe.get(m.de);
      const x2 = xDe.get(m.para);
      if (x1 === undefined || x2 === undefined) return;
      const auto = m.de === m.para;
      mensagens.push({
        x1, x2, y, texto: m.texto,
        retorno: !!m.retorno,
        auto,
        tx: auto ? x1 + 44 : (x1 + x2) / 2,
        caminho: auto ? `M${x1} ${y} H${x1 + 36} V${y + 22} H${x1}` : '',
      });
      y += auto ? 56 : 46;
    };

    for (const passo of d.passos) {
      if ('alt' in passo) {
        const topo = y - 20;
        const divisores: { y: number; condicao: string }[] = [];
        y = topo + 46;
        passo.alt.forEach((op, i) => {
          if (i > 0) {
            const dv = y - 20;
            divisores.push({ y: dv, condicao: op.condicao });
            y = dv + 46;
          }
          op.mensagens.forEach(empilha);
        });
        fragmentos.push({ topo, fim: y - 18, condicao: passo.alt[0].condicao, divisores });
        y += 4;
      } else {
        empilha(passo);
      }
    }

    return { altura: y + 10, participantes, mensagens, fragmentos };
  });
}