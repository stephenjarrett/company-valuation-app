import { SortPipe } from './pipes/sort.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTabsModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatRadioModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormArray } from '@angular/forms';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const material = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatSortModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatRadioModule
];

@NgModule({
  imports: [material, ReactiveFormsModule, FormsModule, NgxChartsModule],
  exports: [
    material,
    SortPipe,
    FormsModule,
    ReactiveFormsModule,
    SnackbarComponent,
    NgxChartsModule
  ],
  declarations: [SortPipe, SnackbarComponent],
  providers: [],
  entryComponents: [],
  schemas: []
})
export class SharedModule {}
