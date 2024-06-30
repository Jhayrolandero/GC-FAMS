import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Faculty } from '../../../services/Interfaces/faculty';
import { Store, select } from '@ngrx/store';
import * as DeanSelector from '../../../state/dean-state/dean-state.selector';
import { mainPort } from '../../../app.component';
import { FacultyMilestoneCalendarComponent } from '../../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component';
import { Observable, Subscription, filter, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from '../../../components/charts/bar-chart/bar-chart.component';
import { Encryption } from '../../../services/Interfaces/encryption';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { CryptoJSService } from '../../../services/crypto-js.service';
import { EducationalAttainment } from '../../../services/Interfaces/educational-attainment';
import { CommunityExtension } from '../../../services/Interfaces/community-extension';
import { LineGraphComponent } from '../../../components/charts/line-graph/line-graph.component';
import { AttainmentData } from '../../../services/Interfaces/attainmentData';
import { ExcelServiceService } from '../../../service/excel-service.service';
import { selectPRofileCollege } from '../../../state/faculty-state/faculty-state.selector';
import { MilestoneReport } from '../../../services/Interfaces/milestoneReport';
import { LineGraphComponent2 } from '../../../components/charts/line-graph2/line-graph2.component';


@Component({
  selector: 'app-manageindividualanalytics',
  standalone: true,
  imports: [
    FacultyMilestoneCalendarComponent,
    CommonModule,
    BarChartComponent,
    LineGraphComponent,
    LineGraphComponent2
  ],
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


  facultyName: string =''

  milestoneAchievedReportSubscription!: Subscription
  milestoneAchievedReport: object[] = []

  attainmentSubscription!: Subscription
  attainmentData: AttainmentData[] = []

  currSem = this.excelService.getSemester(new Date().getMonth()+'', new Date().getFullYear()).semester + " Semester, A.Y. "+ this.excelService.getSemester(new Date().getMonth()+'', new Date().getFullYear()).academicYear
  collegeSubscription!: Subscription
  college!: string


  constructor(
    private store: Store,
    private facultyService: FacultyRequestService,
    private cryptoJS: CryptoJSService,
    private excelService: ExcelServiceService
  ){
  }

  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }

  ngOnInit() {

    this.collegeSubscription = this.store.pipe(
      select(selectPRofileCollege),
      filter(data => !!data),
      take(1)
    ).subscribe({
      next: res => this.college = res!
    })

  }
  ngOnDestroy(){
    this.collegeSubscription.unsubscribe()
    this.attainmentSubscription.unsubscribe()
    this.milestoneAchievedReportSubscription.unsubscribe()

    this.attainmentData = []
    this.milestoneAchievedReport = []
    this.facultyName = ''
  }

  ngOnChanges(): void {
    this.evalAverage$ = this.store.select(DeanSelector.selectFacultyEvalAverage(this.selectedFaculty.faculty_ID));
    this.units$ = this.store.select(DeanSelector.selectTotalUnit(this.selectedFaculty.faculty_ID));
    this.certCount$ = this.store.select(DeanSelector.selectCertCount(this.selectedFaculty.faculty_ID));
    this.seminarCount$ = this.store.select(DeanSelector.selectSeminarCount(this.selectedFaculty.faculty_ID));
    this.facultyName = this.selectedFaculty.last_name + (this.selectedFaculty.ext_name ? + " " + this.selectedFaculty.ext_name + ", " : ", ") + this.selectedFaculty.first_name + " " + this.selectedFaculty.middle_name

    this.facultyService.fetchData<Encryption>('getcommex/?t=faculty-id&id='+this.selectedFaculty.faculty_ID).subscribe(next => {
      this.milestonesAchieved$ = this.store.select(DeanSelector.selectMilestoneCount(this.decryptData<CommunityExtension[]>(next), this.selectedFaculty.faculty_ID));
      this.attainmentTimeline$ = this.store.select(DeanSelector.selectAttainmentTimelineFaculty(this.decryptData<CommunityExtension[]>(next), this.selectedFaculty.faculty_ID));

      this.attainmentSubscription = this.store.pipe(
        select(DeanSelector.selectAttainmentTimelineFaculty(this.decryptData<CommunityExtension[]>(next), this.selectedFaculty.faculty_ID)),
        filter(data => !!data)).subscribe({
        next: res => {
        // Seminars 2
        // Certifications 0
        // Commex 1
        this.attainmentData = this.formatAttainmentReport(res!)
      },
        error: error => {console.log(error)},
        complete: () => {}
      })


        this.milestoneAchievedReportSubscription = this.store.pipe(
          select(DeanSelector.milestoneReport(this.decryptData<CommunityExtension[]>(next), this.selectedFaculty.faculty_ID)),
          filter(data => !!data)
          ).subscribe({
          next: res => {
            this.milestoneAchievedReport = res!
          }
        })


    })

    // this.milestonesAchieved$.subscribe(next => {
    //   console.log(next);
    // })

    // this.milestoneAchievedReportSubscription = this.store.pipe(
    //   select(FacultySelector.milestoneReport)
    //   ).subscribe({
    //   next: res => {

    //     this.milestoneAchievedReport = res!
    //   }
    // })

    // this.collegeSubscription = this.store.pipe(
    //   select(selectPRofileCollege),
    //   filter(data => !!data),
    //   take(1)
    // ).subscribe({
    //   next: res => this.college = res!
    // })


  }

  formatAttainmentReport(res : number[][]) {

    let temp: AttainmentData[] = []
    let previousYear = 0
    let previousCert = 0
    let previousCommex = 0
    let previousSeminar = 0

    for(let i = 0; i < res[0].length; i++) {

      let totalAchv = res[0][i] + res[1][i] + res[2][i]
      let currCert = res[0][i]
      let currCommex = res[1][i]
      let currSeminar = res[2][i]

      let changeCert = previousCert ? (((currCert - previousCert) / previousCert) * 100).toFixed(2) + '%' : '-'
      let changeCommex = previousCommex ? (((currCommex - previousCommex) / previousCommex) * 100).toFixed(2) + '%' : '-'
      let changeSeminar = previousSeminar ? (((currSeminar - previousSeminar) / previousSeminar) * 100).toFixed(2) + '%' : '-'
      let changeAchievement = previousYear ? (((totalAchv - previousYear) / previousYear) * 100).toFixed(2) + '%' : '-'

      let data = {
        "Year": this.yearsArray[i],
        "Certificates Received": currCert,
        "Certificates Received Change from Previous Year (%)": changeCert,
        "Community Extensions Attended": currCommex,
        "Community Extensions Attended Change from Previous Year (%)": changeCommex,
        "Seminars Completed": currSeminar,
        "Seminars Completed Change from Previous Year (%)": changeSeminar,
        "Total Achievements": totalAchv,
        "Change from Previous Year (%)": changeAchievement,
      };

      previousCert = currCert
      previousCommex = currCommex
      previousSeminar = currSeminar
      previousYear = totalAchv

      temp.push(data)

    }
    return temp
  }


  generateAttainmentReport() {
    if(this.attainmentData.length <= 0) return

    this.excelService.exportExcel<AttainmentData>(this.attainmentData, `${this.facultyName} Attainment ${this.college} (${ new Date().getFullYear() - 14} - ${new Date().getFullYear()})`, this.college, this.currSem)

  }

  generateMilestoneReport() {
    if(this.milestoneAchievedReport.length <= 0) return

    this.excelService.exportExcel<object>(this.milestoneAchievedReport, `${this.facultyName} Milestone ${this.college} (${ new Date().getFullYear() - 14} - ${new Date().getFullYear()})`, this.college, this.currSem)

  }

  goBack(){
    this.showAnalyticsEvent.emit();
    console.log(this.selectedFaculty)
  }
}
