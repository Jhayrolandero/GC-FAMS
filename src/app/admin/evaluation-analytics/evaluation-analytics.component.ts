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
import {  Subscription, filter, map, take } from 'rxjs';
import { SemDiff } from '../../services/Interfaces/semDiff';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { loadEval } from '../../state/faculty-state/faculty-state.actions';
import { loadCollegeEval } from '../../state/dean-state/dean-state.actions';

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
  selectedFacultyArray: any[] = [];
  length = 0;

  //Holder for that one specific graph so my sanity gets preserved
  diffArr = [[], []];

  radarBase64URL!: string
  radarData: EvaluationRadar[] = []

  radarDataSubscription!: Subscription

  semDiffBase64URL!: string
  semDiffSubcription!: Subscription
  semDiffData: SemDiff[] = []

  constructor(
    private store: Store,
    private excelService: ExcelServiceService
  ){

  }
  individualAverageTimeline$ = this.store.select(DeanSelector.selectAllAverageTimeline);
  overallAverageTimeline$ = this.store.select(DeanSelector.selectOverallAverageTimeline);
  evaluationDifference$: any = this.store.select(DeanSelector.selectEvaluationDifference);
  evaluationRadar$ = this.store.select(DeanSelector.selectCurrentEvaluation);
  evalLoading$ = this.store.pipe(select(DeanSelector.selectEvalLoading))

  ngOnInit() {
    this.store.dispatch(loadCollegeEval());

    this.evaluationDifference$.subscribe((next: any) => {
      this.diffArr = [next[0], next[1], next[2]];
    })


    this.radarDataSubscription = this.store.pipe(
      select(DeanSelector.selectCurrentEvaluation),
      filter(data => !!data && data.length > 0),
      take(1)  // This ensures only non-null/non-undefined values are processed
    ).subscribe({
      next: (items) => {
        let no = 1
        this.radarData = items.map(res => ({
          "No.": no++,
          "Name": res[0],
          "College": res[1][7] as string,
          "Position": res[1][6] as string,
          "Knowledge Of Content": res[1][0] as number,
          "Flexible Learning Modality": res[1][5] as number,
          "Instructional Skills": res[1][1] as number,
          "Management of Learning": res[1][4] as number,
          "Communication Skills": res[1][2] as number,
          "Teaching for Independent Learning": res[1][3] as number,
          "Evaluation Average": res[1][8] as number
        }));
        console.log(this.radarData);
      },
      error: err => console.error(err)
    });
    this.semDiffSubcription = this.store.pipe(
      select(DeanSelector.selectEvaluationDifference),
      filter(data => !!data && (data[0].length > 0 && data[1].length > 0 && data[2].length > 0)),
      take(1)  // This ensures only non-null/non-undefined values are processed
      ).subscribe({
      next: (item : any) => {

        for(let i =0; i< item[1].length; i++) {
          const data = {
            "Name": item[1][i],
            "Semestral Difference": item[2][i]
          }

          this.semDiffData.push(data)
        }

        console.log(this.semDiffData)
      },
      error: error => { console.log(error)},
    })
  }

  ngOnDestroy() {
    this.radarDataSubscription.unsubscribe()
    this.semDiffSubcription.unsubscribe()
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
      this.selectedFacultyArray.push(data[0]);
    }
    //Deselecting faculty
    else{
      this.selectedFacultyArray = this.selectedFacultyArray.filter(x => x[0] !== data[0][0]);
    }
    //Converting the current selectedList to array each select and deselection.

    this.labels = data

    console.log(this.selectedFacultyArray)
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
    if(this.radarData.length <= 0) return

    this.excelService.exportexcel<EvaluationRadar>(this.radarData, "Evaluation-Radar")
  }

  generateSemDiffReport() {
    if(this.semDiffData.length <= 0) return

    this.excelService.exportexcel<SemDiff>(this.semDiffData, "Semestral Difference")
  }
  // generateReport() {
  //   this.downloadFile(this.radarBase64URL, 'radar.png');
  //   this.downloadFile(this.semDiffBase64URL, 'semDiff.png');
  // }

  // generateExcel() {
  //   this.excelService.exportexcel()
  // }
}
