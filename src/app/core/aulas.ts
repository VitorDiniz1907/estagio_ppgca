import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AULAS } from './aulas.data';

@Injectable({ providedIn: 'root' })
export class Aulas {
  private readonly ehBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly aulas = AULAS;
  readonly totalTopicos = this.aulas.flatMap(a => a.topicos).length;

  private readonly concluidos = signal<string[]>(this.carregar());
  readonly percentual = computed(() =>
    Math.round((this.concluidos().length / this.totalTopicos) * 100));

  concluido(slug: string) {
    return this.concluidos().includes(slug);
  }

  alternar(slug: string) {
    this.concluidos.update(l =>
      l.includes(slug) ? l.filter(s => s !== slug) : [...l, slug]);
    if (this.ehBrowser) {
      localStorage.setItem('progresso', JSON.stringify(this.concluidos()));
    }
  }

  private carregar(): string[] {
    if (!this.ehBrowser) return [];
    try { return JSON.parse(localStorage.getItem('progresso') ?? '[]'); }
    catch { return []; }
  }
}