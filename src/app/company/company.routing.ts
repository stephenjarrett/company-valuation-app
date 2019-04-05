import { CompanyAnalyticsComponent } from './pages/company-analytics/company-analytics.component';
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
        children: [
          {
            path: 'analytics',
            component: CompanyAnalyticsComponent
          },
          {
            path: '',
            component: CompanyDetailsComponent,
            data: {
              creating: false
            }
          }
        ]
      }
    ]
  }
];
