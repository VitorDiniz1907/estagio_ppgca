import { Component, inject } from '@angular/core';
import { Aulas } from '../../core/aulas';
import { DiagramaCasoDeUso } from '../../components/diagrama-caso-de-uso/diagrama-caso-de-uso';
import { TipoModelo } from '../../core/aulas.model';
import { DiagramaSequencia } from '../../components/diagrama-sequencia/diagrama-sequencia';
import { DiagramaContexto } from '../../components/diagrama-contexto/diagrama-contexto';
import { PerspectivasModelo } from '../../components/perspectivas-modelo/perspectivas-modelo';


@Component({
  selector: 'app-roteiro',
  templateUrl: './roteiro.html',
  styleUrl: './roteiro.scss',
  imports: [DiagramaCasoDeUso, DiagramaSequencia, DiagramaContexto, PerspectivasModelo],
})
export class Roteiro {
  svc = inject(Aulas);

  rotulos: Record<TipoModelo, string> = {
    contexto: 'Contexto',
    interacao: 'Interação',
    estrutura: 'Estrutura',
    comportamento: 'Comportamento',
  };

}