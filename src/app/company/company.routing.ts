import { Routes } from '@angular/router';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';

export const companyRoutes: Routes = [
  {
    path: 'company',
    children: [
      // {
      //     path: 'create',
      //     component: PeopleComponent,
      //     data: {
      //         authorities: ['ADMIN', 'PEOPLE_ADMIN', 'PEOPLE_EDIT'],
      //         detailAuth: {
      //             edit: ['ADMIN', 'PEOPLE_ADMIN', 'PEOPLE_EDIT'],
      //             delete: ['ADMIN', 'PEOPLE_ADMIN', 'PEOPLE_EDIT'],
      //             viewSensitive: ['ADMIN', 'PEOPLE_SENSITIVE']
      //         }
      //     },
      //     canActivate: [RouteAccessGuard],
      // },
      {
        path: ':id',
        component: CompanyDetailsComponent,
        data: {}
      }
      // },
      // {
      //   path: '',
      //   component: DashboardComponent,
      //   data: {}
      // }
    ]
  }
];
