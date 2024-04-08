import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Faculty } from '../../../services/Interfaces/faculty';
import { College } from '../../../services/Interfaces/college';
import { mainPort } from '../../../app.component';
import { LoadingScreenComponent } from '../../../components/loading-screen/loading-screen.component';
import { forkJoin } from 'rxjs';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { Router } from '@angular/router';
import { FacultySkeletonComponent } from '../../../components/faculty-skeleton/faculty-skeleton.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MessageService } from '../../../services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../components/dialog-box/dialog-box.component';
import { FacultyFormComponent } from '../../../components/admin/faculty-form/faculty-form.component';

@Component({
  selector: 'app-faculty-section',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    LoadingScreenComponent,
    CommonModule,
    FacultySkeletonComponent,
    MatButtonModule,
    MatMenuModule,
    DialogBoxComponent
  ],
  templateUrl: './faculty-section.component.html',
  styleUrl: './faculty-section.component.css'
})
export class FacultySectionComponent {

  constructor(
    private facultyService: FacultyRequestService,
    private router: Router,
    private messageService: MessageService,
    public dialog: MatDialog) { }

  //facultyMembers: FacultyMember[] = []
  facultyMembers: Faculty[] = [];
  colleges: College[] = [];


  ngOnInit(): void {
    this.getCollegeAndFaculty()
  }


  getCollegeAndFaculty() {
    forkJoin({
      collegeRequest: this.facultyService.fetchData(this.colleges, 'fetchCollege'),
      facultyRequest: this.facultyService.fetchData(this.facultyMembers, 'faculty')
    }).subscribe({
      next: (({ collegeRequest, facultyRequest }) => {
        this.colleges = collegeRequest
        this.facultyMembers = facultyRequest
      }),
      error: (error) => {
        console.log(error);
        this.router.navigate(['/'])
      },
      complete: () => {
        console.log(this.facultyMembers)
        console.log(this.colleges)
        this.facultyMembers = this.facultyMembers.map(facultyMember => {
          return {
            ...facultyMember,
            profile_image: mainPort + facultyMember.profile_image
          };
        });

        this.createFacultyMember()
      }
    })
  }


  createFacultyMember() {
    this.facultyMembers = this.facultyMembers.map((facultyMember: Faculty) => {
      const facultyCollegeAbbrev = this.colleges.find(
        (college) => college.college_ID === facultyMember.college_ID
      )?.college_abbrev || '';

      return {
        ...facultyMember,
        college: facultyCollegeAbbrev
      };
    });

  }

  deleteForm(id: number): void {
    this.dialog.open(DialogBoxComponent, {
      data: { faculty_ID: id }
    });
  }

  openForm(faculty?: Faculty): void {

    if (faculty) {
      this.dialog.open(FacultyFormComponent, {
        data: { faculty: faculty }
      })
      return
    }
    this.dialog.open(FacultyFormComponent)
  }
}
