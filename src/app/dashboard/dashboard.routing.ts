import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {}
      }
    ]
  }
];
