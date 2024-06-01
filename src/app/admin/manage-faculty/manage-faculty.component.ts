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
import { Subscription } from 'rxjs';
import { selectFacultyReport } from '../../state/dean-state/dean-state.selector';

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

  facultyReportSubscription!: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.editData = undefined;
  }

  ngOnInit() {
    this.facultyReportSubscription = this.store.pipe(
      select(selectFacultyReport)
    ).subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
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
  }
}
