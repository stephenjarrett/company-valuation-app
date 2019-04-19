import { CompanyFinancials } from './../../../shared/models/company-financials.model';
import { TargetCompany } from 'src/app/shared/models/target-company.model';
import { Observable } from 'rxjs';
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
  toggleFormFieldsState,
  buildRange,
  isNil
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
import { KeyContact } from 'src/app/shared/models/key-contact.model';
import { CompanyDetail } from 'src/app/shared/models/company-detail.model';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  isCreating = true;
  showEdit = true;
  showDelete = true;
  showSave = false;
  showCancel = false;
  filteredIndustries: Observable<string[]>;
  filteredYears: Observable<string[] | number[]>;
  company: TargetCompany;
  companyId: number;
  companyDetailForm: FormGroup;
  industries: string[] = [];
  yearRange: number[] = [];
  statusOptions: string[];
  sizeOptions: string[];
  stateOptions: string[];
  assets: FinancialDataPoint[];
  liabilities: FinancialDataPoint[];
  profitMargin: FinancialDataPoint[];
  salesRevenue: FinancialDataPoint[];
  operatingCosts: FinancialDataPoint[];
  financialDataTypes = [
    'assets',
    'liabilities',
    'profitMargin',
    'salesRevenue',
    'operatingCosts'
  ];

  constructor(
    private targetCompanyService: TargetCompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isCreating = this.route.snapshot.data.creating;
    this.initForm();
    this.getData();
  }

  getData() {
    this.getIndustries();
    this.getYears();
    this.getStatusOptions();
    this.getSizeOptions();
    this.getStateOptions();
    if (!this.isCreating) {
      this.getCompanyDetails();
    } else {
      this.initForCreate();
    }
  }

  initForCreate() {
    this.showEdit = false;
    this.showSave = true;
    this.showCancel = true;
    this.showDelete = false;
    this.assets = [];
    this.liabilities = [];
    this.salesRevenue = [];
    this.profitMargin = [];
    this.operatingCosts = [];
  }

  initForm() {
    this.companyDetailForm = this.fb.group({
      companyName: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        Validators.maxLength(100)
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
      operatingCosts: this.fb.array([])
    });

    if (this.isCreating) {
      toggleFormFieldsState(true, this.companyDetailForm);
      this.financialDataTypes.forEach(type => this.addFinancialData(type));
    } else {
      toggleFormFieldsState(false, this.companyDetailForm);
    }
  }

  // get company info from service and pull out the 5 financial data types
  getCompanyDetails(): void {
    this.companyId = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    this.targetCompanyService.findById(this.companyId).subscribe(
      (data: TargetCompany) => {
        this.company = data;
        this.assets = data.companyFinancials.assets;
        this.liabilities = data.companyFinancials.liabilities;
        this.salesRevenue = data.companyFinancials.salesRevenue;
        this.profitMargin = data.companyFinancials.profitMargin;
        this.operatingCosts = data.companyFinancials.operatingCosts;
        this.setFormValues();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  setFormValues() {
    // patch values instead of set so you can set the formArray for financial data separately
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
    });

    // add financial data to form
    this.financialDataTypes.forEach(type => this.addFinancialData(type));
  }

  // assigns each financial data type to form array of the last 3 years
  addFinancialData(dataType: string) {
    const controls = this.companyDetailForm.controls[dataType] as FormArray;
    let valuesArray: FinancialDataPoint[];
    if (this.isCreating) {
      valuesArray = this.build3YearDataPointArray();
    } else {
      valuesArray = this.company.companyFinancials[dataType];
    }
    valuesArray.forEach((dataPoint: FinancialDataPoint) => {
      controls.push(
        this.fb.group({ year: dataPoint.year, value: dataPoint.value })
      );
    });

    toggleFormFieldsState(this.isCreating, this.companyDetailForm);
  }

  // used for mat autocomplete
  getIndustries(): void {
    this.industries = industryList.sort();

    this.filteredIndustries = this.industry.valueChanges.pipe(
      startWith(''),
      map(value => this._filterString(value, this.industries))
    );
  }

  // create dataSet with year value of the last 3 years
  build3YearDataPointArray(): FinancialDataPoint[] {
    const currentYear = new Date().getFullYear();
    const range = buildRange(currentYear - 3, currentYear - 1);
    const dataPointArray = range.map(year => {
      return { year, value: null };
    });
    return dataPointArray;
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
    if (!isNil(value)) {
      const filterValue = value.toLowerCase();
      return options.filter(option =>
        option.toLowerCase().includes(filterValue)
      );
    }
  }

  onClickEdit() {
    this.showEdit = false;
    this.showDelete = false;
    this.showSave = true;
    this.showCancel = true;

    toggleFormFieldsState(true, this.companyDetailForm);
  }

  onClickCancel() {
    // cancel asks as a return to homepage on creation.. else resets the form to DB values if there are changes
    if (this.isCreating) {
      this.router.navigateByUrl('/').then();
      return;
    }

    this.showEdit = true;
    this.showDelete = true;
    this.showSave = false;
    this.showCancel = false;
    toggleFormFieldsState(false, this.companyDetailForm);

    this.companyDetailForm.reset({
      companyName: this.company
        ? this.company.companyDetails.companyName
        : null,
      status: this.company ? this.company.status : null,
      industry: this.company
        ? this.company.companyDetails.companyIndustry
        : null,
      size: this.company ? this.company.companyDetails.companySize : null,
      yearFounded: this.company
        ? this.company.companyDetails.yearFounded
        : null,
      city: this.company ? this.company.companyDetails.city : null,
      state: this.company ? this.company.companyDetails.state : null,
      description: this.company
        ? this.company.companyDetails.description
        : null,
      contactName: this.company ? this.company.keyContact.name : null,
      contactEmail: this.company ? this.company.keyContact.email : null,
      contactPhone: this.company ? this.company.keyContact.phone : null,
      assets: this.company ? this.company.companyFinancials.assets : null,
      liabilities: this.company
        ? this.company.companyFinancials.liabilities
        : null,
      salesRevenue: this.company
        ? this.company.companyFinancials.salesRevenue
        : null,
      operatingCosts: this.company
        ? this.company.companyFinancials.operatingCosts
        : null,
      profitMargin: this.company
        ? this.company.companyFinancials.profitMargin
        : null
    });
  }

  onClickSave() {
    const targetCompany = this.buildTargetCompanyObject();
    if (targetCompany.id) {
      this.handleUpdate(targetCompany);
    } else {
      this.handleCreate(targetCompany);
    }
  }

  handleUpdate(updatedCompany: TargetCompany) {
    this.targetCompanyService.update(this.company.id, updatedCompany).subscribe(
      () => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            baseMessage: 'Successfully updated company: ',
            highlight: this.company.companyDetails.companyName
          },
          duration: 4000
        });
        toggleFormFieldsState(false, this.companyDetailForm);
        this.showCancel = false;
        this.showSave = false;
        this.showDelete = true;
        this.showEdit = true;
        this.company = this.buildTargetCompanyObject();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  handleCreate(newCompany: TargetCompany) {
    this.targetCompanyService.create(newCompany).subscribe(
      () => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            baseMessage: 'Successfully created company: ',
            highlight: newCompany.companyDetails.companyName
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

  buildTargetCompanyObject(): TargetCompany {
    const targetCompany = new TargetCompany();
    const keyContact = new KeyContact();
    const companyDetail = new CompanyDetail();
    const companyFinancials = new CompanyFinancials();
    if (!this.isCreating) {
      // if it is an update then we have an id
      targetCompany.id = this.companyId;
    }
    targetCompany.status = this.status.value;
    companyDetail.companyName = this.companyName.value;
    companyDetail.companyIndustry = this.industry.value;
    companyDetail.companySize = this.size.value;
    companyDetail.yearFounded = this.yearFounded.value;
    companyDetail.city = this.city.value;
    companyDetail.state = this.state.value;
    companyDetail.description = this.description.value
      ? this.description.value
      : null;
    keyContact.name = this.contactName.value;
    keyContact.email = this.contactEmail.value;
    keyContact.phone = this.contactPhone.value;
    companyFinancials.assets = this.assetsControls.value;
    companyFinancials.liabilities = this.liabilitiesControls.value;
    companyFinancials.salesRevenue = this.salesRevenueControls.value;
    companyFinancials.operatingCosts = this.operatingCostsControls.value;
    companyFinancials.profitMargin = this.profitMarginControls.value;
    targetCompany.companyDetails = companyDetail;
    targetCompany.keyContact = keyContact;
    targetCompany.companyFinancials = companyFinancials;
    return targetCompany;
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

  get assetsControls() {
    return this.companyDetailForm.get('assets') as FormArray;
  }
  get liabilitiesControls() {
    return this.companyDetailForm.get('liabilities') as FormArray;
  }
  get salesRevenueControls() {
    return this.companyDetailForm.get('salesRevenue') as FormArray;
  }
  get profitMarginControls() {
    return this.companyDetailForm.get('profitMargin') as FormArray;
  }
  get operatingCostsControls() {
    return this.companyDetailForm.get('operatingCosts') as FormArray;
  }
}
