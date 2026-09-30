import { Component, computed, input } from '@angular/core';
import { Disciplina, siglaDe } from '../../core/disciplina.model';

@Component({
  selector: 'app-capa-disciplina',
  templateUrl: './capa-disciplina.html',
  styleUrl: './capa-disciplina.scss',
})
export class CapaDisciplina {
  d = input.required<Disciplina>();
  sigla = computed(() => this.d().sigla ?? siglaDe(this.d().nome));
  capa = computed(() => {
    const img = this.d().imagemCapa;
    return img ? `url(${img})` : null;
  });
}