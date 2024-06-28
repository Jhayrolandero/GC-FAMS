import { Component, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FacultySectionComponent } from './faculty-section/faculty-section.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Faculty } from '../../services/Interfaces/faculty';
import { EventEmitter } from '@angular/core';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';
import { ManageindividualanalyticsComponent } from "./manageindividualanalytics/manageindividualanalytics.component";
import { CvComponent } from './cv/cv.component';
import { Store, select } from '@ngrx/store';
import { Subscription, filter, take } from 'rxjs';
import { selectFacultyReport, selectProfile } from '../../state/dean-state/dean-state.selector';
import { FacultyReport } from '../../services/Interfaces/facultyReport';
import { ExcelServiceService } from '../../service/excel-service.service';
import { selectPRofileCollege } from '../../state/faculty-state/faculty-state.selector';

@Component({
    selector: 'app-manage-faculty',
    standalone: true,
    templateUrl: './manage-faculty.component.html',
    styleUrl: './manage-faculty.component.css',
    imports: [
        NgFor,
        LoadingScreenComponent,
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        FacultySectionComponent,
        AddFacultyComponent,
        ManageindividualanalyticsComponent,
        CvComponent
    ]
})

export class ManageFacultyComponent {
  showAdd: boolean = false;
  showAnalytics: boolean = false;
  selectedFaculty!: Faculty;
  editData?: Faculty;
  analyticsData?: Faculty;
  certToggle = false;
  commexToggle = false;
  seminarToggle = false;
  cvToggle = false;
  pdfID!: number
  collegeSubscription!: Subscription
  college!: string

  facultyReportSubscription!: Subscription
  facultyReportData: FacultyReport[] = []
  currSem = this.excelService.getSemester(new Date().getMonth()+'', new Date().getFullYear()).semester + " Semester, A.Y. "+ this.excelService.getSemester(new Date().getMonth()+'', new Date().getFullYear()).academicYear

  constructor(
    private store: Store,
    private excelService: ExcelServiceService

  ) {
    this.editData = undefined;
  }

  ngOnInit() {
    this.facultyReportSubscription = this.store.pipe(
      select(selectFacultyReport),
      filter(data => !!data && data.length > 0),
      take(1)
    ).subscribe({
      next: res => {
        res?.map(item => this.facultyReportData.push(item))
      },
      error: err => console.log(err)
    })

    this.collegeSubscription = this.store.pipe(
      select(selectPRofileCollege),
      filter(data => !!data),
      take(1)
    ).subscribe({
      next: res => this.college = res!
    })
  }


  switchShow(){
    if(this.showAdd) this.editData = undefined;
    this.showAdd = !this.showAdd;
  }



  editFaculty(faculty: Faculty){
    this.editData = faculty;
    this.switchShow();
  }

  triggerAnalytics(faculty: Faculty){
    this.showAnalytics = !this.showAnalytics;
    this.selectedFaculty = faculty;
  }

  triggerCV(faculty_ID: number){
    this.cvToggle = !this.cvToggle;
    this.pdfID = faculty_ID
  }

  ngOnDestroy() {
    this.facultyReportSubscription.unsubscribe()
    this.collegeSubscription.unsubscribe()
  }

  generateFacultyReport() {

    this.excelService.generateFacultyReport(this.facultyReportData)
  }

}
