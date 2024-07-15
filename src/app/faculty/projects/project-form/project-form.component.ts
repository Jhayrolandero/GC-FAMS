import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfileFormComponent } from '../../../components/manage-profile/profile-form/profile-form.component';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { select, Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { Observable, Subscription, map } from 'rxjs';
import { Encryption } from '../../../services/Interfaces/encryption';
import { Faculty } from '../../../services/Interfaces/faculty';
import { CryptoJSService } from '../../../services/crypto-js.service';
import { loadProj } from '../../../state/faculty-state/faculty-state.actions';
import * as ProfileSelectors from '../../../state/faculty-state/faculty-state.selector';
import { ProfileState } from '../../../state/faculty-state/faculty-state.reducer';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatStepperModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  imageURLs: string[] = [];
  coAuthorId: number[] = [];
  profile$ = this.profileStore.pipe(select(ProfileSelectors.selectAllProfile))
  profileSub!: Subscription


  facultyList$: Observable<Faculty[]> = this.facultyRequest.fetchData<Encryption>("faculty").pipe(
    map(data => this.decryptData<Faculty[]>(data))
  );

  constructor(
    public dialogRef: MatDialogRef<ProfileFormComponent>,
    private facultyRequest: FacultyRequestService,
    private store: Store,
    private cryptoJS: CryptoJSService,
    private profileStore: Store<{ profile: ProfileState }>,
    private messageService: MessageService){
      this.projectForm.get('is_finished')?.valueChanges.subscribe(v => {
        console.log(v)
        if (v) {
          this.projectForm.get('project_end_date')?.reset()
          this.projectForm.get('project_end_date')?.disable()
        } else {
          this.projectForm.get('project_end_date')?.enable()
        }
      })

      this.profileSub = this.profile$.subscribe({
        next: res => {
          this.projectForm.patchValue({
            project_author: res?.faculty_ID
          })
        },
        error: err => {
          console.error(err)
          this.messageService.sendMessage("Something went wrong!", -1)
          this.onNoClick()
        }
      })
  }

  ngOnInit(): void {
    this.facultyList$.subscribe(next => {
      console.log(next);
    })
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe()
  }

  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }


  projectForm = new FormGroup({
    project_name: new FormControl('', [Validators.required]),
    project_link: new FormControl(''),
    project_detail: new FormControl('', [Validators.required]),
    project_start_date: new FormControl('', [Validators.required]),
    is_finished: new FormControl(),
    project_end_date: new FormControl(''),
    project_main_image: new FormControl<string>(''),
    project_images: new FormControl<string[]>([]),
    project_author: new FormControl<number>(-1),
    project_co_author: new FormControl<number[]>([]),
  })

  submitForm(){
    this.messageService.sendMessage("Adding Project...", 0)
    console.log(this.projectForm);

    this.projectForm.patchValue({
      is_finished: !this.projectForm.controls['is_finished'].value
    })

    this.facultyRequest.postData(this.projectForm, 'addProj').subscribe({
      next(value) {console.log(value);},
      error: (error) => {
        console.log(error);
        this.messageService.sendMessage("Failed to add Project.", -1)
      },
      complete: () => {
        this.messageService.sendMessage("Project Successfully Added!", 1)
        this.store.dispatch(loadProj())
        this.onNoClick();
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectCoAuthor(event: any, id: number){
    if(event.target.checked){
      this.coAuthorId.push(id)
    }
    else{
      this.coAuthorId = this.coAuthorId.filter(x => x !== id)
    }
    this.projectForm.patchValue({
      project_co_author: this.coAuthorId
    })
    console.log(this.coAuthorId);
  }

  selectAuthor(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    console.log(selectElement.value);
    this.projectForm.patchValue({
      project_author: +selectElement.value
    })
  }

  mainImageURL?: string = undefined;
  PreviewMainImage(event: Event) {

    const allowedFileType = ["image/png", "image/jpeg"]
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0]; // Using optional chaining to handle null or undefined



    if (file && allowedFileType.includes(file.type)) {
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.mainImageURL = reader.result as string;

        this.projectForm.patchValue({
          project_main_image: this.mainImageURL
        })
      };
      reader.readAsDataURL(file);
    }
  else {
    this.messageService.sendMessage("File type should be .png or .jpeg/.jpg", -1)

  }
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
            console.log(this.imageURLs);
          };
          reader.readAsDataURL(file);
        } else {
          this.messageService.sendMessage("File type should be .png or .jpeg/.jpg", -1);
        }
      }
      this.projectForm.patchValue({
        project_images: this.imageURLs
      })
    }
  }
}
