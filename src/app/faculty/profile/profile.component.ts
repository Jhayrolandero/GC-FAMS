import { Component } from '@angular/core';
import { Schedule } from '../../services/admin/schedule';
import { Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { mainPort } from '../../app.component';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { MessageComponent } from '../../components/message/message.component';
import { CvDropdownComponent } from "./Profile Dropdown/cv-dropdown.component";
import { FacultyCertificationsComponent } from './Profile Components/faculty-certifications/faculty-certifications.component';
import { FacultyEducationComponent } from './Profile Components/faculty-education/faculty-education.component';
import { FacultyExperienceComponent } from './Profile Components/faculty-experience/faculty-experience.component';
import { FacultyExpertiseComponent } from './Profile Components/faculty-expertise/faculty-expertise.component';
import { FacultyProjectsComponent } from './Profile Components/faculty-projects/faculty-projects.component';
import { selectAllProfile, selectCourseSched, selectCourses } from '../../state/faculty-state/faculty-state.selector';
import { Store } from '@ngrx/store';
import { CourseFormComponent } from './Profile Forms/course-form/course-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CvDeleteForm } from './Profile Forms/delete-form/cv-delete-form.component';
import { loadCourse } from '../../state/faculty-state/faculty-state.actions';
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
  public coursesFaculty$ = this.store.select(selectCourseSched);
  public courses$ = this.store.select(selectCourses);
  schedules: Schedule[] = [];

  rotated = false;
  components: string[] = ["Educational Attainment", "Certifications", "Industry Experience", "Projects", "Expertise"]

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
  ) {
  }

  getCv() {
    this.router.navigate(['cv']);
  }

  openDialogue() {
    const courseRef = this.dialog.open(CourseFormComponent);
  }

  deleteDialog(deleteData: any){
    const deleteForm = this.dialog.open(CvDeleteForm, {
      data: ['deleteCourse/' + deleteData, 5]
    }).afterClosed().subscribe(result => {
      this.store.dispatch(loadCourse());
    })
  }

  rotate() {
    this.rotated = !this.rotated;
  }
}

