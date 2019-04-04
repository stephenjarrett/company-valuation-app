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
  MatButtonModule
];

@NgModule({
  imports: [material, ReactiveFormsModule, FormsModule],
  exports: [material, SortPipe, FormsModule, ReactiveFormsModule],
  declarations: [SortPipe],
  providers: [],
  entryComponents: [],
  schemas: []
})
export class SharedModule {}
