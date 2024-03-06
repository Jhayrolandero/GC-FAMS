import { Component } from '@angular/core';
import { Profile } from '../../services/Interfaces/profile';
import { Schedule } from '../../services/admin/schedule';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { mainPort } from '../../app.component';
import { FacultyEducationComponent } from '../../components/faculty/faculty-education/faculty-education.component';
import { FacultyCertificationsComponent } from '../../components/faculty/faculty-certifications/faculty-certifications.component';
import { FacultyExpertiseComponent } from '../../components/faculty/faculty-expertise/faculty-expertise.component';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';
import { Resume } from '../../services/Interfaces/resume';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [CommonModule, FacultyEducationComponent, FacultyCertificationsComponent]
})
export class ProfileComponent {
  facultyProfile!: Profile;
  schedules: Schedule[] = [];
  resume!: Resume;
  educToggle = true;
  certToggle = true;
  expToggle = true;

  constructor(private facultyService: FacultyFetcherService, private router: Router){ 
    this.getProfile();
    this.getSchedule();
    this.getResume();
  }

  getProfile(){
    this.facultyService.fetchProfile().subscribe((next) => {
      this.facultyProfile = next;
      this.facultyProfile.profile_image = mainPort + this.facultyProfile.profile_image;
      this.facultyProfile.cover_image = mainPort + this.facultyProfile.cover_image;
    }, (error) => {
      if(error.status == 403){
        console.log(error);
        this.router.navigate(['/']);
      }
    });
  }

  getSchedule(){
    //Fetches the schedule data based on passed selected date
    this.facultyService.fetchSchedDay().subscribe((next: Schedule[]) => {
      this.schedules = next;
    }, (error) => {
      if(error.status == 403){
        this.router.navigate(['/']);
      };
    });
  }

  getResume(){
    this.facultyService.fetchResume().subscribe((next: Resume) => {
      this.resume = next;
      console.log(this.resume);
    }, (error) => {
      if(error.status == 403){
        this.router.navigate(['/']);
      };
    });
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
