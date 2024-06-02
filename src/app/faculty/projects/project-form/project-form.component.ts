import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfileFormComponent } from '../../../components/manage-profile/profile-form/profile-form.component';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { selectAllProfile } from '../../../state/faculty-state/faculty-state.selector';
import { selectCollegeFaculty } from '../../../state/dean-state/dean-state.selector';
import { Observable, map } from 'rxjs';
import { Encryption } from '../../../services/Interfaces/encryption';
import { Faculty } from '../../../services/Interfaces/faculty';
import { CryptoJSService } from '../../../services/crypto-js.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatStepperModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  imageURLs: string[] = [];

  facultyList$: Observable<Faculty[]> = this.facultyRequest.fetchData<Encryption>("faculty").pipe(
    map(data => this.decryptData<Faculty[]>(data))
  );

  constructor(      
    public dialogRef: MatDialogRef<ProfileFormComponent>,
    private facultyRequest: FacultyRequestService,
    private store: Store,
    private cryptoJS: CryptoJSService,
    private messageService: MessageService){
      console.log("What the hail");
  }

  ngOnInit(): void {
    this.facultyList$.subscribe(next => {
      console.log(next);
    })
  }

  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }


  projectForm = new FormGroup({
    project_name: new FormControl('', [Validators.required,]),
    project_date: new FormControl('', [Validators.required,]),
    project_detail: new FormControl(''),
    project_link: new FormControl(''),
    isFinished: new FormControl(''),
    project_images: new FormControl([]),
    accomplished_date: new FormControl('',[Validators.required,]),
    project_author: new FormControl('',[Validators.required,]),
    project_co_author: new FormArray([new FormControl('', [Validators.required,]),]),
  })

  submitForm(){
    // this.messageService.sendMessage("Adding Project...", 0)

    // const formData = this.facultyRequest.formDatanalize(this.projectForm);
    // this.facultyRequest.postData(formData, submitType).subscribe({
    //   next(value) {console.log(value);},
    //   error: (error) => {
    //     console.log(error);
    //     this.messageService.sendMessage("Failed to add Certification.", -1)
    //   },
    //   complete: () => {
    //     this.store.dispatch(loadCert());
    //     this.messageService.sendMessage("Course Successfully Added!", 1)
    //     this.onNoClick();
    //   }
    // });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  PreviewImage(event: Event) {
    const allowedFileTypes = ["image/png", "image/jpeg"]

    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files; // Using optional chaining to handle null or undefined

    if (files) {
      this.imageURLs = []; // Clear existing images

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (allowedFileTypes.includes(file.type)) {
          // File Preview
          const reader = new FileReader();
          reader.onload = () => {
            this.imageURLs.push(reader.result as string);
            let img_value = this.projectForm.get('cert_image')?.value;
            console.log(img_value);
          };
          reader.readAsDataURL(file);
        } else {
          this.messageService.sendMessage("File type should be .png or .jpeg/.jpg", -1);
        }
      }
    }
  }
}
