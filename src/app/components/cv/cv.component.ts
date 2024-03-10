import { Component, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Resume } from '../../services/Interfaces/resume';
import { Certifications } from '../../services/Interfaces/certifications';
import { EducationalAttainment } from '../../services/Interfaces/educational-attainment';
import { IndustryExperience } from '../../services/Interfaces/industry-experience';
import { Project } from '../../services/Interfaces/project';
import { Profile } from '../../services/Interfaces/profile';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';
import { Router } from '@angular/router';
import { mainPort } from '../../app.component';
import { profile } from 'console';
import { CommonModule } from '@angular/common';
import { Schedule } from '../../services/admin/schedule';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [ModalComponent, CommonModule],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css'
})



export class CvComponent {
  facultyProfile!: Profile;
  resume?: Resume;
  college?: string;
  schedules?: Schedule[];

  constructor(private facultyService: FacultyFetcherService, private router: Router){
    this.getProfile();
    this.getResume();
    this.getSchedule();
  }

  //OPEN PRINT SCREEN AFTER RENDER, TURN THIS OFF FOR DEV PURPOSES
  ngAfterViewInit(){
    window.print();
  }

  getProfile(){
    this.facultyService.fetchProfile().subscribe({
    next: (next) => {this.facultyProfile = next;console.log(this.facultyProfile)},
    error: (error) => {
      console.log(error);
      this.router.navigate(['/']);
    },
    complete: () => {
      this.facultyProfile.profile_image = mainPort + this.facultyProfile.profile_image;
      this.facultyProfile.cover_image = mainPort + this.facultyProfile.cover_image;
      console.log(this.facultyProfile);
    }
    });
  }

  getSchedule(){
    //Fetches the schedule data based on passed selected date
    this.facultyService.fetchSchedDay().subscribe({
      next: value => {this.schedules = value;
                      console.log(this.schedules);},
      error: err => {if(err.status == 403){this.router.navigate(['/']);}}
    });
  }

  getResume(){
    this.facultyService.fetchResume().subscribe({
      next: value => {this.resume = value;
                      console.log(this.resume);},
      error: err => {console.log(err);if(err.status == 403){this.router.navigate(['/']);}}
    });
  }
}

