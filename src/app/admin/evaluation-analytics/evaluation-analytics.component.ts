import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as DeanSelector from '../../state/dean-state/dean-state.selector';
import { FacultySelectorComponent } from './faculty-selector/faculty-selector.component';
import { LineGraphComponent } from '../../components/charts/line-graph/line-graph.component';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';
import { RadarChartComponent } from '../../components/charts/radar-chart/radar-chart.component';
import { EvaluationSelectorComponent } from './evaluation-selector/evaluation-selector.component';
import { ExcelServiceService } from '../../service/excel-service.service';
import { EvaluationRadar } from '../../services/Interfaces/radarEvaluation';
import {  Observable, Subscription, filter, map, take, tap } from 'rxjs';
import { SemDiff } from '../../services/Interfaces/semDiff';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { EvaluationTimeline } from '../../services/Interfaces/indAverageTimeline';
import { selectPRofileCollege } from '../../state/faculty-state/faculty-state.selector';
import { RadarChartData } from '../../services/Interfaces/radarChartData';


@Component({
  selector: 'app-evaluation-analytics',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    FacultySelectorComponent,
    LineGraphComponent,
    BarChartComponent,
    RadarChartComponent,
    EvaluationSelectorComponent,
    LoadingScreenComponent
    ],
  templateUrl: './evaluation-analytics.component.html',
  styleUrl: './evaluation-analytics.component.css'
})
export class EvaluationAnalyticsComponent {
  date = new Date();
  currentYear: number  = this.date.getFullYear();
  yearsArray: string[] = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - 14) + i).map(String);
  dropToggle = false;
  dropEvalToggle = false;
  selected = false;
  labels = []
  //Selected facultymembers
  selectedArray: any[] = [];
  selectedFacultyArray: RadarChartData[] = [];
  // selectedFacultyArray: any[] = [];
  length = 0;

  collegeSubscription!: Subscription
  college!: string

  //Holder for that one specific graph so my sanity gets preserved
  diffArr = [[], []];

  radarBase64URL!: string
  radarData: EvaluationRadar[] = []
  radarDataSubscription!: Subscription

  semDiffBase64URL!: string
  semDiffSubcription!: Subscription
  semDiffData: SemDiff[] = []

  indvSemAveTimelineSubscription!: Subscription
  indvSemAveTimelineData: EvaluationTimeline[] = []
  indvSemAveTimelineHeader: string[][] = []

  currSem = this.excelService.getSemester(new Date().getMonth()+'', new Date().getFullYear()).semester + " Semester, A.Y. "+ this.excelService.getSemester(new Date().getMonth()+'', new Date().getFullYear()).academicYear
  dummaryData: any = []
  constructor(
    private store: Store,
    private excelService: ExcelServiceService
  ){

  }
  individualAverageTimeline$ = this.store.select(DeanSelector.selectAllAverageTimeline);
  overallAverageTimeline$ = this.store.select(DeanSelector.selectOverallAverageTimeline);
  evaluationDifference$: Observable<any> = this.store.select(DeanSelector.selectEvaluationDifference);
  evaluationRadar$ = this.store.select(DeanSelector.selectCurrentEvaluation);

  evalLoading$ = this.store.pipe(select(DeanSelector.selectEvalLoading))

  educationTimelineSubscription!: Subscription
  educationTimelineReport: object[] = []


  ngOnInit() {
    this.evaluationDifference$.subscribe((next: any) => {
      this.diffArr = [next[0], next[1], next[2]];
    })

  }

  //Triggers when a faculty is selected
  selectFaculty(data: any){

    //data[1] means if you're selecting a faculty
    if(data[1]){
      this.selectedArray.push(data[0]);
    }
    //Deselecting faculty
    else{
      this.selectedArray = this.selectedArray.filter(x => +x[0] !== +data[0][0]);
    }

    //Converting the current selectedList to array each select and deselection.
    this.length = this.selectedArray.length;
  }

  selectEvalFaculty(data: any){
    //data[1] means if you're selecting a faculty
    if(data[1]){
      const item: RadarChartData =  {
        id: data[0][1][data[0][1].length - 1],
        name: data[0][0],
        value: data[0][1].slice(0, 6)
      }
      this.selectedFacultyArray.push(item);
    }

    //Deselecting faculty
    else{
      this.selectedFacultyArray = this.selectedFacultyArray.filter(x => x.id !== data[0][1][data[0][1].length - 1]);
    }
    //Converting the current selectedList to array each select and deselection.
    this.labels = data
    this.length = this.selectedArray.length;
  }


  setRadar(base64: string) {
    this.radarBase64URL = base64
  }

  setRadarData(data: EvaluationRadar[]) {
    this.radarData = data
  }

  setSemDiff(base64: string) {
    this.semDiffBase64URL = base64
  }

  downloadFile(base64URL: string, fileName: string) {
    const link = document.createElement('a');
    link.href = base64URL;
    link.download = fileName;
    link.click();
  }

  generateRadarReport() {
    this.excelService.generateRadarReport()
  }

  generateSemDiffReport() {
    this.excelService.generateSemDiffReport()
  }

  generateIndTimelineReport() {
    this.excelService.generateIndTimelineReport()
  }

  generateEducAttainmentReport() {
    this.excelService.generateEducAttainmentReport()
  }
}
