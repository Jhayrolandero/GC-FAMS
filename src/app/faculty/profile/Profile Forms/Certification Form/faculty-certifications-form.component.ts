import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { loadCert } from '../../../../state/cv/cv.actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-faculty-certifications-form',
    standalone: true,
    imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,CommonModule, ReactiveFormsModule, FormsModule
    ],
    templateUrl: 'faculty-certifications-form.component.html',
    styleUrl: 'faculty-certifications-form.component.css'
  })
  
  export class FacultyCertificationsFormComponent { 
    constructor(
      public dialogRef: MatDialogRef<FacultyCertificationsFormComponent>, 
      private facultyRequest: FacultyRequestService,
      private store: Store
    ){}

    certForm = new FormGroup({
      cert_name: new FormControl(''),
      cert_details: new FormControl(''),
      cert_corporation: new FormControl(''),
      accomplished_date: new FormControl(''),
      cert_image: new FormControl<File | null>(null)
    })
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    submitForm(){
      console.log(this.certForm);
  
      const formData = this.facultyRequest.formDatanalize(this.certForm);
      this.facultyRequest.postData(formData, 'addCert').subscribe({
        error: (error) => {console.log(error)},
        complete: () => {
          this.store.dispatch(loadCert());
          this.onNoClick();
        }
      });
    }
  
    imageURL?: string = undefined;
    PreviewImage(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const file = inputElement.files?.[0]; // Using optional chaining to handle null or undefined
  
      if (file) {
          // File Preview
          const reader = new FileReader();
          reader.onload = () => {
              this.imageURL = reader.result as string;
              this.certForm.patchValue({
                cert_image: file
              })
          };
          reader.readAsDataURL(file);
      }
      console.log(this.certForm);
    }
  }