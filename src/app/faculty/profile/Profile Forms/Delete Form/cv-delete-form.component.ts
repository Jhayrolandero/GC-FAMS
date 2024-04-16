import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';

@Component({
    selector: 'app-cv-delete-form',
    standalone: true,
    imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,CommonModule, ReactiveFormsModule, FormsModule
    ],
    templateUrl: 'cv-delete-form.component.html',
    styleUrl: 'cv-delete-form.component.css'
  })
  
  export class CvDeleteForm { 

    constructor(
      public dialogRef: MatDialogRef<CvDeleteForm>, 
      private facultyRequest: FacultyRequestService){
        // console.log(this.data.length);
      }

  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    submitForm(){
      //   console.log(this.educForm);
      //   this.facultyRequest.postData(this.educForm, 'addEduc').subscribe({
      //   next: (next: any) => {console.log(next);},
      //   error: (error) => {console.log(error)},
      //   complete: () => {this.onNoClick();}
      // });
    }
  }