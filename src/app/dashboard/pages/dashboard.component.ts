import { TargetCompanyService } from 'src/app/shared/services/target-company.service';
import { Component, OnInit } from '@angular/core';
import { TargetCompany } from 'src/app/shared/models/target-company.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  targetCompanies: TargetCompany[] = [];

  constructor(private targetCompanyService: TargetCompanyService) {}

  ngOnInit() {
    this.getTargetCompanies();
  }

  getTargetCompanies() {
    this.targetCompanyService
      .findAll()
      .subscribe((targetCompanies: TargetCompany[]) => {
        console.log(targetCompanies);
        this.targetCompanies = targetCompanies;
      });
  }
}
