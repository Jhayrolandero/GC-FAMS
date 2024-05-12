import { Component, Inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

  ) {
    this.image = data.image
  }
  imageURL: string | undefined = undefined;
  coverURL: string | undefined = undefined;
  image : "cover" | "profile";

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
      // this.facultyInfo.patchValue({
      //   profile_image: file
      // })
    };
  }

  setCover(reader: FileReader, file: File | undefined) {
    reader.onload = () => {
      this.coverURL = reader.result as string;
      // this.facultyInfo.patchValue({
      //   cover_image: file
      // })
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
