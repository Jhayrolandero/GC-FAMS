import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommunityExtension } from '../../../services/Interfaces/community-extension';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  constructor(private facultyPostService: FacultyRequestService){}

  commexForm = new FormGroup({
		commex_title: new FormControl(''),
    commex_details: new FormControl(''),
		commex_header_img: new FormControl<File | null>(null),
    commex_date: new FormControl(''),
	})

  triggerToggle(){
    this.setToggle.emit();
  }

  // refreshForm(){
  //   this.commexForm = new FormGroup({
  //     commex_title: new FormControl(''),
  //     commex_details: new FormControl(''),
  //     commex_header_img: new FormControl<File | null>(null),
  //     commex_date: new FormControl(''),
  //   })
  // }
  
  submitForm(){
    const formData = this.facultyPostService.formDatanalize(this.commexForm);
    this.facultyPostService.postData(formData, "addCommex").subscribe({
      next: (next: any) => {console.log(next);},
      error: (error) => {console.log(error)},
      complete: () => {this.triggerToggle();}
    });
  }
  
    //Dynamic Create, Edit, and Delete function call for faculty post service.
    addRes(form: FormGroup, type: string){
      // this.facultyService.addRes(form, type).subscribe({
      //   next: value => {console.log(value);
      //                   this.emptyType('');},
      //   error: err => console.log(err),
      // });
    }
  
    editRes(form: FormGroup, type: string, id: number){
      // this.facultyService.editRes(form, type, id).subscribe({
      //   next: value => {console.log(value);
      //                   this.emptyType('');},
      //   error: err => console.log(err),
      // });
    }
  
    deleteRes(id:number, type: string){
      // this.facultyService.deleteRes(id, type).subscribe({
      //   next: value => {console.log(value);
      //                   this.emptyType('');},
      //   error: err => console.log(err),
      // });
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
