import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FacultyRequestService } from '../../../../../services/faculty/faculty-request.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-faculty-certifications-form',
    standalone: true,
    imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,CommonModule, ReactiveFormsModule, FormsModule
    ],
    templateUrl: 'educational-attainment-form.component.html',
    styleUrl: 'educational-attainment-form.component.css'
  })
  
  export class EducationalAttainmentFormComponent { 
    constructor(public dialogRef: MatDialogRef<EducationalAttainmentFormComponent>, private facultyRequest: FacultyRequestService){}
  
    educForm = new FormGroup({
        educ_title: new FormControl(''),
        educ_details: new FormControl(''),
        educ_school: new FormControl(''),
        year_start: new FormControl(''),
        year_end: new FormControl(''),
      })
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    submitForm(){
        console.log(this.educForm);
        this.facultyRequest.postData(this.educForm, 'addEduc').subscribe({
        next: (next: any) => {console.log(next);},
        error: (error) => {console.log(error)},
        complete: () => {this.onNoClick();}
      });
    }
  }