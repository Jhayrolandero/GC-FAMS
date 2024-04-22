import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { Store } from '@ngrx/store';
import { loadEduc, loadExp } from '../../../../state/faculty-state/faculty-state.actions';

@Component({
    selector: 'app-faculty-certifications-form',
    standalone: true,
    imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,CommonModule, ReactiveFormsModule, FormsModule
    ],
    templateUrl: 'industry-experience-form.component.html',
    styleUrl: 'industry-experience-form.component.css'
  })
  
  export class IndustryExperienceFormComponent { 
    expForm = new FormGroup({
        experience_place: new FormControl(''),
        experience_title: new FormControl(''),
        experience_details: new FormControl(''),
        experience_from: new FormControl(''),
        experience_to: new FormControl(''),
    })

    constructor(
      public dialogRef: MatDialogRef<IndustryExperienceFormComponent>, 
      private facultyRequest: FacultyRequestService,
      private store: Store,
      @Inject(MAT_DIALOG_DATA) public data: any){}

  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    submitForm(){
        if(this.data.length == 0){
          this.facultyRequest.postData(this.expForm, 'addExp').subscribe({
            next: (next: any) => {console.log(next);},
            error: (error) => {console.log(error)},
            complete: () => {
              this.store.dispatch(loadExp());
              this.onNoClick();
            }
          });
        }
        else{
          this.facultyRequest.patchData(this.expForm, 'editExp/' + this.data.experience_ID).subscribe({
            next: (next: any) => {console.log(next);},
            error: (error) => {console.log(error)},
            complete: () => {
              this.store.dispatch(loadExp());
              this.onNoClick();

            }
          });
        }
    }
  }