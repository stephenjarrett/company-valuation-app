import { FlattenedCompany } from './../../../shared/models/flattened-company.model';
import { TargetCompany } from 'src/app/shared/models/target-company.model';
import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { isNil } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() data: TargetCompany[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<FlattenedCompany>();
  pageSizeOptions: number[] = [10, 25, 50, 100, 250];
  // list of headers for mat data table
  displayedColumns: string[] = [
    'companyName',
    'status',
    'industry',
    'size',
    'city',
    'state'
  ];
  searchKey: any;

  constructor() {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (
      sortData: any,
      sortHeaderId: string
    ) => {
      return this.sortData(sortData, sortHeaderId);
    };
  }

  ngOnChanges() {
    // flatten nested object for easy filter/sort on mat data table
    const flattenedCompanyArray: FlattenedCompany[] = [];
    this.data.forEach((company: TargetCompany) => {
      flattenedCompanyArray.push({
        id: company.id,
        companyName: company.companyDetails.companyName,
        status: company.status,
        industry: company.companyDetails.companyIndustry,
        size: company.companyDetails.companySize,
        city: company.companyDetails.city,
        state: company.companyDetails.state
      });
    });
    this.dataSource.data = flattenedCompanyArray;
  }

  onSearchClear() {
    this.searchKey = '';
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  createFilter(columns: string[]): (data: any, filter: string) => boolean {
    return (data, filter): boolean => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < columns.length; i++) {
        let value = data[columns[i]];
        if (isNil(value)) {
          continue;
        }
        if (!isNaN(value)) {
          value = value.toString();
        }
        if (
          value
            .trim()
            .toLowerCase()
            .search(filter) !== -1
        ) {
          return true;
        }
      }
      return false;
    };
  }

  sortData(sortData: any, sortHeaderId: string) {
    if (typeof sortData[sortHeaderId] === 'string') {
      return sortData[sortHeaderId].toLowerCase();
    }

    return sortData[sortHeaderId];
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
