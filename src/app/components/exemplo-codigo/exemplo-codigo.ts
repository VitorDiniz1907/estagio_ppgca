import { Component, input, signal } from '@angular/core';
import { DadosExemploCodigo } from '../../core/aulas.model';

@Component({
  selector: 'app-exemplo-codigo',
  templateUrl: './exemplo-codigo.html',
  styleUrl: './exemplo-codigo.scss',
})
export class ExemploCodigo {
  dados = input.required<DadosExemploCodigo>();
  copiado = signal(false);

  async copiar() {
    try {
      await navigator.clipboard.writeText(this.dados().codigo);
      this.copiado.set(true);
      setTimeout(() => this.copiado.set(false), 2000);
    } catch {
      // Sem permissão para a área de transferência: o texto pode ser selecionado à mão.
    }
  }
}