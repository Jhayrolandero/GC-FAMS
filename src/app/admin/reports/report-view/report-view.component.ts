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

interface TableValue {
  header: string[];
  value: string[][];
}

interface IndTimelineData {
  id: number
  value: number[]
}
@Component({
  selector: 'app-report-view',
  standalone: true,
  imports: [
    CommonModule,
    LoadingScreenComponent,
    RadarChartComponent,
    BarChartComponent,
    LineGraphComponent,
  ],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent {

  constructor(
    private route: ActivatedRoute,
    private excelService: ExcelServiceService,
    private store: Store
  ) {
    this.route.params.subscribe(params => {
      this.title = params['id']
      this.handleSwitch(params['id'])
      // this.handleSwitch(this.base64Decode(params['id']))
    })
  }

  router = inject(Router);
  tableValue!: TableValue

  indTImelineData : IndTimelineData[] = []
  selectedFacultyArray: RadarChartData[] = [];


  evaluationDifference$: Observable<any> = this.store.select(DeanSelector.selectEvaluationDifference);
  overallAverageTimeline$ = this.store.select(DeanSelector.selectOverallAverageTimeline);

  yearsArray: string[] = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - 14) + i).map(String);


  view: string | unknown

  //Holder for that one specific graph so my sanity gets preserved
  diffArr = [[], []];

  handleSwitch(view: string) {
    switch(view) {
      case "1":
        this.setContent(DeanSelector.selectRadarReport)
        this.view = "radar"
        break;
      case "2":
        this.setContent(DeanSelector.selectSemDiffReport)
        this.view = "semDiff"
        break;
      case "3":
        this.setContent(DeanSelector.selectAllAveReport)
        this.view = "indTImeline"
        break;
      case "4":
        this.setContent(DeanSelector.selectOverallAveReport)
        this.view = "educAttainment"
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

  title: string = ""
}
