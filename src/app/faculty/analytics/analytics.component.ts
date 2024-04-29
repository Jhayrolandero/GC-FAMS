import { Component, OnInit } from '@angular/core';
import { FacultyMilestoneCalendarComponent } from '../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { Evaluation } from '../../services/Interfaces/evaluation';
import { Router } from '@angular/router';
import { Profile } from '../../services/Interfaces/profile';
import { mainPort } from '../../app.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { forkJoin } from 'rxjs';
import { EvaluationService } from '../../services/evaluation.service';
import { Schedule } from '../../services/admin/schedule';

type ScoreCategory = {
  name: string,
  value: number,
  bgColor?: string;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    FacultyMilestoneCalendarComponent,
    PieChartComponent,
    NgOptimizedImage,
    LoadingScreenComponent,
    CommonModule
  ],
  providers: [EvaluationService],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  schedules: Schedule[] = [];
  unit = 0;

  constructor(
    private router: Router,
  ) {}
}
