import { Component } from '@angular/core';
import { ProfileFacultyFetcherService } from '../../services/faculty/profile-faculty-fetcher.service';
import { Profile } from '../../services/Interfaces/profile';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FacultyEducationComponent } from '../../components/faculty/faculty-education/faculty-education.component';
import { FacultyCertificationsComponent } from '../../components/faculty/faculty-certifications/faculty-certifications.component';
import { FacultyExpertiseComponent } from '../../components/faculty/faculty-expertise/faculty-expertise.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FacultyEducationComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  facultyProfile!: Profile;

  constructor(private profileFetcher: ProfileFacultyFetcherService, private router: Router){ 
    this.getProfile();
  }

  ngOnInit(){
    this.getProfile();
  }

  getProfile(){
    this.profileFetcher.fetchProfile().subscribe((next: Profile[]) => {
      this.facultyProfile = next[0];
      console.log(next[0].birthdate);
    }, (error) => {
      if(error.status == 403){
        console.log(error);
        this.router.navigate(['/']);
      }
    });
  }
}
