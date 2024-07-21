import { Component, inject, model } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogData } from '../../Profile Dropdown/cv-dropdown.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule,  MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.css'
})
export class DateFilterComponent {
  dialogRef = inject(MatDialogRef<DateFilterComponent>);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  startDate = ''
  endDate = ''
  // startDate = model(this.data.startDate)
  // endDate = model(this.data.endDate)

  onNoClick(): void {
    this.dialogRef.close();
  }

  setStartDate(date: Date) {
    const stringified = JSON.stringify(date);
    const dob = stringified.substring(1, 11);
    this.startDate = dob

    // this.filterCommexSelection()
  }

  apply(): void {
    this.dialogRef.close({ startDate: this.startDate, endDate: this.endDate });
  }

  setEndDate(date: Date) {
    const stringified = JSON.stringify(date);
    const dob = stringified.substring(1, 11);
    this.endDate = dob
    // this.filterCommexSelection()
  }

}
