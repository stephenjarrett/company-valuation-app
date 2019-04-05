import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TargetCompanyService } from 'src/app/shared/services/target-company.service';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';

@NgModule({
  declarations: [CompanyDetailsComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  providers: [TargetCompanyService],
  entryComponents: [SnackbarComponent]
})
export class CompanyModule {}
