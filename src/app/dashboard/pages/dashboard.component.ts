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
    // get companies from json-server
    this.targetCompanyService
      .findAll()
      .subscribe((targetCompanies: TargetCompany[]) => {
        this.targetCompanies = targetCompanies;
      });
  }

  // TODO:
  // add ngUnsubscribes-takeUntil on destroy -> prevent memory leaks
  // utilize behavior subject for watching data changes?
  // Add duplicate company name validator
  // email and number format validation
  // add toggle button to switch between line and bar graph
  // use pie charts to display status/industry/size on compare?
  // calculate performance increase/decrease on graphs and display
  // compare.. select 2 or more companies and a financial stat to compare on bars graph. Easily toggle between dataSets and companies
  // make financial data more dynamic with the # of fields.. minimum of 3 year of data.. but add as many as you want
  // more/clean up CSS
}
