import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
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

    formType: any;

    newCertForm = new FormGroup({
      cert_name: new FormControl('', [
        Validators.required,
      ]),
      cert_type: new FormControl('', [
        Validators.required,
      ]

      ),
      cert_abbrev: new FormControl('' ),
      cert_details: new FormControl('',

      ),
      cert_corporation: new FormControl('',
      [
        Validators.required,
      ]
      ),
      accomplished_date: new FormControl('',
      [
        Validators.required,
      ]
      ),
      cert_image: new FormControl<File | null>(null)
    })

    existCertForm = new FormGroup({
      cert_ID: new FormControl('', [
        Validators.required,
      ]),
      accomplished_date: new FormControl('',  [
        Validators.required,
      ]),
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
      this.formType;

      if(this.selectedExisting == true){
        submitType = 'addFacultyCert';
        this.formType = this.existCertForm;
      }
      else{
        submitType = 'addNewCert';
        this.formType = this.newCertForm;
      }


      if(this.formType.get('cert_image').value === null) return
      if(!this.formType.valid) return

      console.log(this.formType);
      this.messageService.sendMessage("Adding Certification...", 0)

      const formData = this.facultyRequest.formDatanalize(this.formType);
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
      const allowedFileType = ["image/png", "image/jpeg"]

      const inputElement = event.target as HTMLInputElement;
      const file = inputElement.files?.[0]; // Using optional chaining to handle null or undefined

      if (file && allowedFileType.includes(file.type)) {
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
      } else {
        this.messageService.sendMessage("File type should be .png or .jpeg/.jpg", -1)
      }
    }
  }
