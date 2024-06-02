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
import {  Subscription, filter, map, take, tap } from 'rxjs';
import { SemDiff } from '../../services/Interfaces/semDiff';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { loadCollegeEval } from '../../state/dean-state/dean-state.actions';
import { EvaluationTimeline } from '../../services/Interfaces/indAverageTimeline';


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

  indvSemAveTimelineSubscription!: Subscription
  indvSemAveTimelineData: EvaluationTimeline[] = []
  indvSemAveTimelineHeader: string[][] = []

  dummaryData: any = []
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

console.log(new Date().getFullYear())
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
          "Evaluation Average": res[1][8] as number,
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

    this.indvSemAveTimelineSubscription = this.store.pipe(
      select(DeanSelector.selectAllAverageTimeline),
      filter(data => !!data && data.length > 0),
      take(1)
    ).subscribe({
      next: res => {
        // console.log(res)
        res.map(item => {
          let no = 1

          let data: EvaluationTimeline = {
            "No.": no++,
            "Name": item[1][0],
            "Position": item[1][2],
            "College": item[1][3],
          }

          for (let i = 0; i < this.yearsArray.length; i++) {
            // You need to add " " so that the key wouldn't turn into int, int overwrites the format
            const year = this.yearsArray[i] + " ";
            data[year] = item[1][1][i].toFixed(2);
          }

          this.indvSemAveTimelineData.push(data)
        })


        let header = Array.from({ length: 19 }, () => "")
        header[0] = "No."
        header[1] = "Name"
        header[2] = "Position"
        header[3] = "College"
        header[4] = "Year"

        this.indvSemAveTimelineHeader.push(header)

        let yearHeader = Array.from({ length: 19 }, () => "")

        for(let i = 0; i < this.yearsArray.length; i++) {
          yearHeader[i+4] = this.yearsArray[i]
        }

        this.indvSemAveTimelineHeader.push(yearHeader)
        console.log(this.indvSemAveTimelineData)
    },
      error: err => console.log(err)
    })
  }

  ngOnDestroy() {
    this.radarDataSubscription.unsubscribe()
    this.semDiffSubcription.unsubscribe()
    this.indvSemAveTimelineSubscription.unsubscribe()
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
    this.excelService.exportExcel<EvaluationRadar>(this.radarData, "Evaluation-Radar", "ccs", "!st Sem 2024 - 2025" )
  }

  generateSemDiffReport() {
    if(this.semDiffData.length <= 0) return
    this.excelService.exportExcel<SemDiff>(this.semDiffData, "Semestral Difference", "ccs", "!st Sem 2024 - 2025")
  }

  generateIndTimelineReport() {
    if(this.semDiffData.length <= 0) return

    this.excelService.exportExcel<EvaluationTimeline>(
      this.indvSemAveTimelineData,
      "Individual Timeline",
      "ccs",
      "!st Sem 2024 - 2025",
      {start: 4, title: "Year"}
    )
  }
}
