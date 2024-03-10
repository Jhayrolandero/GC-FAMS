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

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [LoadingScreenComponent, NgOptimizedImage, CommonModule, FacultyEducationComponent, FacultyCertificationsComponent, FacultyExperienceComponent, FacultyExpertiseComponent, AddFormsComponent]
})
export class ProfileComponent {
  isLoading: boolean = true
  facultyProfile!: Profile;
  schedules: Schedule[] = [];
  resume?: Resume;
  //Edit form preset
  educValue?: EducationalAttainment;

  //Dropdown toggle
  educToggle = true;
  certToggle = true;
  expToggle = true;
  formType = '';

  constructor(private facultyService: FacultyFetcherService, private router: Router, private http: HttpClient){
    this.getProfile();
    this.getSchedule();
    this.getResume();
  }

  setForm(value: string){
    this.formType = value;
    this.educValue = undefined;
    this.getResume();
  }

  setEducValueForm(value: EducationalAttainment){
    this.educValue = value;
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
                      console.log(this.resume);},
      error: err => {if(err.status == 403){this.router.navigate(['/']);}}
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

      default:
        break;
    }
  }
}
