import { Observable } from 'rxjs';
import { TargetCompany } from './../../../shared/models/target-company.model';
import { Component, OnInit } from '@angular/core';
import { TargetCompanyService } from 'src/app/shared/services/target-company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormArray,
  FormBuilder
} from '@angular/forms';
import {
  getYearRange,
  toggleFormFieldsState
} from 'src/app/shared/utils/utils';
import { map, startWith } from 'rxjs/operators';
import {
  statusList,
  sizeList,
  statesList,
  industryList
} from 'src/app/shared/options';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { FinancialDataPoint } from 'src/app/shared/models/financial-data-point.model';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  showEdit = true;
  showDelete = true;
  showSave = false;
  showCancel = false;
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
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
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
    this.getData();
  }

  getData() {
    this.getIndustries();
    this.getYears();
    this.getStatusOptions();
    this.getSizeOptions();
    this.getStateOptions();
    this.getCompanyDetails();
  }

  initForm() {
    this.companyDetailForm = this.fb.group({
      companyName: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.maxLength(100)
        // duplicateCompanyNameValidator([])
      ]),
      status: new FormControl({ value: null, disabled: true }, [
        Validators.required
      ]),
      industry: new FormControl({ value: null, disabled: true }, [
        Validators.required
      ]),
      size: new FormControl({ value: null, disabled: true }, [
        Validators.required
      ]),
      yearFounded: new FormControl({ value: null, disabled: true }, [
        Validators.required
      ]),
      city: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      state: new FormControl({ value: null, disabled: true }, [
        Validators.required
      ]),
      description: new FormControl({ value: null, disabled: true }, [
        Validators.maxLength(1000)
      ]),
      contactName: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      contactEmail: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      contactPhone: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      assets: this.fb.array([]),
      liabilities: this.fb.array([]),
      profitMargin: this.fb.array([]),
      salesRevenue: this.fb.array([]),
      grossMargin: this.fb.array([]),
      operatingCosts: this.fb.array([])
      // assets: new FormArray([
      //   new FormGroup({
      //     year: new FormControl({ value: 2016, disabled: true }),
      //     value: new FormControl({ value: null, disabled: true }, [
      //       Validators.required
      //     ])
      //   }),
      //   new FormGroup({
      //     year: new FormControl({ value: 2017, disabled: true }),
      //     value: new FormControl({ value: null, disabled: true }, [
      //       Validators.required
      //     ])
      //   }),
      //   new FormGroup({
      //     year: new FormControl({ value: 2018, disabled: true }),
      //     value: new FormControl({ value: null, disabled: true }, [
      //       Validators.required
      //     ])
      //   })
      // ])
    });
  }

  getCompanyDetails(): void {
    const companyId: number = parseInt(
      this.route.snapshot.paramMap.get('id'),
      0
    );
    this.targetCompanyService.findById(companyId).subscribe(
      (data: TargetCompany) => {
        this.company = data;
        console.log(this.company);
        this.setFormValues();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  setFormValues() {
    this.companyDetailForm.patchValue({
      companyName: this.company.companyDetails.companyName,
      status: this.company.status,
      industry: this.company.companyDetails.companyIndustry,
      size: this.company.companyDetails.companySize,
      yearFounded: this.company.companyDetails.yearFounded,
      city: this.company.companyDetails.city,
      state: this.company.companyDetails.state,
      description: this.company.companyDetails.description
        ? this.company.companyDetails.description
        : null,
      contactName: this.company.keyContact.name,
      contactEmail: this.company.keyContact.email,
      contactPhone: this.company.keyContact.phone
      // assets: this.company.companyFinancials.assets
    });
  }

  getIndustries(): void {
    this.industries = industryList.sort();

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

  private _filterString(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onClickEdit() {
    this.showEdit = false;
    this.showDelete = false;
    this.showSave = true;
    this.showCancel = true;

    toggleFormFieldsState(true, this.companyDetailForm);
  }

  onClickCancel() {
    this.showEdit = true;
    this.showDelete = true;
    this.showSave = false;
    this.showCancel = false;

    this.companyDetailForm.reset({
      companyName: this.company.companyDetails.companyName,
      status: this.company.status,
      industry: this.company.companyDetails.companyIndustry,
      size: this.company.companyDetails.companySize,
      yearFounded: this.company.companyDetails.yearFounded,
      city: this.company.companyDetails.city,
      state: this.company.companyDetails.state,
      description: this.company.companyDetails.description
        ? this.company.companyDetails.description
        : null,
      contactName: this.company.keyContact.name,
      contactEmail: this.company.keyContact.email,
      contactPhone: this.company.keyContact.phone
    });

    toggleFormFieldsState(false, this.companyDetailForm);
  }

  onClickDelete() {
    this.targetCompanyService.deleteById(this.company.id).subscribe(
      () => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            baseMessage: 'Successfully deleted company:',
            highlight: this.company.companyDetails.companyName
          },
          duration: 4000
        });
        this.router.navigateByUrl('/').then();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
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
  get contactName(): AbstractControl {
    return this.companyDetailForm.get('contactName');
  }
  get contactEmail(): AbstractControl {
    return this.companyDetailForm.get('contactEmail');
  }
  get contactPhone(): AbstractControl {
    return this.companyDetailForm.get('contactPhone');
  }
}
