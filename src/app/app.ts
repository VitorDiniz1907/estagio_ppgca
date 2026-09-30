import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CapaDisciplina } from './components/capa-disciplina/capa-disciplina';
import { ENGENHARIA_SOFTWARE } from './core/disciplinas.data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CapaDisciplina],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  disciplina = ENGENHARIA_SOFTWARE;
}