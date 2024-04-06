import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Faculty } from '../../../services/Interfaces/faculty';
import { College } from '../../../services/Interfaces/college';
import { mainPort } from '../../../app.component';
import { LoadingScreenComponent } from '../../../components/loading-screen/loading-screen.component';
import { forkJoin } from 'rxjs';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { Router } from '@angular/router';

type FacultyMember = {
  first_name: string,
  middle_name: string,
  last_name: string,
  ext_name: string,
  email: string,
  teaching_position: string,
  employment_status: number,
  profile_image: string,
  college: string
}
@Component({
  selector: 'app-faculty-section',
  standalone: true,
  imports: [NgClass, NgFor, LoadingScreenComponent, CommonModule],
  templateUrl: './faculty-section.component.html',
  styleUrl: './faculty-section.component.css'
})
export class FacultySectionComponent {
  constructor(
    private facultyService: FacultyRequestService,
    private router: Router) { }
  isLoading: boolean = true

  //facultyMembers: FacultyMember[] = []
  facultyMembers: Faculty[] = [];
  colleges: College[] = [];
  faculty: FacultyMember[] = []


  ngOnInit(): void {
    this.getCollegeAndFaculty()
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.createFacultyMember()
  //   console.log(changes)
  // }

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

        this.isLoading = false
        this.createFacultyMember()
        console.log(this.faculty)
      }
    })
  }


  createFacultyMember() {
    this.faculty = this.facultyMembers.map((facultyMember: Faculty) => {
      const facultyCollegeAbbrev = this.colleges.find(
        (college) => college.college_ID === facultyMember.college_ID
      )?.college_abbrev || '';

      return {
        first_name: facultyMember.first_name,
        middle_name: facultyMember.middle_name,
        last_name: facultyMember.last_name,
        ext_name: facultyMember.ext_name,
        email: facultyMember.email,
        teaching_position: facultyMember.teaching_position,
        employment_status: facultyMember.employment_status,
        profile_image: facultyMember.profile_image,
        college: facultyCollegeAbbrev
      };
    });

  }
}
