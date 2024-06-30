import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvaluationRadar } from '../../../services/Interfaces/radarEvaluation';
import { ExcelServiceService } from '../../../service/excel-service.service';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from '../../../components/loading-screen/loading-screen.component';
import { RadarChartData } from '../../../services/Interfaces/radarChartData';
import { RadarChartComponent } from '../../../components/charts/radar-chart/radar-chart.component';

interface TableValue {
  header: string[];
  value: string[][];
}

@Component({
  selector: 'app-report-view',
  standalone: true,
  imports: [CommonModule, LoadingScreenComponent, RadarChartComponent],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent {

  tableValue!: TableValue
  // radarData: RadarChart[] | undefined
  selectedFacultyArray: RadarChartData[] = [];
  view: string | unknown
  constructor(
    private route: ActivatedRoute,
    private excelService: ExcelServiceService
  ) {
    this.route.params.subscribe(params => {
      this.title = params['id']
      this.handleSwitch(params['id'])
})
  }

  handleSwitch(view: string) {
    switch(view) {
      case "1":
        this.excelService.renderRadarData().then(radarData => {
          if(!radarData) return
          this.view = "radar"
          this.extractContent(radarData)
        }).catch(error => {
          console.error("Error fetching radar data:", error);
        });
        break;
    }
  }

  renderRadarChart(item: string[]) {
    if(this.selectedFacultyArray.length > 3) return
    let data: RadarChartData = {
      id: parseInt(item[0]),
      name: item[1],
      value: item.slice(4, item.length - 1).map(x => parseFloat(x))
    }

    if (this.selectedFacultyArray.some(item => item.id === data.id)) {
      this.selectedFacultyArray = this.selectedFacultyArray.filter(item => item.id != data.id);
    } else {
      this.selectedFacultyArray.push(data);
    }

    console.log(this.selectedFacultyArray)
  }

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


  title: string = ""
}
