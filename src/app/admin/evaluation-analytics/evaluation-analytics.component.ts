import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as DeanSelector from '../../state/dean-state/dean-state.selector';
import { FacultySelectorComponent } from './faculty-selector/faculty-selector.component';
import { LineGraphComponent } from '../../components/charts/line-graph/line-graph.component';

@Component({
  selector: 'app-evaluation-analytics',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FacultySelectorComponent, LineGraphComponent],
  templateUrl: './evaluation-analytics.component.html',
  styleUrl: './evaluation-analytics.component.css'
})
export class EvaluationAnalyticsComponent {
  date = new Date();
  currentYear: number  = this.date.getFullYear();
  yearsArray: string[] = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - 14) + i).map(String);
  dropToggle = false;
  selected = false;

  //Selected facultymembers
  selectedArray: any[] = [];
  length = 0;

  constructor(
    private store: Store,
  ){}
  individualAverageTimeline$ = this.store.select(DeanSelector.selectAllAverageTimeline);

  ngOnInit(): void {
    this.individualAverageTimeline$.subscribe(next => {
      console.log(next);
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
    console.log(this.selectedArray);
  }
}
