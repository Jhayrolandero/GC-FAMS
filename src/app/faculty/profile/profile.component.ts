import { Component } from '@angular/core';
import { Schedule } from '../../services/admin/schedule';
import { Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { mainPort } from '../../app.component';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { Resume } from '../../services/Interfaces/resume';
import { HttpClient } from '@angular/common/http';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { forkJoin } from 'rxjs';
import { MessageComponent } from '../../components/message/message.component';
import { CvDropdownComponent } from "./Profile Dropdown/cv-dropdown.component";
import { FacultyCertificationsComponent } from './Profile Components/faculty-certifications/faculty-certifications.component';
import { FacultyEducationComponent } from './Profile Components/faculty-education/faculty-education.component';
import { FacultyExperienceComponent } from './Profile Components/faculty-experience/faculty-experience.component';
import { FacultyExpertiseComponent } from './Profile Components/faculty-expertise/faculty-expertise.component';
import { FacultyProjectsComponent } from './Profile Components/faculty-projects/faculty-projects.component';
import { selectAllProfile, selectCourseSched, selectCourses } from '../../state/faculty-state/faculty-state.selector';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [
    MessageComponent,
    LoadingScreenComponent,
    NgOptimizedImage,
    CommonModule,
    FacultyEducationComponent,
    FacultyCertificationsComponent,
    FacultyExperienceComponent,
    FacultyExpertiseComponent,
    FacultyProjectsComponent,
    CvDropdownComponent
  ]

})
export class ProfileComponent {
  isLoading: boolean = true;
  port = mainPort;
  public facultyProfile$ = this.store.select(selectAllProfile);
  public certFaculty$ = this.store.select(selectCourseSched);
  public certs$ = this.store.select(selectCourses);
  schedules: Schedule[] = [];

  rotated = false;
  components: string[] = ["Educational Attainment", "Certifications", "Industry Experience", "Projects", "Expertise"]

  constructor(
    private facultyService: FacultyRequestService, 
    private store: Store,
    private router: Router, 
    private http: HttpClient){}

  getCv() {
    this.router.navigate(['cv']);
  }

  rotate(){
    this.rotated = !this.rotated;
  }
}

