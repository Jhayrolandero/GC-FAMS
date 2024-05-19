import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { loadCert } from '../../../../state/faculty-state/faculty-state.actions';
import { Store } from '@ngrx/store';
import { selectAllCerts } from '../../../../state/faculty-state/faculty-state.selector';
import { MessageService } from '../../../../services/message.service';

@Component({
    selector: 'app-faculty-certifications-form',
    standalone: true,
    imports: [MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,CommonModule, ReactiveFormsModule, FormsModule
    ],
    templateUrl: 'faculty-certifications-form.component.html',
    styleUrl: 'faculty-certifications-form.component.css'
  })
  
  export class FacultyCertificationsFormComponent { 
    public certifications$ = this.store.select(selectAllCerts);
    public selectedExisting: boolean = false;

    constructor(
      public dialogRef: MatDialogRef<FacultyCertificationsFormComponent>, 
      private facultyRequest: FacultyRequestService,
      private messageService: MessageService,
      private store: Store
    ){}

    newCertForm = new FormGroup({
      cert_name: new FormControl(''),
      cert_type: new FormControl(''),
      cert_abbrev: new FormControl(''),
      cert_details: new FormControl(''),
      cert_corporation: new FormControl(''),
      accomplished_date: new FormControl(''),
      cert_image: new FormControl<File | null>(null)
    })

    existCertForm = new FormGroup({
      cert_ID: new FormControl(''),
      accomplished_date: new FormControl(''),
      cert_image: new FormControl<File | null>(null)
    })
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    existCertSelect(event: any){
      if(event.target.value == -1){
        this.selectedExisting = false;
        return;
      }

      this.selectedExisting = true;
      this.existCertForm.patchValue({
        cert_ID: event.target.value
      });
    }
  
    submitForm(){
      let submitType;
      let formType;

      if(this.selectedExisting == true){
        submitType = 'addFacultyCert';
        formType = this.existCertForm;
      }
      else{
        submitType = 'addNewCert';
        formType = this.newCertForm;
      }

      console.log(formType);
      this.messageService.sendMessage("Adding Certification...", 0)
  
      const formData = this.facultyRequest.formDatanalize(formType);
      this.facultyRequest.postData(formData, submitType).subscribe({
        next(value) {console.log(value);},
        error: (error) => {
          console.log(error);
          this.messageService.sendMessage("Failed to add Certification.", -1)
        },
        complete: () => {
          this.store.dispatch(loadCert());
          this.messageService.sendMessage("Course Successfully Added!", 1)
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
              this.existCertForm.patchValue({
                cert_image: file
              })
              this.newCertForm.patchValue({
                cert_image: file
              })
          };
          reader.readAsDataURL(file);
      }
    }
  }