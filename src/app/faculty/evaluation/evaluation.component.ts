import { Component } from '@angular/core';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';
import { Router } from '@angular/router';
import { Evaluation } from '../../services/Interfaces/evaluation';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { multi } from './data';
import { error } from 'node:console';
import { parse } from 'node:path';
@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent {
  evaluation: Evaluation[] = [];
  average: number = 0;
  constructor(private facultyService: FacultyFetcherService, private router: Router){
    this.getEvaluation();
    Object.assign(this, { multi });

  }

  // numbers$.subscribe({
  //   next: value => console.log('Observable emitted the next value: ' + value),
  //   error: err => console.error('Observable emitted an error: ' + err),
  //   complete: () => console.log('Observable emitted the complete notification')
  // });

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

  // mapEvaluation() : Evaluation {
  //   this.evaluation.map((evalItem:Evaluation) => 
      
      
  //       ...evalItem,
  //       "evalAverage": this.averageEvaluation(
  //         evalItem.param1_score,
  //         evalItem.param2_score,
  //         evalItem.param3_score,
  //         evalItem.param4_score
        
      
  //   )

  // }

  averageEvaluation(param1: number, param2: number, param3: number, param4: number): number {
    return (param1 + param2 + param3 + param4) / 4;
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

  // constructor() {
  //   Object.assign(this, { multi });
  // }

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
