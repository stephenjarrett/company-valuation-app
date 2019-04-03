import { SortPipe } from './pipes/sort.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatNativeDateModule,
  MatSnackBarModule,
  MatIconModule,
  MatBadgeModule,
  MatDialogModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTabsModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatAutocompleteModule,
  MatGridListModule,
  MatMenuModule,
  MatTooltipModule,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavModule,
  MatListModule,
  MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const material = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule
];

@NgModule({
  imports: [material],
  exports: [material, SortPipe],
  declarations: [SortPipe],
  providers: [],
  entryComponents: [],
  schemas: []
})
export class SharedModule {}
