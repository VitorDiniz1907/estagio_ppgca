import { Component, input } from '@angular/core';
import { DadosPerspectivas, TipoModelo } from '../../core/aulas.model';

@Component({
  selector: 'app-perspectivas-modelo',
  templateUrl: './perspectivas-modelo.html',
  styleUrl: './perspectivas-modelo.scss',
})
export class PerspectivasModelo {
  dados = input.required<DadosPerspectivas>();

  rotulos: Record<TipoModelo, string> = {
    contexto: 'Contexto',
    interacao: 'Interação',
    estrutura: 'Estrutura',
    comportamento: 'Comportamento',
  };
}