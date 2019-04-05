import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TargetCompanyService } from 'src/app/shared/services/target-company.service';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';
import { CompanyAnalyticsComponent } from './pages/company-analytics/company-analytics.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';

@NgModule({
  declarations: [
    CompanyDetailsComponent,
    CompanyAnalyticsComponent,
    BarChartComponent,
    PieChartComponent,
    LineChartComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  providers: [TargetCompanyService],
  entryComponents: [SnackbarComponent]
})
export class CompanyModule {}
