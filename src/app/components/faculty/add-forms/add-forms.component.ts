import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacultyPostService } from '../../../services/faculty/faculty-post.service';
import { EducationalAttainment } from '../../../services/Interfaces/educational-attainment';

@Component({
  selector: 'app-add-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-forms.component.html',
  styleUrl: './add-forms.component.css'
})
export class AddFormsComponent {
  @Input() formType: string = '';
  @Input() educValue?: EducationalAttainment;
  @Output() setType = new EventEmitter<string>();

  constructor(private facultyService: FacultyPostService){}

  //Educational Attainment formgroup/ form object
	educForm = new FormGroup({
		educ_title: new FormControl(''),
    educ_details: new FormControl(''),
    educ_school: new FormControl(''),
		year_start: new FormControl(''),
    year_end: new FormControl(''),
	})

  //Sets form type, can show, or close current form.
  emptyType(value: string) {
    this.setType.emit(value);
  }

  //Dynamic Create, Edit, and Delete function call for faculty post service.
  addRes(form: FormGroup, type: string){
    this.facultyService.addRes(form, type).subscribe({
      next: value => {console.log(value);
                      this.emptyType('');},
      error: err => console.log(err),
    });
  }

  deleteRes(id:number, type: string){
    if(this.educValue){
      this.facultyService.deleteRes(id, type).subscribe({
        next: value => {console.log(value);
                       this.emptyType('');},
        error: err => console.log(err),
      });
    }
    else{
      console.log("This is not supposed to happen!");
    }
  }
}