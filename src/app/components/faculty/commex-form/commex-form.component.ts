import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommunityExtension } from '../../../services/Interfaces/community-extension';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';

@Component({
  selector: 'app-commex-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './commex-form.component.html',
  styleUrl: './commex-form.component.css'
})
export class CommexFormComponent {
  @Input() formToggle?: boolean;
  @Input() commexValue?: CommunityExtension;
  @Output() setToggle = new EventEmitter<string>();


  attendeeForm;
  constructor(
    private facultyPostService: FacultyRequestService,
    private _fb: FormBuilder
  ) {
    this.attendeeForm = this._fb.group({
      attendees: this._fb.array([])
    })
  }
  commexForm = new FormGroup({
    commex_title: new FormControl(''),
    commex_details: new FormControl(''),
    commex_header_img: new FormControl<File | null>(null),
    commex_date: new FormControl(''),
  })

  editCommexForm = new FormGroup({
    commex_title: new FormControl(''),
    commex_details: new FormControl(''),
    commex_date: new FormControl(''),
  })



  triggerToggle() {
    this.setToggle.emit();
  }

  submitForm() {
    // console.log(this.commexForm);
    const formData = this.facultyPostService.formDatanalize(this.commexForm);
    // console.log(formData.get("commex_title"))
    this.facultyPostService.postData(formData, 'addCommex').subscribe({
      next: (next: any) => { console.log(next); },
      error: (error) => { console.log(error) },
      complete: () => { this.triggerToggle(); }
    });
  }

  editForm() {

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
        this.commexForm.patchValue({
          commex_header_img: file
        })
      };
      reader.readAsDataURL(file);
    }
    console.log(this.commexForm);
  }
}

