import { Component, OnInit } from '@angular/core';
import { FacultyMilestoneCalendarComponent } from '../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component';
import { Router } from '@angular/router';
import { mainPort } from '../../app.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { EvaluationService } from '../../services/evaluation.service';
import { Schedule } from '../../services/admin/schedule';
import * as FacultySelector from '../../state/faculty-state/faculty-state.selector';
import { Store } from '@ngrx/store';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    FacultyMilestoneCalendarComponent,
    NgOptimizedImage,
    LoadingScreenComponent,
    CommonModule,
    BarChartComponent
  ],
  providers: [EvaluationService],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  port = mainPort;
  yearsArray: string[] = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - 14) + i).map(String);

  facultyProfile$ = this.store.select(FacultySelector.selectAllProfile);
  milestonesAchieved$ = this.store.select(FacultySelector.selectMilestoneCount);
  units$ = this.store.select(FacultySelector.selectTotalUnit);
  certCount$ = this.store.select(FacultySelector.selectCertCount);
  evalAverage$ = this.store.select(FacultySelector.selectFacultyEvalAverage); 

  constructor(
    private router: Router,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.milestonesAchieved$.subscribe(next => {
      // console.log(next);
    })
  }
}
