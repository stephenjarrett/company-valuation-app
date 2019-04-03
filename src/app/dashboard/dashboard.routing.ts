import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';

export const dashboardRoutes: Routes = [
    {
        path: '',
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
            // {
            //     path: ':id',
            //     component: PeopleComponent,
            //     data: {
            //         authorities: ['ADMIN', 'PEOPLE_ADMIN', 'PEOPLE_VIEW', 'PEOPLE_EDIT'],
            //         detailAuth: {
            //             edit: ['ADMIN', 'PEOPLE_ADMIN', 'PEOPLE_EDIT'],
            //             delete: ['ADMIN', 'PEOPLE_ADMIN', 'PEOPLE_EDIT'],
            //             viewSensitive: ['ADMIN', 'PEOPLE_SENSITIVE']
            //         }
            //     },
            //     canActivate: [RouteAccessGuard],
            // },
            {
                path: '',
                component: DashboardComponent,
                data: {
                },
            },
        ]
    }
];
