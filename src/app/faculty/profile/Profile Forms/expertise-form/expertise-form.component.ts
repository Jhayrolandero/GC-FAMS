import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { Store } from '@ngrx/store';
import { loadEduc, loadExp, loadExpertise } from '../../../../state/faculty-state/faculty-state.actions';

@Component({
  selector: 'app-expertise-form',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './expertise-form.component.html',
  styleUrl: './expertise-form.component.css'
})
export class ExpertiseFormComponent {
  specForm = new FormGroup({
    expertise_name: new FormControl(''),
    expertise_confidence: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<ExpertiseFormComponent>, 
    private facultyRequest: FacultyRequestService,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any){}


  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm(){
      if(this.data.length == 0){
        this.facultyRequest.postData(this.specForm, 'addSpec').subscribe({
          next: (next: any) => {console.log(next);},
          error: (error) => {console.log(error)},
          complete: () => {
            this.store.dispatch(loadExpertise());
            this.onNoClick();
          }
        });
      }
      else{
        this.facultyRequest.patchData(this.specForm, 'editSpec/' + this.data.expertise_ID).subscribe({
          next: (next: any) => {console.log(next);},
          error: (error) => {console.log(error)},
          complete: () => {
            this.store.dispatch(loadExpertise());
            this.onNoClick();

          }
        });
      }
  }
}
