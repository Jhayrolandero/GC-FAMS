import { Component, Inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { ProfileState } from '../../../state/faculty-state/faculty-state.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, mergeMap, pipe } from 'rxjs';
import { selectProfileID } from '../../../state/faculty-state/faculty-state.selector';
import { updateCover, updateProfile } from '../../../state/faculty-state/faculty-state.actions';
@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {image: "cover" | "profile"},
    private messageService: MessageService,
    public dialogRef: MatDialogRef<ProfileFormComponent>,
    private facultyService: FacultyRequestService,
    private profileStore: Store<{ profile: ProfileState }>,

  ) {
    this.image = data.image
    this.facultyID$ = profileStore.pipe(select(selectProfileID))
  }
  imageURL: string | undefined = undefined;
  imageFile: File | undefined = undefined
  coverURL: string | undefined = undefined;
  coverFile: File | undefined = undefined
  image : "cover" | "profile";
  facultyID$: Observable<number>

  PreviewImage(event: Event, type: string) {

    const allowedFileType = ["image/png", "image/jpeg"]
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0]; // Using optional chaining to handle null or undefined

    if (file && allowedFileType.includes(file.type)) {
      // File Preview
      const reader = new FileReader();

      switch (type) {
        case 'profile':
          this.setProfile(reader, file);
          console.log(file)
          console.log(reader.result)
          break
        case 'cover':
          this.setCover(reader, file)
          break
      }
      reader.readAsDataURL(file);
    } else {
      this.messageService.sendMessage("File type should be .png or .jpeg/.jpg", -1)
    }
  }


  setProfile(reader: FileReader, file: File | undefined) {
    reader.onload = () => {
      this.imageURL = reader.result as string;
      console.log(file)
      this.imageFile = file
    };
  }

  setCover(reader: FileReader, file: File | undefined) {
    reader.onload = () => {
      this.coverURL = reader.result as string;
      this.coverFile = file
    };
  }

  updateCover() {
    const formData = new FormData();
    // Append the file to the FormData object if it is not undefined
    if (this.coverFile) {
      formData.append('cover_image', this.coverFile);
      this.facultyService.postData(formData, "cover").subscribe(
        {
          next: res => {
            this.facultyID$.subscribe({
              next: res => {
                this.profileStore.dispatch(updateCover({ faculty_ID: res, filename: this.coverFile!.name}))
              }
            })
            console.log(res)},
            error: err => {
            this.messageService.sendMessage("Error in updating cover!", -1)
            console.log(err)
          }
        }
      )
    } else {
      this.messageService.sendMessage("Empty File!", -1)
    }
  }

  updateProfile() {
    const formData = new FormData();
    // Append the file to the FormData object if it is not undefined
    if (this.imageFile) {
      formData.append('profile_image', this.imageFile)
      this.facultyService.postData(formData, "profile").subscribe({
        next: res => {

          this.facultyID$.subscribe({
            next: res => {
              this.profileStore.dispatch(updateProfile({ faculty_ID: res, filename: this.imageFile!.name}))
            }
          })
          console.log(res)
        },
        error: err => {
          this.messageService.sendMessage("Error in updating profile!", -1)
          console.log(err)
        }
      })
    } else {
      this.messageService.sendMessage("Empty File!", -1)
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
