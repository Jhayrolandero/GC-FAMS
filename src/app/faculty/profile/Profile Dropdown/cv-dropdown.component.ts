import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyCertificationsComponent } from '../Profile Components/faculty-certifications/faculty-certifications.component';
import { FacultyEducationComponent } from '../Profile Components/faculty-education/faculty-education.component';
import { FacultyExperienceComponent } from '../Profile Components/faculty-experience/faculty-experience.component';
import { FacultyExpertiseComponent } from '../Profile Components/faculty-expertise/faculty-expertise.component';
import { FacultyProjectsComponent } from '../Profile Components/faculty-projects/faculty-projects.component';
import { MatDialog } from '@angular/material/dialog';
import { FacultyCertificationsFormComponent } from './Profile Forms/Certification Form/faculty-certifications-form.component';
import { EducationalAttainmentFormComponent } from './Profile Forms/Educattainment Form/educational-attainment-form.component';


@Component({
    selector: 'app-cv-dropdown',
    standalone: true,
    templateUrl: './cv-dropdown.component.html',
    styleUrl: './cv-dropdown.component.css',
    imports: [CommonModule, FacultyCertificationsComponent, FacultyEducationComponent, FacultyExperienceComponent, FacultyProjectsComponent, FacultyExpertiseComponent]
})
export class CvDropdownComponent {
  @Input() name?: string;
  rotated = true;

  //A somewhat hacky solution to trigger refresh on each cv component
  refresher = [true,true,true,true,true];

  constructor(public dialog: MatDialog){}

  rotate(){
    this.rotated = !this.rotated;
  }

  //Cases for opening dialogue
  openDialog(formType: any){
    switch (formType) {
      case "Certifications":
        const certRef = this.dialog.open(FacultyCertificationsFormComponent).afterClosed().subscribe(result => {
          this.refresher[1] = !this.refresher[1];
        })
        break;

      case "Educational Attainment":
        const educRef = this.dialog.open(EducationalAttainmentFormComponent).afterClosed().subscribe(result => {
          this.refresher[0] = !this.refresher[0];
        })
        break;
    
      default:
        break;
    }
  }
}
