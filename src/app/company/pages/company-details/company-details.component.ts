import { Observable } from 'rxjs';
import { IndustryService } from './../../../shared/services/industry.service';
import { TargetCompany } from './../../../shared/models/target-company.model';
import { Component, OnInit } from '@angular/core';
import { TargetCompanyService } from 'src/app/shared/services/target-company.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { getYearRange } from 'src/app/shared/utils/utils';
import { map, startWith } from 'rxjs/operators';
import { statusList, sizeList, statesList } from 'src/app/shared/options';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  showEdit = false;
  filteredIndustries: Observable<string[]>;
  filteredYears: Observable<string[] | number[]>;
  company: TargetCompany;
  companyDetailForm: FormGroup;
  industries: string[] = [];
  yearRange: number[] = [];
  statusOptions: string[];
  sizeOptions: string[];
  stateOptions: string[];

  constructor(
    private targetCompanyService: TargetCompanyService,
    private industryService: IndustryService,
    private route: ActivatedRoute
  ) {}

  // TODO: Add accordion on main/contacts/financials
  // plug in company data to form
  // add save functionality for update form
  // enable/disable fields and save button based on changes and showEdit
  // check validation
  // work on create form - use stepper?
  // company analytics.. compare trend in bar or line graph and calculate % growth or decline for each stat
  // compare.. select 2 or more companies and a financial stat to compare on bar graph
  // use pie charts to display status/industry/size

  ngOnInit() {
    this.initForm();
    this.getCompanyDetails();
    this.getIndustries();
    this.getYears();
    this.getStatusOptions();
    this.getSizeOptions();
    this.getStateOptions();
  }

  getCompanyDetails(): void {
    const companyId: number = parseInt(
      this.route.snapshot.paramMap.get('id'),
      0
    );
    this.targetCompanyService
      .findById(companyId)
      .subscribe((data: TargetCompany) => {
        this.company = data;
        console.log(this.company);
      });
  }

  getIndustries(): void {
    this.industryService.findAll().subscribe((data: string[]) => {
      this.industries = data.sort();
    });

    this.filteredIndustries = this.industry.valueChanges.pipe(
      startWith(''),
      map(value => this._filterString(value, this.industries))
    );
  }

  getYears(): void {
    this.yearRange = getYearRange().reverse();
  }

  getSizeOptions() {
    this.sizeOptions = sizeList;
  }

  getStateOptions() {
    this.stateOptions = statesList;
  }

  getStatusOptions() {
    this.statusOptions = statusList;
  }

  initForm() {
    this.companyDetailForm = new FormGroup({
      companyName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
        // duplicateCompanyNameValidator([])
      ]),
      status: new FormControl(null, [Validators.required]),
      industry: new FormControl(null, [Validators.required]),
      size: new FormControl(null, [Validators.required]),
      yearFounded: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      state: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.maxLength(1000)])
    });
  }

  private _filterString(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  get _showEdit(): boolean {
    return this.showEdit;
  }

  get companyName(): AbstractControl {
    return this.companyDetailForm.get('companyName');
  }
  get status(): AbstractControl {
    return this.companyDetailForm.get('status');
  }
  get industry(): AbstractControl {
    return this.companyDetailForm.get('industry');
  }
  get size(): AbstractControl {
    return this.companyDetailForm.get('size');
  }
  get yearFounded(): AbstractControl {
    return this.companyDetailForm.get('yearFounded');
  }
  get city(): AbstractControl {
    return this.companyDetailForm.get('city');
  }
  get state(): AbstractControl {
    return this.companyDetailForm.get('state');
  }
  get description(): AbstractControl {
    return this.companyDetailForm.get('description');
  }
}
