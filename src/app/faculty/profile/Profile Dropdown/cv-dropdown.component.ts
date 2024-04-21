import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyCertificationsComponent } from '../Profile Components/faculty-certifications/faculty-certifications.component';
import { FacultyEducationComponent } from '../Profile Components/faculty-education/faculty-education.component';
import { FacultyExperienceComponent } from '../Profile Components/faculty-experience/faculty-experience.component';
import { FacultyExpertiseComponent } from '../Profile Components/faculty-expertise/faculty-expertise.component';
import { FacultyProjectsComponent } from '../Profile Components/faculty-projects/faculty-projects.component';
import { MatDialog } from '@angular/material/dialog';
import { FacultyCertificationsFormComponent } from '../Profile Forms/Certification Form/faculty-certifications-form.component';
import { EducationalAttainmentFormComponent } from '../Profile Forms/Educattainment Form/educational-attainment-form.component';
import { CvDeleteForm } from '../Profile Forms/Delete Form/cv-delete-form.component';


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

  //A somewhat hacky solution to trigger refresh on each cv component


  constructor(public dialog: MatDialog){}

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
          
          break;

        case 1:
          
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


    
      default:
        break;
    }
  }
}
