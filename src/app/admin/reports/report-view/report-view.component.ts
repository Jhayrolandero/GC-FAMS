import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvaluationRadar } from '../../../services/Interfaces/radarEvaluation';
import { ExcelServiceService } from '../../../service/excel-service.service';
import { CommonModule } from '@angular/common';


interface TableValue {
  header: string[];
  value: string[][];
}
@Component({
  selector: 'app-report-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent {

  tableValue!: TableValue
  radarData!: EvaluationRadar[]
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

          this.extractContent(radarData)
          // this.getHeader(radarData[0])
          // this.getContent(radarData)
          // console.log(radarData);
        }).catch(error => {
          console.error("Error fetching radar data:", error);
        });
        break;
    }
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
