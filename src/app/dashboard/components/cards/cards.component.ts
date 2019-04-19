import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { TargetCompany } from 'src/app/shared/models/target-company.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnChanges {
  @Input() targetCompanies: TargetCompany[] = [];
  filteredCompanies: TargetCompany[] = [];
  searchKey: string;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    // could use subject?
    this.filteredCompanies = this.targetCompanies;
  }

  applyFilter() {
    this.filteredCompanies = this.targetCompanies.filter(
      (company: TargetCompany) => {
        return company.companyDetails.companyName
          .toLowerCase()
          .includes(this.searchKey.toLowerCase());
      }
    );
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
}
