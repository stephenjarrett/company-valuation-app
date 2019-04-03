import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard/dashboard.routing';
import { companyRoutes } from './company/company.routing';

const routes: Routes = [
  ...dashboardRoutes,
  // ...analyticsRoutes,
  ...companyRoutes
  // { path: '', component: DashboardComponent, pathMatch: 'full' }
  // { path: "**", component: PageNotFoundComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
