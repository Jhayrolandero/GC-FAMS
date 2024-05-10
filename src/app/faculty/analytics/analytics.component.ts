import { Component, OnInit } from '@angular/core';
import { FacultyMilestoneCalendarComponent } from '../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component';
import { Router } from '@angular/router';
import { mainPort } from '../../app.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { EvaluationService } from '../../services/evaluation.service';
import { Schedule } from '../../services/admin/schedule';
import { selectAllProfile } from '../../state/faculty-state/faculty-state.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    FacultyMilestoneCalendarComponent,
    NgOptimizedImage,
    LoadingScreenComponent,
    CommonModule
  ],
  providers: [EvaluationService],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  port = mainPort;

  facultyProfile$ = this.store.select(selectAllProfile);

  constructor(
    private router: Router,
    private store: Store,
  ) {}
}
