import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { Store } from '@ngrx/store';
import { loadEduc } from '../../../../state/faculty-state/faculty-state.actions';
import { MessageService } from '../../../../services/message.service';

@Component({
    selector: 'app-faculty-certifications-form',
    standalone: true,
    imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,CommonModule, ReactiveFormsModule, FormsModule
    ],
    templateUrl: 'educational-attainment-form.component.html',
    styleUrl: 'educational-attainment-form.component.css'
  })
  
  export class EducationalAttainmentFormComponent { 
    educForm = new FormGroup({
      educ_level: new FormControl(''),
      educ_title: new FormControl(''),
      educ_details: new FormControl(''),
      educ_school: new FormControl(''),
      year_start: new FormControl(''),
      year_end: new FormControl(''),
    })

    constructor(
      public dialogRef: MatDialogRef<EducationalAttainmentFormComponent>, 
      private facultyRequest: FacultyRequestService,
      private messageService: MessageService,
      private store: Store,
      @Inject(MAT_DIALOG_DATA) public data: any){}

  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    submitForm(){
        if(this.data.length == 0){
          this.facultyRequest.postData(this.educForm, 'addEduc').subscribe({
            next: (next: any) => {console.log(next);},
            error: (error) => {console.log(error)},
            complete: () => {
              this.store.dispatch(loadEduc());
              this.onNoClick();
            }
          });
        }
        else{
          this.facultyRequest.patchData(this.educForm, 'editEduc/' + this.data.educattainment_ID).subscribe({
            next: (next: any) => {console.log(next);},
            error: (error) => {console.log(error)},
            complete: () => {
              this.store.dispatch(loadEduc());
              this.onNoClick();

            }
          });
        }
    }
  }