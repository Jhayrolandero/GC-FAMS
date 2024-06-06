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
import { selectAllEduc, selectAllExp, selectAllProfile, selectAllProj, selectCourseSched, selectCourses, selectFacultyCerts, selectFacultyExpertise } from '../../state/faculty-state/faculty-state.selector';
import { Store } from '@ngrx/store';
import { CourseFormComponent } from './Profile Forms/course-form/course-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CvDeleteForm } from './Profile Forms/delete-form/cv-delete-form.component';
import { loadCourse } from '../../state/faculty-state/faculty-state.actions';
import { combineLatest } from 'rxjs';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MessageService } from '../../services/message.service';
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
    CvDropdownComponent,
    MatTabsModule,
    NgxDocViewerModule
  ]

})

export class ProfileComponent {
  isLoading: boolean = true;
  port = mainPort;
  public facultyProfile$ = this.store.select(selectAllProfile);
  public coursesFaculty$ = this.store.select(selectCourseSched);
  public courses$ = this.store.select(selectCourses);
  public certs$ = this.store.select(selectFacultyCerts);
  public exps$ = this.store.select(selectAllExp);
  public projects$ = this.store.select(selectAllProj);
  public specs$ = this.store.select(selectFacultyExpertise);
  public educs$ = this.store.select(selectAllEduc);

  schedules: Schedule[] = [];

  rotated = false;
  components: string[] = ["Educational Attainment", "Certifications", "Industry Experience", "Expertise"]
  mainCv: any;



  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
    private messageService: MessageService,
    private facultyRequest: FacultyRequestService
  ) {
    combineLatest([this.facultyProfile$, this.coursesFaculty$, this.certs$, this.exps$, this.projects$, this.specs$, this.educs$]).subscribe(
      ([faculty, courseFaculty, certs, exps, proj, specs, educs]) => {
        this.mainCv = {
          profile: faculty,
          courses: courseFaculty,
          certificates: certs.filter((x) => x.isSelected),
          experience: exps.filter((x) => x.isSelected),
          projects: proj.filter((x) => x),
          expertise: specs.filter((x) => x.isSelected),
          education: educs.filter((x) => x.isSelected)
        }
      }
    )
  }

  updateCV() {
    this.messageService.sendMessage("Updating CV...", 0)
    this.facultyRequest.postData(this.mainCv, 'addCv').subscribe({
      next: (next: any) => {console.log(next);},
      error: (error) => {console.log(error)},
      complete: () => {
        this.messageService.sendMessage("CV has been updated.", 1)
      }
    });
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

