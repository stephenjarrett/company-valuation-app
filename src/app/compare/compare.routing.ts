import { CompareComponent } from './pages/compare/compare.component';
import { Routes } from '@angular/router';

export const compareRoutes: Routes = [
  {
    path: 'compare',
    children: [
      {
        path: '',
        component: CompareComponent,
        data: {}
      }
    ]
  }
];
