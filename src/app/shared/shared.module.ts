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
  MatTooltipModule,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavModule,
  MatListModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

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
  MatSnackBarModule
];

@NgModule({
  imports: [material, ReactiveFormsModule, FormsModule],
  exports: [
    material,
    SortPipe,
    FormsModule,
    ReactiveFormsModule,
    SnackbarComponent
  ],
  declarations: [SortPipe, SnackbarComponent],
  providers: [],
  entryComponents: [],
  schemas: []
})
export class SharedModule {}
