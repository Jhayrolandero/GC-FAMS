import { Component, OnInit } from '@angular/core';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';
import { Router } from '@angular/router';
import { Evaluation } from '../../services/Interfaces/evaluation';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { error } from 'node:console';
import { parse } from 'node:path';
import { CommonModule, NgFor } from '@angular/common';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { EvaluationService } from '../../services/evaluation.service';

type Series = {
  'name': string,
  'value': number
}

type ScoreCategory = {
    name: string,
    value: number
    bgColor?: string
  }

export interface evalScoreHistory {
  'name': string,
  'series': Series[]

}
@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, NgFor, LoadingScreenComponent],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent implements OnInit{

  isLoading: boolean = true;
  evaluation: Evaluation[] = [];
  evalScoreCategory: ScoreCategory[] = [
    {name: "", value: 0, bgColor: ''},
    {name: "", value: 0, bgColor: ''},
    {name: "", value: 0, bgColor: ''},
    {name: "", value: 0, bgColor: ''}
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

  constructor(
    private facultyService: FacultyFetcherService,
    private router: Router,
    private evaluationService: EvaluationService){}

  ngOnInit(): void {
    this.getEvaluation();

  }

  // Initial Fetching of faculty evaluation
  getEvaluation() {
    this.facultyService.fetchData(this.evaluation, 'getevaluation/fetchEvaluation').subscribe({
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
            "evalAverage": this.evaluationService.averageEvaluation(
                      +evalItem.param1_score,
                      +evalItem.param2_score,
                      +evalItem.param3_score,
                      +evalItem.param4_score
            )
          }
        })
        this.evalHistory = this.evaluationService.setEvalHistory(this.evaluation)
        this.selectedEvalSem = this.evaluation[this.evaluation.length - 1]
        this.selectEvalSem()
        this.isLoading = false
      }
    })
    this.isLoading = false
  }

  // Select a specific evaluation history
  selectEvalSem(id?: number): void {
    if(id) {
      let evalItem : Evaluation[] = this.evaluation.filter((evalItem: Evaluation) => evalItem.evaluation_ID == id)
      this.selectedEvalSem = evalItem[0]
      this.evalScoreCategory = this.evaluationService.setEvalScoreCategory(this.selectedEvalSem)

    } else {
      this.evalScoreCategory = this.evaluationService.setEvalScoreCategory(this.selectedEvalSem)
    }
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
