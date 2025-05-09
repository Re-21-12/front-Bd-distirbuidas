import { Routes } from '@angular/router';

export const routes: Routes = [

{
  path: '',
  loadComponent: () => import('./core/pages/home/home.component').then(m => m.HomeComponent),
  data: {
    title: 'Home'
}
}
];
