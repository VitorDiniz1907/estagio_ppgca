import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/roteiro/roteiro').then(m => m.Roteiro) },
  { path: 'aula/:aula/:slug', loadComponent: () => import('./pages/topico/topico').then(m => m.Topico) },
  { path: '**', redirectTo: '' },
];