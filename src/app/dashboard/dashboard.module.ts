import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TargetCompanyService } from 'src/app/shared/services/target-company.service';
import { DashboardComponent } from './pages/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  providers: [TargetCompanyService]
})
export class DashboardModule {}
