import { Component, OnInit } from '@angular/core';
import { LoadingScreenComponent } from "../../components/loading-screen/loading-screen.component";
import { CommonModule } from '@angular/common';
import { FacultyMilestoneCalendarComponent } from "../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component";
import { PieChartComponent } from '../../components/charts/pie-chart/pie-chart.component';
import { LineGraphComponent } from '../../components/charts/line-graph/line-graph.component';
import { Store } from '@ngrx/store';
import { facultyCertsCountAverage, facultyCourseUnitAverage, yearEvaluationAverage } from '../../state/dean-state/dean-state.selector';

@Component({
    selector: 'app-manage-analytics',
    standalone: true,
    templateUrl: './manage-analytics.component.html',
    styleUrl: './manage-analytics.component.css',
    imports: [LoadingScreenComponent, CommonModule, FacultyMilestoneCalendarComponent, PieChartComponent, LineGraphComponent]
})
export class ManageAnalyticsComponent implements OnInit{
  isLoading: boolean = true;
  evaluationYearAverage$ = this.store.select(yearEvaluationAverage);
  unitFacultyAverage$ = this.store.select(facultyCourseUnitAverage);
  certCountAverage$ = this.store.select(facultyCertsCountAverage);

  constructor(public store: Store){}

  ngOnInit(): void {
    this.certCountAverage$.subscribe(next => {
      console.log(next);
    })
  }
}
