import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommunityExtension } from '../../../services/Interfaces/community-extension';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  commexForm = new FormGroup({
		commex_title: new FormControl(''),
    commex_details: new FormControl(''),
    experience_details: new FormControl(''),
		commex_header_img: new FormControl(''),
    commex_date: new FormControl(''),
	})

  triggerToggle(){
    this.setToggle.emit();

  }
  
    submitForm(){
      console.log(this.commexForm.value);
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
}
