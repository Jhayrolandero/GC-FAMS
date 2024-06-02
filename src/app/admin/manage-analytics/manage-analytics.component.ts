import { Component, OnInit } from '@angular/core';
import { LoadingScreenComponent } from "../../components/loading-screen/loading-screen.component";
import { FacultyMilestoneCalendarComponent } from "../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component";
import { PieChartComponent } from '../../components/charts/pie-chart/pie-chart.component';
import { LineGraphComponent } from '../../components/charts/line-graph/line-graph.component';
import { Store, select } from '@ngrx/store';
import {
  facultyCertsCountAverage,
  facultyCourseUnitAverage,
  selectAttainmentTimeline,
  selectCertTypes,
  selectCertsLoading,
  selectCollegeEducTimeline,
  selectCollegeEmploymentType,
  selectCollegeFacultyCount,
   selectCollegeLevel,
    selectCollegeMilestoneCount,
     selectCommexLoading,
     selectCommonSeminars,
      selectCoursesLoading,
      selectCurrYearAverageSeminarCount,
      selectCurrentEducAttainment,
      selectEducsLoading,
      selectEmploymentTypeReport,
      selectExpertiseReport,
      selectExpsLoading,
      selectExptLoading,
      selectFacultyExpertise,
       selectMilestoneReport,
       selectProjLoading,
       selectSeminarReport,
       selectTeachingLength,
       selectTeachingLevelReport,
       selectTopExpertise,
       yearEvaluationAverage } from '../../state/dean-state/dean-state.selector';
import { CommonModule, NgFor } from '@angular/common';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';
import { ScatterPlotComponent } from '../../components/charts/scatter-plot/scatter-plot.component';
import { selectAllProfile, selectProfileLoading } from '../../state/faculty-state/faculty-state.selector';
import { ExcelServiceService } from '../../service/excel-service.service';
import { Subscription, filter, take, takeLast } from 'rxjs';
import { EducAttainmentData } from '../../services/Interfaces/educAttainmentData';
import { AttainmentData } from '../../services/Interfaces/attainmentData';
import { MilestoneReport } from '../../services/Interfaces/milestoneReport';
import { error } from 'console';
import { CurrEducAttainment } from '../../services/Interfaces/currEducAttainment';
import { EmploymentTypeReport } from '../../services/Interfaces/employmentTypeReport';
import { SeminarReport } from '../../services/Interfaces/seminarReport';
import { TeachingLevelReport } from '../../services/Interfaces/teachingLevelReport';
import { ExpertiseReport } from '../../services/Interfaces/expertiseReport';

@Component({
    selector: 'app-manage-analytics',
    standalone: true,
    templateUrl: './manage-analytics.component.html',
    styleUrl: './manage-analytics.component.css',
    imports: [
      LoadingScreenComponent,
      FacultyMilestoneCalendarComponent,
      PieChartComponent,
      LineGraphComponent,
      BarChartComponent,
      ScatterPlotComponent,
      CommonModule,
      NgFor]

})
export class ManageAnalyticsComponent{
  isLoading: boolean = true;
  date = new Date();
  currentYear: number  = this.date.getFullYear();
  yearsArray: string[] = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - 14) + i).map(String);
  attainmentArr = [[], [], []]
  certToggle = true;
  commexToggle = true;
  seminarToggle = true;


  profile$ = this.store.select(selectAllProfile)
  facultyCount$ = this.store.select(selectCollegeFacultyCount);
  evaluationYearAverage$ = this.store.select(yearEvaluationAverage);
  unitFacultyAverage$ = this.store.select(facultyCourseUnitAverage);
  certCountAverage$ = this.store.select(facultyCertsCountAverage);
  educationalAttainmentTimeline$ = this.store.select(selectCollegeEducTimeline);
  certTypes$ = this.store.select(selectCertTypes);
  employmentTypes$ = this.store.select(selectCollegeEmploymentType);
  topSeminar$ = this.store.pipe(select(selectCommonSeminars));
  topExpertise$ = this.store.select(selectTopExpertise);
  milestoneCount$ = this.store.select(selectCollegeMilestoneCount);
  attainmentTimeline$ = this.store.select(selectAttainmentTimeline);
  topLevel$ = this.store.select(selectCollegeLevel);
  teachingLength$ = this.store.select(selectTeachingLength);
  seminarYearAverageFaculty$ = this.store.select(selectCurrYearAverageSeminarCount);


  profileLoading$ = this.store.pipe(select(selectProfileLoading))
  certsLoading$ = this.store.pipe(select(selectCertsLoading))
  educsLoading$ = this.store.pipe(select(selectEducsLoading))
  expsLoading$ = this.store.pipe(select(selectExpsLoading))
  projLoading$ = this.store.pipe(select(selectProjLoading))
  exptLoading$ = this.store.pipe(select(selectExptLoading))
  coursesLoading$ = this.store.pipe(select(selectCoursesLoading))
  commexLoading$ = this.store.pipe(select(selectCommexLoading))


  educSubscription!: Subscription
  educData: EducAttainmentData[] = []

  attainmentSubscription!: Subscription
  attainmentData: AttainmentData[] = []

  mileStoneSubscription!: Subscription
  milestoneData: MilestoneReport[] = []

  currEducSubscription!: Subscription
  currEducData: CurrEducAttainment[] = []

  topSeminarSubscription!: Subscription

  employmentTypeSubscription!: Subscription
  employmentTypeData: EmploymentTypeReport[] = []


  seminarReportSubscription!: Subscription
  seminarReport: SeminarReport[] = []

  teachingLevelReportSubscription!: Subscription
  teachingLevelReport: TeachingLevelReport[] = []

  expertiseReportSubscription!: Subscription
  expertiseReport: ExpertiseReport[] = []


  totalEducAttainment!: Subscription
  totalBachelor: number = 0
  totalMasterals: number = 0
  totalDoctorate: number = 0


  constructor(
    public store: Store,
    private excelService: ExcelServiceService
  ){}

  ngOnInit(): void {
    this.educSubscription = this.store.pipe(
      select(selectCollegeEducTimeline),
      filter(data => !!data && (data.length > 0 )),
      take(1)
    ).subscribe({
      next: res => {
    // Masters 1
    // Doctorate 2
    // Bachelor 0
      this.renderEducReport(res)
    },
      error: err => { console.log(err)}
    })

    this.attainmentSubscription = this.store.pipe(
      select(selectAttainmentTimeline),
      filter(data => !!data && (data.length > 0 )),
      take(1)
    ).subscribe({
      next: res => {
      // Seminars 2
      // Certifications 0
      // Commex 1

      console.log(res)
        this.formatAttainmentReport(res)
        // console.log(this.attainmentData)
      },
      error: error => {console.log(error)}
    })

    this.mileStoneSubscription = this.store.pipe(
      select(selectMilestoneReport),
      filter(data => !!data && (data.length > 0 )),
      take(1)
    ).subscribe({
      next: res => {
        console.log(res)
        this.milestoneData = res!},
      error: error => {console.log(error)}
    })

    this.currEducSubscription = this.store.pipe(
      select(selectCurrentEducAttainment(1))
    ).subscribe({
      next: res => {this.currEducData = res!},
      error: err => {console.log(err)}
    })


    this.employmentTypeSubscription = this.store.pipe(
      select(selectEmploymentTypeReport(1)),
      filter(data => !!data && data.length > 0),
      take(1)
    ).subscribe({
      next: res => {this.employmentTypeData = res!},
      error: err => (console.log(err))
    })

    this.seminarReportSubscription = this.store.pipe(
      select(selectSeminarReport(1)),
      filter(data => !!data && data.length > 0),
      take(1)
    ).subscribe({
      next: res => {
        this.seminarReport = res!
        console.log(this.seminarReport)
      },
      error: err => {console.log(err)}
    })


    this.teachingLevelReportSubscription = this.store.pipe(
      select(selectTeachingLevelReport(1)),
      filter(data => !!data && data.length > 0),
      take(1)
    ).subscribe({
      next: res => {
        this.teachingLevelReport = res!
        console.log(this.teachingLevelReport)
      },
      error: err => {console.log(err)}
    })

    this.expertiseReportSubscription = this.store.pipe(
      select(selectExpertiseReport),
      filter(data => !!data && data.length > 0),
      take(1)
    ).subscribe({
      next: res => {
        this.expertiseReport = res!
      },
      error: err => {console.log(err)}
    })
    // this.totalEducAttainment = this.store.pipe(
    //   select(selectCollegeEducTimeline),
    //   filter(data => !!data && (data.length > 0 )),
    //   take(1)
    // ).subscribe({
    //   next: res => {

    //     console.log(res)
    //     this.totalBachelor = res[0].reduce((partialSum, a) => partialSum + a, 0)
    //     this.totalMasterals = res[1].reduce((partialSum, a) => partialSum + a, 0)
    //     this.totalDoctorate = res[2].reduce((partialSum, a) => partialSum + a, 0)

    //   }
    // })

  }

  ngOnDestroy() {
    this.educSubscription.unsubscribe()
    this.attainmentSubscription.unsubscribe()
    this.mileStoneSubscription.unsubscribe()
    this.currEducSubscription.unsubscribe()
    // this.totalEducAttainment.unsubscribe()
    this.employmentTypeSubscription.unsubscribe()
    this.seminarReportSubscription.unsubscribe()
    this.teachingLevelReportSubscription.unsubscribe()
    this.expertiseReportSubscription.unsubscribe()
  }

  renderEducReport(res : number[][]) {

    let previousYear = 0
    for(let i = 0; i < res[0].length ; i++) {
      let totalGraduates = res[1][i] + res[0][i] + res[2][i]
      let data = {
        "Year" : this.yearsArray[i],
        "Masters Degrees Awarded": res[1][i],
        "Doctorate Degrees Awarded": res[2][i],
        "Bachelors Degrees Awarded": res[0][i],
        "Total Graduates": totalGraduates,
        "% Change from Previous Year": previousYear ? (((totalGraduates - previousYear) / previousYear) * 100).toFixed(2) as string + "%" : '-'
      }

      previousYear = totalGraduates
      this.educData.push(data)
      }
  }

  formatAttainmentReport(res : number[][]) {

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
      this.attainmentData.push(data)
    }
  }

  generateEducReport() {
    if(this.educData.length <= 0) return

    this.excelService.exportExcel<EducAttainmentData>(this.educData, `Education Attainment Timeline (${ this.date.getFullYear() - 14} - ${this.date.getFullYear()})`, "ccs", "!st Sem 2024 - 2025")

  }

  generateAttainmentReport() {
    if(this.attainmentData.length <= 0) return

    this.excelService.exportExcel<AttainmentData>(this.attainmentData, `Attainment Timeline (${ this.date.getFullYear() - 14} - ${this.date.getFullYear()})`, "ccs", "!st Sem 2024 - 2025")
  }

  generateMilestoneReport() {
    if(this.milestoneData.length <= 0) return

    this.excelService.exportExcel<MilestoneReport>(this.milestoneData, `Milestone Achieved (${ this.date.getFullYear() - 14} - ${this.date.getFullYear()})`, "ccs", `nth Sem., AY ${ this.date.getFullYear()} - ${this.date.getFullYear() + 1}`)
  }

  generateEducAttainmentReport() {
    if(this.currEducData.length <= 0) return

    this.excelService.exportExcel<CurrEducAttainment>(this.currEducData, `Educational Attainment CCS`, "ccs", `nth Sem., AY ${ this.date.getFullYear()} - ${this.date.getFullYear() + 1}`)
  }

  generateEmploymentTypeReport() {
    if(this.employmentTypeData.length <= 0 ) return

    this.excelService.exportExcel<EmploymentTypeReport>(this.employmentTypeData, `Employment Type CCS`, "ccs", `nth Sem., AY ${ this.date.getFullYear()} - ${this.date.getFullYear() + 1}`)
  }

  generateSeminarReport() {
    if(this.seminarReport.length <= 0) return

    this.excelService.exportExcel<SeminarReport>(this.seminarReport, `Seminars Attended CCS`, "ccs", `nth Sem., AY ${ this.date.getFullYear()} - ${this.date.getFullYear() + 1}`)
  }

  generateTeachingLevelReport() {
    if(this.teachingLevelReport.length <= 0) return

    this.excelService.exportExcel<TeachingLevelReport>(this.teachingLevelReport, `Teaching Level CCS`, "ccs", `nth Sem., AY ${ this.date.getFullYear()} - ${this.date.getFullYear() + 1}`)
  }

  generateExpertiseReport() {
    if(this.expertiseReport.length <= 0 ) return

    this.excelService.exportExcel<ExpertiseReport>(this.expertiseReport, `Instructor's Expertise CCS`, "ccs", `nth Sem., AY ${ this.date.getFullYear()} - ${this.date.getFullYear() + 1}`)
  }
}
