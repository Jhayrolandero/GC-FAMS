import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FacultyBoxComponent } from '../../components/admin/faculty-members/faculty-box/faculty-box.component';
import { FacultymembersService } from '../../services/admin/facultymembers.service';
import { FacultyMember } from '../../services/admin/facultymembers';
import { CommonModule, NgFor } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { facultyMemberResource } from '../../services/admin/facultyMemberResource';
import { FacultySectionComponent } from './faculty-section/faculty-section.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ModalComponent } from '../../components/modal/modal.component';
import { CvComponent } from '../../components/cv/cv.component';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';
import { Faculty } from '../../services/Interfaces/faculty';
import { College } from '../../services/Interfaces/college';
import { mainPort } from '../../app.component';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
type response = {
  code: number,
  data: Faculty[]
}
@Component({
  selector: 'app-faculty-members',
  standalone: true,
  imports: [FacultyBoxComponent,
    NgFor,
    PaginationComponent,
    FacultySectionComponent,
    CanvasJSAngularChartsModule,
    CvComponent,
    ModalComponent,
  CommonModule,
LoadingScreenComponent],
  providers: [FacultymembersService],
  templateUrl: './faculty-members.component.html',
  styleUrl: './faculty-members.component.css'
})

export class FacultyMembersComponent implements OnInit {

  isLoading: boolean = true
  ngOnInit(): void {
    this.getCollegeAndFaculty()
  }
  chartOptions = {

    backgroundColor: 'transparent',
    indexLabelPlacement: "outside",
	  animationEnabled: true,
	  data: [{
      indexLabel: "{name}",
		type: "doughnut",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 50, name: "Part-Time", color: "#FFA500" },
		  { y: 50, name: "Full-Time" },
		]
	  }]
	}
  status = {

    backgroundColor: 'transparent',
    indexLabelPlacement: "outside",
	  animationEnabled: true,
	  data: [{
      indexLabel: "{name}",
		type: "doughnut",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 33.33, name: "In-Class", color: "#d2292b" },
		  { y: 33.33, name: "Day-Off", color: "#24ac64" },
		  { y: 33.33, name: "Unavailable", color: "#9ca3af" },
		]
	  }]
	}
  colleges = {

    backgroundColor: 'transparent',
    indexLabelPlacement: "outside",
	  animationEnabled: true,

	  data: [{
      indexLabel: "{name}",
		type: "doughnut",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 33.33, name: "CCS", color: "#f79548" },
		  { y: 33.33, name: "CAHS", color: "#e02424" },
		  { y: 33.33, name: "CEAS", color: "#074287" },
		  { y: 33.33, name: "CHTM", color: "#fc8eb0" },
		  { y: 33.33, name: "CBA", color: "#ffe444" },
		]
	  }]
	}
  facultyMembers: Faculty[] = [];
  collegeItems: College[] = [];
  fullTime: number = 0;
  partTime: number = 0;
  fulltimeInclass: number = 0;
  parttimeInclass: number = 0;
  constructor(
    private facultyService: FacultyFetcherService,
    private router: Router    ){

  }


  getCollegeAndFaculty() {
    forkJoin({
      collegeRequest: this.facultyService.fetchCollege(),
      facultyRequest: this.facultyService.fetchFaculty()
    }).subscribe({
      next: (({collegeRequest, facultyRequest}) => {
        this.collegeItems = collegeRequest
        this.facultyMembers = facultyRequest
      }),
      error: (error) => {
        console.log(error);
        this.router.navigate(['/'])
      },
      complete: () => {

        console.log(this.collegeItems)
    this.facultyMembers = this.facultyMembers.map(facultyMember => {
      return {
        ...facultyMember,
        profile_image: mainPort + facultyMember.profile_image
      };
    });

this.isLoading = false
      }
    })
  }


}
