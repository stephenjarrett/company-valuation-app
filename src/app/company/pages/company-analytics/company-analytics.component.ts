import { FinancialDataPoint } from './../../../shared/models/financial-data-point.model';
import { Component, OnInit } from '@angular/core';
import { TargetCompanyService } from 'src/app/shared/services/target-company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TargetCompany } from 'src/app/shared/models/target-company.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-company-analytics',
  templateUrl: './company-analytics.component.html',
  styleUrls: ['./company-analytics.component.scss']
})
export class CompanyAnalyticsComponent implements OnInit {
  companyId: number;
  company: TargetCompany;
  assets: FinancialDataPoint[];
  liabilities: FinancialDataPoint[];
  salesRevenue: FinancialDataPoint[];
  profitMargin: FinancialDataPoint[];
  operatingCosts: FinancialDataPoint[];
  chartData = {};
  financialDataTypes = [
    { type: 'assets', name: 'Assets' },
    { type: 'liabilities', name: 'Liabilities' },
    { type: 'profitMargin', name: 'Profit Margin' },
    { type: 'salesRevenue', name: 'Sales Revenue' },
    { type: 'operatingCosts', name: 'Operating Costs' }
  ];

  constructor(
    private targetCompanyService: TargetCompanyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCompanyDetails();
  }

  getCompanyDetails(): void {
    this.companyId = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    this.targetCompanyService.findById(this.companyId).subscribe(
      (data: TargetCompany) => {
        this.financialDataTypes.forEach(dataType => {
          this.chartData[dataType.type] = data.companyFinancials[dataType.type];
        });
        this.company = data;
        this.assets = data.companyFinancials.assets;
        this.liabilities = data.companyFinancials.liabilities;
        this.salesRevenue = data.companyFinancials.salesRevenue;
        this.profitMargin = data.companyFinancials.profitMargin;
        this.operatingCosts = data.companyFinancials.operatingCosts;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
