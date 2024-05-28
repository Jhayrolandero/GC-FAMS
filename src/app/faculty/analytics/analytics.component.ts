import { Component, OnInit } from '@angular/core';
import { FacultyMilestoneCalendarComponent } from '../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component';
import { Router } from '@angular/router';
import { mainPort } from '../../app.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { EvaluationService } from '../../services/evaluation.service';
import * as FacultySelector from '../../state/faculty-state/faculty-state.selector';
import { Store } from '@ngrx/store';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';
import { LineGraphComponent } from '../../components/charts/line-graph/line-graph.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    FacultyMilestoneCalendarComponent,
    NgOptimizedImage,
    LoadingScreenComponent,
    CommonModule,
    BarChartComponent,
    LineGraphComponent
  ],
  providers: [EvaluationService],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  port = mainPort;
  currentYear = new Date().getFullYear();
  yearsArray: string[] = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - 14) + i).map(String);
  certToggle = false;
  commexToggle = false;
  seminarToggle = false;

  facultyProfile$ = this.store.select(FacultySelector.selectAllProfile);
  milestonesAchieved$ = this.store.select(FacultySelector.selectMilestoneCount);
  units$ = this.store.select(FacultySelector.selectTotalUnit);
  certCount$ = this.store.select(FacultySelector.selectCertCount);
  seminarCount$ = this.store.select(FacultySelector.selectSeminarCount);
  evalAverage$ = this.store.select(FacultySelector.selectFacultyEvalAverage); 
  attainmentTimeline$ = this.store.select(FacultySelector.selectAttainmentTimeline);

  constructor(
    private router: Router,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.seminarCount$.subscribe(next => {
      // console.log(next);
    })
  }
}
