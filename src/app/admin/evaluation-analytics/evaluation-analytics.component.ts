import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as DeanSelector from '../../state/dean-state/dean-state.selector';
import { FacultySelectorComponent } from './faculty-selector/faculty-selector.component';
import { LineGraphComponent } from '../../components/charts/line-graph/line-graph.component';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';
import { RadarChartComponent } from '../../components/charts/radar-chart/radar-chart.component';
import { EvaluationSelectorComponent } from './evaluation-selector/evaluation-selector.component';

@Component({
  selector: 'app-evaluation-analytics',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FacultySelectorComponent, LineGraphComponent, BarChartComponent, RadarChartComponent, EvaluationSelectorComponent],
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

  //Selected facultymembers
  selectedArray: any[] = [];
  selectedFacultyArray: any[] = [];
  length = 0;

  //Holder for that one specific graph so my sanity gets preserved
  diffArr = [[], []];

  constructor(
    private store: Store,
  ){}
  individualAverageTimeline$ = this.store.select(DeanSelector.selectAllAverageTimeline);
  overallAverageTimeline$ = this.store.select(DeanSelector.selectOverallAverageTimeline);
  evaluationDifference$: any = this.store.select(DeanSelector.selectEvaluationDifference);
  evaluationRadar$ = this.store.select(DeanSelector.selectCurrentEvaluation);

  ngOnInit(): void {
    this.evaluationDifference$.subscribe((next: any) => {
      this.diffArr = [next[0], next[1], next[2]];

    })

    this.evaluationRadar$.subscribe((next: any) => {

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
      this.selectedFacultyArray.push(data[0]);
    }
    //Deselecting faculty
    else{
      this.selectedFacultyArray = this.selectedFacultyArray.filter(x => x[0] !== data[0][0]);
    }
    //Converting the current selectedList to array each select and deselection.
    this.length = this.selectedArray.length;
  }
}
