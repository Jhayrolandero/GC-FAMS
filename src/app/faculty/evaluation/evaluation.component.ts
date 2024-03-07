import { Component, OnInit } from '@angular/core';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';
import { Router } from '@angular/router';
import { Evaluation } from '../../services/Interfaces/evaluation';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { multi } from './data';
import { error } from 'node:console';
import { parse } from 'node:path';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, NgFor],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent implements OnInit{
  evaluation: Evaluation[] = [];
  average: number = 0;
  selectedSem: number = 2;
  evalScoreAverage: number = 0;
  evalScoreCategory: [number, number,number,number] = [0, 0, 0, 0]
  selectedEvalSem: any = ''

  constructor(private facultyService: FacultyFetcherService, private router: Router){
    Object.assign(this, { multi });
  }

  ngOnInit(): void {
    this.getEvaluation();

  }
getEvaluation() {
  this.facultyService.fetchEvaluation().subscribe({
    next: (evalItem: Evaluation[]) => this.evaluation = evalItem,
    error: error => {
      if (error.status == 403) {
        console.log(error);
        this.router.navigate(['/']);
      }
    },
    complete: () => {
      this.evaluation = this.evaluation.map((evalItem) => {
        return {
          ...evalItem,
          "evalAverage": this.averageEvaluation(
                    +evalItem.param1_score,
                    +evalItem.param2_score,
                    +evalItem.param3_score,
            +evalItem.param4_score
          )
        }
      })
      console.log(this.evaluation)
    }
  })
}
// const result = words.filter((word) => word.length > 6);

  selectEvalSem(id: number): void {
    let evalItem : Evaluation[] = this.evaluation.filter((evalItem: Evaluation) => evalItem.evaluation_ID == id)
    this.evalScoreAverage = this.averageEvaluation(evalItem[0].param1_score, evalItem[0].param2_score, evalItem[0].param3_score, evalItem[0].param4_score)
    this.selectedEvalSem = evalItem[0]
  }


  averageEvaluation(param1: number, param2: number, param3: number, param4: number): number {
    return +((+param1 + +param2 + +param3 + +param4) / 4).toFixed(1);
  }

  multi: any[] | undefined;
  view: [] = [];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Semester';
  yAxisLabel: string = 'Evaluation Average';
  timeline: boolean = true;

  colorScheme = {name: 'myScheme',
  selectable: true,
  group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
