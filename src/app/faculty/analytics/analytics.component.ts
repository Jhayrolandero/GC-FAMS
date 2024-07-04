import { Component, OnInit } from '@angular/core';
import { FacultyMilestoneCalendarComponent } from '../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component';
import { Router } from '@angular/router';
import { mainPort } from '../../app.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { EvaluationService } from '../../services/evaluation.service';
import * as FacultySelector from '../../state/faculty-state/faculty-state.selector';
import { Store, select } from '@ngrx/store';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';
import { LineGraphComponent } from '../../components/charts/line-graph/line-graph.component';
import { Subscription, bufferCount, filter, take, takeLast } from 'rxjs';
import { ExcelServiceService } from '../../service/excel-service.service';
import { selectPRofileCollege } from '../../state/faculty-state/faculty-state.selector';
import { AttainmentData } from '../../services/Interfaces/attainmentData';
import { LineGraphComponent2 } from '../../components/charts/line-graph2/line-graph2.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    FacultyMilestoneCalendarComponent,
    NgOptimizedImage,
    LoadingScreenComponent,
    CommonModule,
    BarChartComponent,
    LineGraphComponent,
    LineGraphComponent2
  ],
  providers: [EvaluationService],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  port = mainPort;
  currentYear = new Date().getFullYear();
  yearsArray: string[] = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - 14) + i).map(String);
  certToggle = false;
  commexToggle = false;
  seminarToggle = false;

  facultyProfile$ = this.store.select(FacultySelector.selectAllProfile);
  milestonesAchieved$ = this.store.select(FacultySelector.selectMilestoneCount);
  units$ = this.store.select(FacultySelector.selectTotalUnit);
  certCount$ = this.store.select(FacultySelector.selectCertCount);
  seminarCount$ = this.store.select(FacultySelector.selectSeminarCount);
  evalAverage$ = this.store.select(FacultySelector.selectFacultyEvalAverage);
  attainmentTimeline$ = this.store.select(FacultySelector.selectAttainmentTimeline);

  currSem = this.excelService.getSemester(new Date().getMonth()+'', new Date().getFullYear()).semester + " Semester, A.Y. "+ this.excelService.getSemester(new Date().getMonth()+'', new Date().getFullYear()).academicYear
  collegeSubscription!: Subscription
  college!: string


  milestoneAchievedReportSubscription!: Subscription
  milestoneAchievedReport: object[] = []

  attainmentSubscription!: Subscription
  attainmentData: AttainmentData[] = []

  constructor(
    private router: Router,
    private store: Store,
    private excelService: ExcelServiceService
  ) {
  }

  ngOnInit(): void {
    this.milestoneAchievedReportSubscription = this.store.pipe(
      select(FacultySelector.milestoneReport)
      ).subscribe({
      next: res => {

        this.milestoneAchievedReport = res!
      }
    })

    this.collegeSubscription = this.store.pipe(
      select(selectPRofileCollege),
      filter(data => !!data),
      take(1)
    ).subscribe({
      next: res => this.college = res!
    })

    this.attainmentSubscription = this.store.pipe(
      select(FacultySelector.selectAttainmentTimeline),
    filter(data => !!data)      ).subscribe({
      next: res => {
      // Seminars 2
      // Certifications 0
      // Commex 1
      this.attainmentData = this.formatAttainmentReport(res!)

      },
      error: error => {console.log(error)},
      complete: () => {}
    })

  }

  ngOnDestroy() {
    this.milestoneAchievedReportSubscription.unsubscribe()
    this.collegeSubscription.unsubscribe()
    this.attainmentSubscription.unsubscribe()
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


  generateMilestoneReport() {
    if(this.milestoneAchievedReport.length <= 0) return

    this.excelService.indMilestoneReport(this.milestoneAchievedReport)
    // this.excelService.exportExcel<object>(this.milestoneAchievedReport, `Milestone Report ${this.college}`, this.college, this.currSem)
  }

  generateAttainmentReport() {
    if(this.attainmentData.length <= 0 ) return
  this.excelService.indAttainmentReport(this.attainmentData)
    // this.excelService.exportExcel<AttainmentData>(this.attainmentData, `Attainment ${this.college} (${ new Date().getFullYear() - 14} - ${new Date().getFullYear()})`, this.college, this.currSem)
  }
}
