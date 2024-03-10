import { Component, OnInit } from '@angular/core';
import { FacultyMilestoneCalendarComponent } from '../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component';
import { FacultyMilestoneHistoryComponent } from '../../components/faculty/faculty-milestone-history/faculty-milestone-history.component';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { single } from './data';
import { Init } from 'v8';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';
import { Evaluation } from '../../services/Interfaces/evaluation';
import { Router } from '@angular/router';
import { Profile } from '../../services/Interfaces/profile';
import { mainPort } from '../../app.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { forkJoin } from 'rxjs';
import { error } from 'console';
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    FacultyMilestoneCalendarComponent,
    FacultyMilestoneHistoryComponent,
    PieChartComponent,
    NgOptimizedImage,
    LoadingScreenComponent,
    CommonModule
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit{

  constructor(private facultyService: FacultyFetcherService, private router: Router){}

  isLoading: boolean = true;
  facultyProfile!: Profile;
  evaluation: Evaluation[] = []
  single: any[] = []

  ngOnInit(): void {
    this.single = [...single]
    this.getEvaluationAndProfile()
  }

  getEvaluationAndProfile() {
    forkJoin({
      evaluationRequest: this.facultyService.fetchEvaluation(),
      profileRequest: this.facultyService.fetchProfile()
    }).subscribe({
      next: (({evaluationRequest, profileRequest}) => {
        this.evaluation = evaluationRequest
        this.facultyProfile = profileRequest
      }),
      error: (error) => {
        console.log(error);
        this.router.navigate(['/'])
      },
      complete: () => {
        this.facultyProfile.profile_image = mainPort + this.facultyProfile.profile_image;
        this.facultyProfile.cover_image = mainPort + this.facultyProfile.cover_image;
        console.log(this.facultyProfile)

        this.isLoading = false
      }
    })
  }

}
