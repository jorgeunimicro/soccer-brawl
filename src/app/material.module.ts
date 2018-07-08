import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatSnackBarModule, MatTableModule,
  MatToolbarModule, MatDialogModule, MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule
  ],
  declarations: []
})
export class MaterialModule { }
