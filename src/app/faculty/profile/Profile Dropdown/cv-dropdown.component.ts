import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyCertificationsComponent } from '../Profile Components/faculty-certifications/faculty-certifications.component';
import { FacultyEducationComponent } from '../Profile Components/faculty-education/faculty-education.component';
import { FacultyExperienceComponent } from '../Profile Components/faculty-experience/faculty-experience.component';
import { FacultyExpertiseComponent } from '../Profile Components/faculty-expertise/faculty-expertise.component';
import { FacultyProjectsComponent } from '../Profile Components/faculty-projects/faculty-projects.component';
import { MatDialog } from '@angular/material/dialog';
import { FacultyCertificationsFormComponent } from '../Profile Forms/certification-form/faculty-certifications-form.component';
import { EducationalAttainmentFormComponent } from '../Profile Forms/educational-attainment-form/educational-attainment-form.component';
import { CvDeleteForm } from '../Profile Forms/delete-form/cv-delete-form.component';
import { Store } from '@ngrx/store';
import { loadCert, loadEduc, loadExp, loadExpertise, loadProj } from '../../../state/faculty-state/faculty-state.actions';
import { IndustryExperienceFormComponent } from '../Profile Forms/industry-experience-form/industry-experience-form.component';
import { ProjectsFormComponent } from '../Profile Forms/projects-form/projects-form.component';
import { ExpertiseFormComponent } from '../Profile Forms/expertise-form/expertise-form.component';


@Component({
    selector: 'app-cv-dropdown',
    standalone: true,
    templateUrl: './cv-dropdown.component.html',
    styleUrl: './cv-dropdown.component.css',
    imports: [CommonModule, FacultyCertificationsComponent, FacultyEducationComponent, FacultyExperienceComponent, FacultyProjectsComponent, FacultyExpertiseComponent]
})
export class CvDropdownComponent {
  //Name of dropdown
  @Input() name?: string;
  //Rotated state of icon
  rotated = true;

  constructor(
    public dialog: MatDialog,
    public store: Store){}

  rotate(){
    this.rotated = !this.rotated;
  }

  //Opens dynamic delete dialog
  deleteDialog(deleteData: any){
    const deleteForm = this.dialog.open(CvDeleteForm, {
      data: deleteData
    }).afterClosed().subscribe(result => {
      switch (result) {
        case 0:
          this.store.dispatch(loadEduc());
          break;

        case 1:
          this.store.dispatch(loadCert());
          break;

        case 2:
          this.store.dispatch(loadExp());
          break;

        case 3:
          this.store.dispatch(loadProj());
          break;

        case 4:
          this.store.dispatch(loadExpertise());
          break;
      
        default:
          break;
      }
    })
  }

  //Cases for opening dialogue
  openDialog(formType: any, editData: any){
    switch (formType) {
      case "Educational Attainment":
        const educRef = this.dialog.open(EducationalAttainmentFormComponent, {
          data: editData
        });
        break;

      case "Certifications":
        const certRef = this.dialog.open(FacultyCertificationsFormComponent);
        break;

      case "Industry Experience":
        const expRef = this.dialog.open(IndustryExperienceFormComponent, {
          data: editData
        });
        break;

      case "Projects":
        const projRef = this.dialog.open(ProjectsFormComponent, {
          data: editData
        });
        break;

      case "Expertise":
        const expertiseRef = this.dialog.open(ExpertiseFormComponent, {
          data: editData
        });
        break;

      default:
        break;
    }
  }
}
