import { Component } from '@angular/core';
import { Profile } from '../../services/Interfaces/profile';
import { schedule } from '../../services/admin/schedule';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { mainPort } from '../../app.component';
import { FacultyEducationComponent } from '../../components/faculty/faculty-education/faculty-education.component';
import { FacultyCertificationsComponent } from '../../components/faculty/faculty-certifications/faculty-certifications.component';
import { FacultyExpertiseComponent } from '../../components/faculty/faculty-expertise/faculty-expertise.component';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FacultyEducationComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  facultyProfile!: Profile;
  schedules: schedule[] = [];
  educToggle = true;
  certToggle = true;
  expToggle = true;

  constructor(private facultyService: FacultyFetcherService, private router: Router){ 
    this.getProfile();
    this.getSchedule();
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
    this.facultyService.fetchSchedDay().subscribe((next: schedule[]) => {
      this.schedules = next;
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
