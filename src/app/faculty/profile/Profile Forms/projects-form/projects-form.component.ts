import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { Store } from '@ngrx/store';
import { IndustryExperienceFormComponent } from '../industry-experience-form/industry-experience-form.component';
import { loadProj } from '../../../../state/faculty-state/faculty-state.actions';

@Component({
  selector: 'app-projects-form',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './projects-form.component.html',
  styleUrl: './projects-form.component.css'
})
export class ProjectsFormComponent {
  projForm = new FormGroup({
    project_name: new FormControl(''),
    project_date: new FormControl(''),
    project_detail: new FormControl(''),
    project_link: new FormControl(''),
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
        this.facultyRequest.postData(this.projForm, 'addProj').subscribe({
          next: (next: any) => {console.log(next);},
          error: (error) => {console.log(error)},
          complete: () => {
            this.store.dispatch(loadProj());
            this.onNoClick();
          }
        });
      }
      else{
        this.facultyRequest.patchData(this.projForm, 'editProj/' + this.data.project_ID).subscribe({
          next: (next: any) => {console.log(next);},
          error: (error) => {console.log(error)},
          complete: () => {
            this.store.dispatch(loadProj());
            this.onNoClick();

          }
        });
      }
  }
}
