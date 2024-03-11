import { Component } from '@angular/core';
import { Profile } from '../../services/Interfaces/profile';
import { Schedule } from '../../services/admin/schedule';
import { Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { mainPort } from '../../app.component';
import { FacultyEducationComponent } from '../../components/faculty/faculty-profile/faculty-education/faculty-education.component';
import { FacultyCertificationsComponent } from '../../components/faculty/faculty-profile/faculty-certifications/faculty-certifications.component';
import { FacultyExpertiseComponent } from '../../components/faculty/faculty-profile/faculty-expertise/faculty-expertise.component';
import { FacultyExperienceComponent } from '../../components/faculty/faculty-profile/faculty-experience/faculty-experience.component';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';
import { Resume } from '../../services/Interfaces/resume';
import { HttpClient } from '@angular/common/http';
import { AddFormsComponent } from '../../components/faculty/add-forms/add-forms.component';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { EducationalAttainment } from '../../services/Interfaces/educational-attainment';
import { Certifications } from '../../services/Interfaces/certifications';
import { IndustryExperience } from '../../services/Interfaces/industry-experience';
import { FacultyProjectsComponent } from '../../components/faculty/faculty-profile/faculty-projects/faculty-projects.component';
import { Project } from '../../services/Interfaces/project';
import { CvComponent } from '../../components/cv/cv.component';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { Expertise } from '../../services/Interfaces/expertise';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [LoadingScreenComponent, NgOptimizedImage, CommonModule, FacultyEducationComponent, FacultyCertificationsComponent, FacultyExperienceComponent, FacultyExpertiseComponent, AddFormsComponent, FacultyProjectsComponent, CvComponent]
})
export class ProfileComponent {
  tempPort = mainPort;
  isLoading: boolean = true
  facultyProfile!: Profile;
  resume?: Resume;
  schedules: Schedule[] = [];
  //Edit form preset
  educValue?: EducationalAttainment;
  certValue?: Certifications;
  expValue?: IndustryExperience;
  specValue?: Expertise;
  projValue?: Project;

  //Dropdown toggle
  educToggle = true;
  certToggle = true;
  expToggle = true;
  specToggle = true;
  projToggle = true;
  formType = '';

  //CV form toggle
  cvToggle = false;

  constructor(private facultyService: FacultyFetcherService, private router: Router, private http: HttpClient){
    this.getProfile();
    this.getSchedule();
    this.getResume();
  }

  setForm(value: string){
    this.formType = value;

    //Refreshed passed form value for edit.
    this.educValue = undefined;
    this.certValue = undefined;
    this.expValue = undefined;
    this.projValue = undefined;
    this.specValue = undefined;

    //Refreshes resume get.
    this.getResume();
  }

  setEducValueForm(value: EducationalAttainment){
    this.educValue = value;
  }

  setCertValueForm(value: Certifications){
    this.certValue = value;
  }

  setExpValueForm(value: IndustryExperience){
    this.expValue = value;
  }

  setSpecValueForm(value: Expertise){
    this.specValue = value;
  }

  setProjValueForm(value: Project){
    this.projValue = value;
  }

  getProfile(){
    this.facultyService.fetchProfile().subscribe({
    next: (next) => this.facultyProfile = next,
    error: (error) => {
      console.log(error);
      this.router.navigate(['/']);
    },
    complete: () => {
      this.facultyProfile.profile_image = mainPort + this.facultyProfile.profile_image;
      this.facultyProfile.cover_image = mainPort + this.facultyProfile.cover_image;
      this.isLoading = false
    }
    });
  }

  getSchedule(){
    //Fetches the schedule data based on passed selected date
    this.facultyService.fetchSchedDay().subscribe({
      next: value => this.schedules = value,
      error: err => {if(err.status == 403){this.router.navigate(['/']);}}
    });
  }

  getResume(){
    this.facultyService.fetchResume().subscribe({
      next: value => {this.resume = value;
                      console.log(this.resume);
                    },
      error: err => {console.log(err);if(err.status == 403){this.router.navigate(['/']);}}
    });
  }

  showAdd(comp: string){
    switch (comp) {
      case "educ":

        break;

      default:
        break;
    }
  }

  testPng(){
    console.log("Test");
    var cv = document.getElementById('cv')!;
    html2canvas(cv).then(canvas => {
    // Few necessary setting options
    var imgWidth = 210;
    var pageHeight = 297;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('new-file.pdf'); // Generated PDF
    });
  }

  getCv(){
    // const url = this.router.serializeUrl(this.router.createUrlTree(['cv']));
    // window.open(url, '_blank');
    this.router.navigate(['cv']);
  }


  toggle(drop: string){
    switch (drop) {
      case 'ed':
        this.educToggle = !this.educToggle;
        break;

      case 'cr':
        this.certToggle = !this.certToggle;
        break;

      case 'ex':
        this.expToggle = !this.expToggle;
        break;

      case 'pr':
        this.projToggle = !this.projToggle;
        break;

      case 'sp':
        this.specToggle = !this.specToggle;
        break;

      case 'cv':
        this.cvToggle = !this.cvToggle;
        break;

      default:
        break;
    }
  }
}

