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
import { EvaluationService } from '../../services/evaluation.service';
import { error } from 'console';
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
    FacultyMilestoneHistoryComponent,
    PieChartComponent,
    NgOptimizedImage,
    LoadingScreenComponent,
    CommonModule
  ],
  providers: [EvaluationService],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit{
  schedules: Schedule[]= [];
  unit = 0;

  constructor(
    private facultyService: FacultyFetcherService,
    private router: Router,
    private evaluationService: EvaluationService
    ){
    }

  isLoading: boolean = true;
  selectedSem: Evaluation = {
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
  facultyProfile!: Profile;
  evaluation: Evaluation[] = []
  evalScoreCategory: ScoreCategory[] = [
    {name: "", value: 0, bgColor: ""},
    {name: "", value: 0, bgColor: ""},
    {name: "", value: 0, bgColor: ""},
    {name: "", value: 0, bgColor: ""}
  ]

  ngOnInit(): void {
    this.getEvaluationAndProfile();
    this.getSchedule();
  }

  getSchedule(){
    //Fetches the schedule data based on passed selected date
    this.facultyService.fetchSchedDay().subscribe({
      next: value => {this.schedules = value;
                      this.countUnit()},
      error: err => {if(err.status == 403){this.router.navigate(['/']);}}
    });
  }

  countUnit(){
    this.schedules.forEach(schedule => {
      console.log(schedule);
      this.unit = this.unit + schedule.unit;
    })
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
        this.selectedSem = this.evaluation[this.evaluation.length - 1]
        this.setEvalScore()
        this.isLoading = false
      }
    })
    this.isLoading = false
  }

  setEvalScore() {
    this.evalScoreCategory = this.evaluationService.selectEvalSem(this.selectedSem.evaluation_ID, this.evaluation)
  }
}
