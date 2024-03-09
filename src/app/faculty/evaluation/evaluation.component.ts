import { Component, OnInit } from '@angular/core';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';
import { Router } from '@angular/router';
import { Evaluation } from '../../services/Interfaces/evaluation';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { error } from 'node:console';
import { parse } from 'node:path';
import { CommonModule, NgFor } from '@angular/common';

type Series = {
  'name': string,
  'value': number
}

type ScoreCategory = {

    category: string,
    score: number

}
export interface evalScoreHistory {
  'name': string,
  'series': Series[]

}
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
  selectedSem: number = 0;
  evalScoreAverage: number = 0;
  evalScoreCategory: [ScoreCategory, ScoreCategory ,ScoreCategory, ScoreCategory] = [
    {category: "", score: 0},
    {category: "", score: 0},
    {category: "", score: 0},
    {category: "", score: 0}
  ]
  selectedEvalSem: Evaluation = {
    evaluation_ID: 0,
    faculty_ID: 0,
    semester: 0,
    evaluation_year: 0,
    param1_score: 0,
    param2_score: 0,
    param3_score: 0,
    param4_score: 0,
    evalAverage: 0
  }
  evalHistory: evalScoreHistory[] = []

  constructor(private facultyService: FacultyFetcherService, private router: Router){}

  ngOnInit(): void {
    this.getEvaluation();

  }

  setEvalScoreCategory(): void {
    this.evalScoreCategory = [
      {
        category: "Category 1",
        score: this.selectedEvalSem.param1_score,

      },
      {
        category: "Category 2",
        score: this.selectedEvalSem.param2_score,

      },
      {
        category: "Category 3",
        score: this.selectedEvalSem.param3_score,

      },
      {
        category: "Category 4",
        score: this.selectedEvalSem.param4_score,

      }]
  }

  // Set the evaluation Timeline
  setEvalHistory(): evalScoreHistory[] {
    return [{
      "name": "Evalution Score",
      "series": this.setSeries()
    }]
  }

  setSeries(): Series[] {
    return this.evaluation.map((evalItem: Evaluation) => ({
        name: `${evalItem.semester}${evalItem.semester== 1 ? 'st' : 'nd'}, A.Y. ${evalItem.evaluation_year} - ${+evalItem.evaluation_year + 1}`,
        value: this.averageEvaluation(
            evalItem.param1_score,
            evalItem.param2_score,
            evalItem.param3_score,
            evalItem.param4_score
        )
    }));
  }

  // Initial Fetching of faculty evaluation
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
        this.evalHistory = this.setEvalHistory()
        this.selectedSem = this.evaluation[this.evaluation.length - 1].evaluation_ID
        this.selectEvalSem(this.selectedSem)
        this.setEvalScoreCategory()
      }
    })
  }

  // Select a specific evaluation history
  selectEvalSem(id: number): void {
    let evalItem : Evaluation[] = this.evaluation.filter((evalItem: Evaluation) => evalItem.evaluation_ID == id)
    this.evalScoreAverage = this.averageEvaluation(evalItem[0].param1_score, evalItem[0].param2_score, evalItem[0].param3_score, evalItem[0].param4_score)
    this.selectedEvalSem = evalItem[0]
    this.setEvalScoreCategory()
  }


  averageEvaluation(param1: number, param2: number, param3: number, param4: number): number {
    return +((+param1 + +param2 + +param3 + +param4) / 4).toFixed(1);
  }

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