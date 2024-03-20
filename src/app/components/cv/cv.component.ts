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
  tempPort = mainPort;
  facultyProfile!: Profile;
  resume!: Resume;
  schedules!: Schedule[];
  college?: string;
  filteredSchedules = new Set();



  constructor(private facultyService: FacultyFetcherService, private router: Router){
    this.getProfile();
    this.getSchedule();
    this.getResume();
  }

  //OPEN PRINT SCREEN AFTER RENDER, TURN THIS OFF FOR DEV PURPOSES
  // ngAfterViewInit(){
  //   window.print();
  // }

  getProfile(){
    this.facultyService.fetchData(this.facultyProfile, 'getprofile/fetchProfile').subscribe({
    next: (next) => this.facultyProfile = next,
    error: (error) => {
      console.log(error);
      this.router.navigate(['/']);
    },
    complete: () => {
      this.facultyProfile.profile_image = mainPort + this.facultyProfile.profile_image;
      this.facultyProfile.cover_image = mainPort + this.facultyProfile.cover_image;
      console.log("Profile loaded.");
    }
    });
  }

  getSchedule(){
    //Fetches the schedule data based on passed selected date
    this.facultyService.fetchData(this.schedules, 'getschedules/fetchFaculty').subscribe({
      next: value => {this.schedules = value;
                      this.filterSched();},
      error: err => {if(err.status == 403){this.router.navigate(['/']);}},
      complete: () => console.log("Schedule loaded.")
    });
  }

  getResume(){
    this.facultyService.fetchData(this.resume, 'getresume/fetchResume').subscribe({
      next: value => this.resume = value,
      error: err => {console.log(err);if(err.status == 403){this.router.navigate(['/']);}},
      complete: () => console.log("ResumeInfo loaded.")
    });
  }

  filterSched(){
    this.schedules?.forEach(schedule =>{
      if(!this.filteredSchedules.has(schedule.course_name)){
        this.filteredSchedules.add(schedule.course_name);
      }
    })

    this.filteredSchedules.forEach(schedule => {
      if (typeof schedule === 'string' && /\(LEC\)/.test(schedule)) {
          this.filteredSchedules.delete(schedule);
      }

    let tempFilt = new Set();

    this.filteredSchedules.forEach(schedule => {
      if(typeof schedule === 'string' && schedule.includes("(LAB)")) {
        const tempItem = schedule.replace("(LAB)", "");
        tempFilt.add(tempItem);
      }
      else{
        tempFilt.add(schedule);
      }
    })
    this.filteredSchedules = tempFilt;
  });
  }


}

