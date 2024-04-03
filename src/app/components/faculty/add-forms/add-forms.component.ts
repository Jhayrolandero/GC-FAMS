import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { EducationalAttainment } from '../../../services/Interfaces/educational-attainment';
import { Certifications } from '../../../services/Interfaces/certifications';
import { IndustryExperience } from '../../../services/Interfaces/industry-experience';
import { Project } from '../../../services/Interfaces/project';
import { Expertise } from '../../../services/Interfaces/expertise';
import { MessageService } from '../../../services/message.service';
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
  @Input() specValue?: Expertise;
  @Input() projValue?: Project;
  @Output() setType = new EventEmitter<string>();

  constructor(
    private facultyService: FacultyRequestService,
    private messageService: MessageService
  ) { }

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

  specForm = new FormGroup({
    expertise_name: new FormControl(''),
    expertise_confidence: new FormControl('')
  })

  projForm = new FormGroup({
    project_name: new FormControl(''),
    project_date: new FormControl(''),
    project_detail: new FormControl(''),
    project_link: new FormControl(''),
  })

  //Sets form type, can show, or close current form.
  emptyType(value: string) {
    this.setType.emit(value);
  }

  submitForm(type: string) {
    switch (type) {
      case 'educ':
        if (this.educValue == undefined) {
          this.messageService.sendMessage("Adding Education to Resume", 0)
          // console.log("Adding Educ to Resume");
          this.addRes(this.educForm, 'addEduc');
        }
        else {
          // console.log("Updating Educ to Resume");
          this.messageService.sendMessage("Updating Education to Resume", 0)
          this.editRes(this.educForm, 'editEduc', this.educValue.educattainment_ID);
        }
        break;

      case 'cert':
        if (this.certValue == undefined) {
          // console.log("Adding Cert to Resume");
          this.messageService.sendMessage("Adding Certificate to Resume", 0)
          this.addRes(this.certForm, 'addCert');
        }
        else {
          // console.log("Updating Cert to Resume");
          this.messageService.sendMessage("Updating Certificate to Resume", 0)
          this.editRes(this.certForm, 'editCert', this.certValue.cert_ID);
        }
        break;

      case 'spec':
        if (this.specValue == undefined) {
          // console.log("Adding Spec to Resume");
          this.messageService.sendMessage("Adding Specialization to Resume", 0)
          this.addRes(this.specForm, 'addSpec');
        }
        else {
          // console.log("Updating Spec to Resume");
          this.messageService.sendMessage("Updating Specilization to Resume", 0)
          this.editRes(this.specForm, 'editSpec', this.specValue.expertise_ID);
        }
        break;

      case 'exp':
        if (this.expValue == undefined) {
          // console.log("Adding Experience to Resume");
          this.messageService.sendMessage("Adding Experience to Resume", 0)
          this.addRes(this.expForm, 'addExp');
        }
        else {
          // console.log("Updating Experience to Resume");
          this.messageService.sendMessage("Updating Experience to Resume", 0)
          this.editRes(this.expForm, 'editExp', this.expValue.experience_ID);
        }
        break;

      case 'proj':
        if (this.projValue == undefined) {
          console.log("Adding Project to Resume");
          this.messageService.sendMessage("Adding Project to Resume", 0)
          this.addRes(this.projForm, 'addProj');
        }
        else {
          // console.log("Updating Project to Resume");
          this.messageService.sendMessage("Updating Project to Resume", 0)
          this.editRes(this.projForm, 'editProj', this.projValue.project_ID);
        }
        break;

      default:
        break;
    }

  }

  //Dynamic Create, Edit, and Delete function call for faculty post service.
  addRes(form: FormGroup, type: string) {
    this.facultyService.postData(form, type).subscribe({
      next: value => {
        let tempType = ''

        switch (type) {
          case 'addEduc':
            tempType = 'Education'
            break
          case 'addCert':
            tempType = 'Certificate'
            break
          case 'addExp':
            tempType = 'Experience'
            break
          case 'addProj':
            tempType = 'Project'
            break
          case 'addSpec':
            tempType = 'Specialization'
            break
        }
        this.messageService.sendMessage(`${tempType} Successfully Added!`, 1)
        console.log(value);
        this.emptyType('');
      },
      error: err => {
        console.log(err)
        this.messageService.sendMessage("An unexpected Error has occurred!", -1)
      }
    });
  }

  editRes(form: FormGroup, type: string, id: number) {
    this.facultyService.patchData(form, type + "/" + id).subscribe({
      next: value => {
        console.log(value);
        let tempType = ''

        switch (type) {
          case 'editEduc':
            tempType = 'Education'
            break
          case 'editCert':
            tempType = 'Certificate'
            break
          case 'editExp':
            tempType = 'Experience'
            break
          case 'editProj':
            tempType = 'Project'
            break
          case 'editSpec':
            tempType = 'Specialization'
            break
        }
        this.messageService.sendMessage(`${tempType} Successfully Edited!`, 1)

        this.emptyType('');
      },
      error: err => {
        console.log(err),
          this.messageService.sendMessage("An unexpected Error has occurred!", -1)
      }
    });
  }

  deleteRes(id: number, type: string) {
    this.facultyService.deleteData(type + "/" + id).subscribe({
      next: value => {
        console.log(value);
        let tempType = ''

        switch (type) {
          case 'deleteEduc':
            tempType = 'Education'
            break
          case 'deleteCert':
            tempType = 'Certificate'
            break
          case 'deleteExp':
            tempType = 'Experience'
            break
          case 'deleteProj':
            tempType = 'Project'
            break
          case 'deleteSpec':
            tempType = 'Specialization'
            break
        }
        this.messageService.sendMessage(`${tempType} Successfully Deleted!`, 1)

        this.emptyType('');
      },
      error: err => {
        this.messageService.sendMessage("An unexpected Error has occurred!", -1)
        console.log(err)
      }
    });
  }
}
