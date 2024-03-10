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

    //Login form object
	educForm = new FormGroup({
		educ_title: new FormControl(''),
    educ_details: new FormControl(''),
    educ_school: new FormControl(''),
		year_start: new FormControl(''),
    year_end: new FormControl(''),
	})

  emptyType(value: string) {
    console.log("empt");
    this.setType.emit(value);
  }

  addEduc(){
    console.log(this.educForm);
    this.facultyService.addEduc(this.educForm).subscribe({
      next: value => console.log(value),
      error: err => console.log(err),
    });
  }
}