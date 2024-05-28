import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Faculty } from '../../../services/Interfaces/faculty';
import { Store } from '@ngrx/store';
import * as DeanSelector from '../../../state/dean-state/dean-state.selector';
import { mainPort } from '../../../app.component';
import { FacultyMilestoneCalendarComponent } from '../../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from '../../../components/charts/bar-chart/bar-chart.component';
import { Encryption } from '../../../services/Interfaces/encryption';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { CryptoJSService } from '../../../services/crypto-js.service';
import { EducationalAttainment } from '../../../services/Interfaces/educational-attainment';
import { CommunityExtension } from '../../../services/Interfaces/community-extension';
import { LineGraphComponent } from '../../../components/charts/line-graph/line-graph.component';


@Component({
  selector: 'app-manageindividualanalytics',
  standalone: true,
  imports: [FacultyMilestoneCalendarComponent, CommonModule, BarChartComponent, LineGraphComponent],
  templateUrl: './manageindividualanalytics.component.html',
  styleUrl: './manageindividualanalytics.component.css'
})
export class ManageindividualanalyticsComponent {
  @Input() selectedFaculty!: Faculty;
  @Output() showAnalyticsEvent = new EventEmitter<Faculty>();
  port = mainPort;
  currentYear = new Date().getFullYear();
  yearsArray: string[] = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - 14) + i).map(String);
  certToggle = true;
  commexToggle = true;
  seminarToggle = true;

  // milestonesAchieved$ = this.store.select(DeanSelector.selectMilestoneCount);


  // attainmentTimeline$ = this.store.select(DeanSelector.selectAttainmentTimeline);

  evalAverage$!: Observable<number>;
  units$!: Observable<number>;
  certCount$!: Observable<number>;
  seminarCount$!: Observable<number>;
  milestonesAchieved$!: Observable<any>;
  attainmentTimeline$!: Observable<any>;

  constructor(
    private store: Store,
    private facultyService: FacultyRequestService,
    private cryptoJS: CryptoJSService,
  ){
  }

  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }

  ngOnChanges(): void {
    this.evalAverage$ = this.store.select(DeanSelector.selectFacultyEvalAverage(this.selectedFaculty.faculty_ID)); 
    this.units$ = this.store.select(DeanSelector.selectTotalUnit(this.selectedFaculty.faculty_ID));
    this.certCount$ = this.store.select(DeanSelector.selectCertCount(this.selectedFaculty.faculty_ID));
    this.seminarCount$ = this.store.select(DeanSelector.selectSeminarCount(this.selectedFaculty.faculty_ID));
    

    this.facultyService.fetchData<Encryption>('getcommex/?t=faculty-id&id='+this.selectedFaculty.faculty_ID).subscribe(next => {
      this.milestonesAchieved$ = this.store.select(DeanSelector.selectMilestoneCount(this.decryptData<CommunityExtension[]>(next), this.selectedFaculty.faculty_ID));
      this.attainmentTimeline$ = this.store.select(DeanSelector.selectAttainmentTimelineFaculty(this.decryptData<CommunityExtension[]>(next), this.selectedFaculty.faculty_ID));
    })

    // this.milestonesAchieved$.subscribe(next => {
    //   console.log(next);
    // })
  }

  goBack(){
    this.showAnalyticsEvent.emit();
    console.log(this.selectedFaculty)
  }
}
