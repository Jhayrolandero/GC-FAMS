import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FacultyBoxComponent } from '../../components/admin/faculty-members/faculty-box/faculty-box.component';
import { FacultymembersService } from '../../services/admin/facultymembers.service';
import { FacultyMember } from '../../services/admin/facultymembers';
import { NgFor } from '@angular/common';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { facultyMemberResource } from '../../services/admin/facultyMemberResource';
import { FacultySectionComponent } from './faculty-section/faculty-section.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ModalComponent } from '../../components/modal/modal.component';
import { CvComponent } from '../../components/cv/cv.component';


@Component({
  selector: 'app-faculty-members',
  standalone: true,
  imports: [FacultyBoxComponent, NgFor, PaginationComponent, FacultySectionComponent, CanvasJSAngularChartsModule, CvComponent, ModalComponent],
  providers: [FacultymembersService],
  templateUrl: './faculty-members.component.html',
  styleUrl: './faculty-members.component.css'
})

export class FacultyMembersComponent {
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
  facultyMembers: any = [];
  fullTime: number = 0;
  partTime: number = 0;
  fulltimeInclass: number = 0;
  parttimeInclass: number = 0;
  constructor( private facultyService: FacultymembersService ){

  }

  getFacultyMembers(params?: any): void {
    // console.log(this.facultyService.getURI(params))
    this.facultyService.getFacultyMembers(params)
        .subscribe(facultyMembers => {
          this.facultyMembers = facultyMembers.data

          this.fullTime = 0
          this.partTime = 0
          this.fulltimeInclass = 0
          this.parttimeInclass = 0

          this.facultyMembers.map( (members:any) => {
            if(members.employment === 'Full-Time') this.fullTime++;
            else if(members.employment === 'Part-Time') this.partTime++;

            if(members.status === 'In-Class' && members.employment === 'Full-Time') this.fulltimeInclass++
            else if(members.status === 'In-Class' && members.employment === 'Part-Time') this.parttimeInclass++
          })
        });
  }

  // ngOnInit(): void {
  //   this.getFacultyMembers();
  // }
}
