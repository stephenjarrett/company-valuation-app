import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard/dashboard.routing';
import { companyRoutes } from './company/company.routing';
import { compareRoutes } from './compare/compare.routing';

const routes: Routes = [...dashboardRoutes, ...companyRoutes, ...compareRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
