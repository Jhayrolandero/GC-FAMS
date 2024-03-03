import { Component } from '@angular/core';
import { ProfileFacultyFetcherService } from '../../services/faculty/profile-faculty-fetcher.service';
import { ScheduleFacultyFetcherService } from '../../services/faculty/schedule-faculty-fetcher.service';
import { Profile } from '../../services/Interfaces/profile';
import { schedule } from '../../services/admin/schedule';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { mainPort } from '../../app.component';
import { FacultyEducationComponent } from '../../components/faculty/faculty-education/faculty-education.component';
import { FacultyCertificationsComponent } from '../../components/faculty/faculty-certifications/faculty-certifications.component';
import { FacultyExpertiseComponent } from '../../components/faculty/faculty-expertise/faculty-expertise.component';
import { profile } from 'console';

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
  profileLink = "";
  coverLink = "";
  educToggle = true;
  certToggle = true;
  expToggle = true;

  constructor(private schedule:ScheduleFacultyFetcherService, private profileFetcher: ProfileFacultyFetcherService, private router: Router){ 
    this.getProfile();
    this.getSchedule();
  }

  getProfile(){
    this.profileFetcher.fetchProfile().subscribe((next) => {
      this.facultyProfile = next;
      this.profileLink = mainPort + this.facultyProfile.profile_image;
      this.coverLink = mainPort + this.facultyProfile.cover_image;
    }, (error) => {
      if(error.status == 403){
        console.log(error);
        this.router.navigate(['/']);
      }
    });
  }

  getSchedule(){
    //Fetches the schedule data based on passed selected date
    this.schedule.fetchSchedDay().subscribe((next: schedule[]) => {
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
