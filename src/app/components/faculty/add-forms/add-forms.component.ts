import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacultyPostService } from '../../../services/faculty/faculty-post.service';
import { EducationalAttainment } from '../../../services/Interfaces/educational-attainment';
import { Certifications } from '../../../services/Interfaces/certifications';
import { IndustryExperience } from '../../../services/Interfaces/industry-experience';

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
  @Input() certValue?: Certifications;
  @Input() expValue?: IndustryExperience;
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

	expForm = new FormGroup({
		experience_place: new FormControl(''),
    experience_title: new FormControl(''),
    experience_details: new FormControl(''),
		experience_from: new FormControl(''),
    experience_to: new FormControl(''),
	})

  certForm = new FormGroup({
		cert_name: new FormControl(''),
    cert_details: new FormControl(''),
    cert_corporation: new FormControl(''),
		accomplished_date: new FormControl(''),
	})

  //Sets form type, can show, or close current form.
  emptyType(value: string) {
    this.setType.emit(value);
  }

  submitForm(type: string){
    switch (type) {
      case 'educ':
        if(this.educValue == undefined){
          console.log("Adding Educ to Resume");
          this.addRes(this.educForm, 'addEduc');
        }
        else{
          console.log("Updating Educ to Resume");
          this.editRes(this.educForm, 'editEduc', this.educValue.educattainment_ID);
        }
        break;

      case 'cert':
        if(this.certValue == undefined){
          console.log("Adding Cert to Resume");
          // this.addRes(this.educForm, 'addEduc');
        }
        else{
          console.log("Updating Cert to Resume");
          // this.editRes(this.educForm, 'editEduc', this.educValue.educattainment_ID);
        }
        break;
    
      default:
        break;
    }
    
  }

  //Dynamic Create, Edit, and Delete function call for faculty post service.
  addRes(form: FormGroup, type: string){
    this.facultyService.addRes(form, type).subscribe({
      next: value => {console.log(value);
                      this.emptyType('');},
      error: err => console.log(err),
    });
  }

  editRes(form: FormGroup, type: string, id: number){
    this.facultyService.editRes(form, type, id).subscribe({
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