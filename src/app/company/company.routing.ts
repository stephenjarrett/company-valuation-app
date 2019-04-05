import { Routes } from '@angular/router';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';

export const companyRoutes: Routes = [
  {
    path: 'company',
    children: [
      {
        path: 'create',
        component: CompanyDetailsComponent,
        data: {
          creating: true
        }
      },
      {
        path: ':id',
        component: CompanyDetailsComponent,
        data: {
          creating: false
        }
      }
    ]
  }
];
