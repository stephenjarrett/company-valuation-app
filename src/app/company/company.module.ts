import { IndustryService } from './../shared/services/industry.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TargetCompanyService } from 'src/app/shared/services/target-company.service';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';

@NgModule({
  declarations: [CompanyDetailsComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  providers: [TargetCompanyService, IndustryService]
})
export class CompanyModule {}
