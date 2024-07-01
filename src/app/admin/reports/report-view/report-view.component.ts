import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationRadar } from '../../../services/Interfaces/radarEvaluation';
import { ExcelServiceService } from '../../../service/excel-service.service';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from '../../../components/loading-screen/loading-screen.component';
import { RadarChartData } from '../../../services/Interfaces/radarChartData';
import { RadarChartComponent } from '../../../components/charts/radar-chart/radar-chart.component';
import * as DeanSelector from '../../../state/dean-state/dean-state.selector'
import { BarChartComponent } from '../../../components/charts/bar-chart/bar-chart.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LineGraphComponent } from '../../../components/charts/line-graph/line-graph.component';
import { IndTimelineData } from '../../../services/Interfaces/indTimelineData';
import { LineGraphComponent2 } from '../../../components/charts/line-graph2/line-graph2.component';
import { PieChartComponent } from '../../../components/charts/pie-chart/pie-chart.component';
import { ScatterPlotComponent } from '../../../components/charts/scatter-plot/scatter-plot.component';
import { CryptoJSService } from '../../../services/crypto-js.service';
import { InfoService } from '../../../services/info.service';
import { FacultyAnalyticsComponent } from '../../../components/faculty-analytics/faculty-analytics.component';

interface TableValue {
  header: string[];
  value: string[][];
}
type reportFunction = () => void

@Component({
  selector: 'app-report-view',
  standalone: true,
  imports: [
    CommonModule,
    LoadingScreenComponent,
    RadarChartComponent,
    BarChartComponent,
    LineGraphComponent,
    LineGraphComponent2,
    PieChartComponent,
    ScatterPlotComponent,
    FacultyAnalyticsComponent
  ],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent {

  constructor(
    private route: ActivatedRoute,
    private excelService: ExcelServiceService,
    private store: Store,
    private cryptoJSService: CryptoJSService,
    private info: InfoService
  ) {
    this.route.params.subscribe(params => {
      this.handleSwitch(this.cryptoJSService.base64Decoder(params['id']))
    })

  }

  router = inject(Router);
  tableValue!: TableValue
  title: string = ''
  indTImelineData : IndTimelineData[] = []
  selectedFacultyArray: RadarChartData[] = [];
  college: string = ""

  async getCollege() {
    this.college = await this.info.getCollege()
  }



  evaluationDifference$: Observable<any> = this.store.select(DeanSelector.selectEvaluationDifference);
  overallAverageTimeline$ = this.store.select(DeanSelector.selectOverallAverageTimeline);
  educationalAttainmentTimeline$ = this.store.select(DeanSelector.selectCollegeEducTimeline);
  employmentTypes$ = this.store.select(DeanSelector.selectCollegeEmploymentType);
  topSeminar$ = this.store.select(DeanSelector.selectCommonSeminars);
  topLevel$ = this.store.select(DeanSelector.selectCollegeLevel);
  topExpertise$ = this.store.select(DeanSelector.selectTopExpertise);
  teachingLength$ = this.store.select(DeanSelector.selectTeachingLength);
  certTypes$ = this.store.select(DeanSelector.selectCertTypes);
  milestoneCount$ = this.store.select(DeanSelector.selectCollegeMilestoneCount);
  attainmentTimeline$ = this.store.select(DeanSelector.selectAttainmentTimeline);

  yearsArray: string[] = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - 14) + i).map(String);

  view: string | unknown
  fn!: reportFunction

  //Holder for that one specific graph so my sanity gets preserved
  diffArr = [[], []];

  async handleSwitch(view: string) {
    await this.getCollege()
    switch(view) {
      case "Evaluation Radar":
        this.setContent(DeanSelector.selectRadarReport)
        this.view = "radar"
        this.title = `${this.college} ${view}`
        this.fn = () => this.excelService.generateRadarReport()
        break;
      case "Evaluation per Semester Difference":
        this.setContent(DeanSelector.selectSemDiffReport)
        this.view = "semDiff"
        this.title = `${this.college} ${view}`
        this.fn = () => this.excelService.generateSemDiffReport()
        break;
      case "Individual Evaluation Average Timeline":
        this.setContent(DeanSelector.selectAllAveReport)
        this.view = "indTImeline"
        this.title = `${this.college} ${view}`
        this.fn = () => this.excelService.generateIndTimelineReport()
        break;
      case "Overall Evaluation Average Timeline":
        this.setContent(DeanSelector.selectOverallAveReport)
        this.view = "educAttainment"
        this.title = `${this.college} ${view}`
        this.fn = () => this.excelService.generateEducAttainmentReport()
        break;
      case "Educational Attainment Timeline":
        this.setContent(DeanSelector.selectCollegeEducTimelineReport)
        this.view = "educReport"
        this.title = `${this.college} ${view} (${ this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`
        this.fn = () => this.excelService.generateEducReport()
        break;
      case "Educational Attainment":
        this.setContent(DeanSelector.selectCurrentEducAttainment)
        this.view = "educAttainmentReport"
        this.title = `${this.college} ${view}`
        this.fn = () => this.excelService.generateEducAttainmentReport2()
        break;
      case "Employment Type":
        this.setContent(DeanSelector.selectEmploymentTypeReport)
        this.view = "employmentType"
        this.title = `${this.college} ${view}`
        this.fn = () => this.excelService.generateEmploymentTypeReport()
        break;
      case "Seminars Attended":
        this.setContent(DeanSelector.selectSeminarReport)
        this.view = "seminarReport"
        this.title = `${this.college} ${view}`
        this.fn = () => this.excelService.generateSeminarReport()
        break;
      case "Teaching Level":
        this.setContent(DeanSelector.selectTeachingLevelReport)
        this.view = "teachingLevel"
        this.title = `${this.college} ${view}`
        this.fn = () => this.excelService.generateTeachingLevelReport()
        break;
      case "Instructor's Expertise":
        this.setContent(DeanSelector.selectExpertiseReport)
        this.view = "expertiseReport"
        this.title = `${this.college} ${view}`
        this.fn = () => this.excelService.generateExpertiseReport()
        break;
      case "Teaching Evaluation Correlation":
        this.setContent(DeanSelector.selectTeachingCorrelationReport)
        this.view = "teachingEvalCorr"
        this.title = `${this.college} ${view}`
        this.fn = () => this.excelService.generateTeachCorrelationReport()
        break;
      case "Teaching Length and Certificates Count":
        this.setContent(DeanSelector.selectTeachingCertReport)
        this.view = "teachingLengthCert"
        this.title = `${this.college} ${view}`
        this.fn = () => this.excelService.generateCertsTeachReport()
        break;
      case "Certification Count":
        this.setContent(DeanSelector.selectCertTypeReport)
        this.view = "certType"
        this.title = `${this.college} ${view}`
        this.fn = () => this.excelService.generateCertTypeReport()
        break;
      case "Faculty Report":
        this.setContent(DeanSelector.selectFacultyReport)
        this.view = "faculty"
        this.title = `${this.college} ${view} ${this.excelService.currSem}`
        this.fn = () => this.excelService.generateFacultyReport()
        break;
      case "Milestone Achieved":
        this.setContent(DeanSelector.selectMilestoneReport)
        this.view = "milestone"
        this.title = `${this.college} ${view} (${ this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`
        this.fn = () => this.excelService.generateMilestoneReport()
        break;
      case "Attainment Timeline":
        this.setContent(DeanSelector.selectAttainmentTimelineReport)
        this.view = "attainment"
        this.title = `${this.college} ${view} (${ this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`
        this.fn = () => this.excelService.generateAttainmentReport()
        break;
      default:
        this.router.navigate([`admin/reports`])
        break;
    }
  }



  setContent(selector:any) {
    this.excelService.fetchData(selector).then(data => {
      if(!data) return
      this.extractContent(data)
    }).catch(error => {
      console.error("Error fetching data:", error);
    });
  }

  downloadReport() {
    this.fn()
  }

  renderRadarChart(item: string[]) {
    let data: RadarChartData = {
      id: parseInt(item[0]),
      name: item[1],
      value: item.slice(4, item.length - 1).map(x => parseFloat(x))
    }

    if (this.selectedFacultyArray.some(item => item.id === data.id)) {
      this.selectedFacultyArray = this.selectedFacultyArray.filter(item => item.id != data.id);
    } else {
      if(this.selectedFacultyArray.length >= 3) return
      this.selectedFacultyArray.push(data);
    }
  }

  renderIndTimeline(item: string[]) {
    const data: IndTimelineData = {
      id: parseInt(item[0]),
      label: item[1],
      value: item.slice(4, item.length).map(x => parseFloat(x))
    }

    if (this.indTImelineData.some(item => item.id === data.id)) {
      this.indTImelineData = this.indTImelineData.filter(item => item.id != data.id);
    } else {
      if(this.indTImelineData.length >= 3) return
      this.indTImelineData = [...this.indTImelineData, data]
    }
    console.log(this.indTImelineData)
  }

  back() {
    this.router.navigate([`admin/reports`])
  }

  base64Decode(base64String: string) {
    const buffer = Buffer.from(base64String, 'base64');
    return buffer.toString('utf-8');
  };

  extractContent(items:object[]) {
    let data: TableValue = {
      header: [],
      value: []
    }

    data.header = [...Object.keys(items[0])]

    let numArr:string[][] = []

    items.map(item => {
      let a: string[] = []
      for (let [key, value] of Object.entries(item)) {
        a = [...a, value]
      }
      numArr = [...numArr, a]
    })

    data.value = [...numArr]

    this.tableValue = data
    // console.log(data)
  }


  toInt(x:string) {
    return parseInt(x)
  }
}
