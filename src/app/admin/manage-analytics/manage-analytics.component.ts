import { Component, OnInit } from '@angular/core';
import { LoadingScreenComponent } from "../../components/loading-screen/loading-screen.component";
import { FacultyMilestoneCalendarComponent } from "../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component";
import { PieChartComponent } from '../../components/charts/pie-chart/pie-chart.component';
import { LineGraphComponent } from '../../components/charts/line-graph/line-graph.component';
import { Store } from '@ngrx/store';
import {
  facultyCertsCountAverage,
  facultyCourseUnitAverage,
  selectAttainmentTimeline,
  selectCertTypes,
  selectCollegeEducTimeline,
  selectCollegeEmploymentType,
  selectCollegeFacultyCount,
   selectCollegeLevel,
    selectCollegeMilestoneCount,
     selectCommonSeminars,
      selectFacultyExpertise,
       selectTeachingLength,
       selectTopExpertise,
       yearEvaluationAverage } from '../../state/dean-state/dean-state.selector';
import { CommonModule, NgFor } from '@angular/common';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';
import { ScatterPlotComponent } from '../../components/charts/scatter-plot/scatter-plot.component';
import { selectAllProfile } from '../../state/faculty-state/faculty-state.selector';

@Component({
    selector: 'app-manage-analytics',
    standalone: true,
    templateUrl: './manage-analytics.component.html',
    styleUrl: './manage-analytics.component.css',
    imports: [LoadingScreenComponent, FacultyMilestoneCalendarComponent, PieChartComponent, LineGraphComponent,  BarChartComponent, ScatterPlotComponent, CommonModule, NgFor]
})
export class ManageAnalyticsComponent{
  isLoading: boolean = true;
  date = new Date();
  currentYear: number  = this.date.getFullYear();
  yearsArray: string[] = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - 14) + i).map(String);
  attainmentArr = [[], [], []]
  certToggle = true;
  commexToggle = true;
  seminarToggle = true;


  profile$ = this.store.select(selectAllProfile)
  facultyCount$ = this.store.select(selectCollegeFacultyCount);
  evaluationYearAverage$ = this.store.select(yearEvaluationAverage);
  unitFacultyAverage$ = this.store.select(facultyCourseUnitAverage);
  certCountAverage$ = this.store.select(facultyCertsCountAverage);
  educationalAttainmentTimeline$ = this.store.select(selectCollegeEducTimeline);
  certTypes$ = this.store.select(selectCertTypes);
  employmentTypes$ = this.store.select(selectCollegeEmploymentType);
  topSeminar$ = this.store.select(selectCommonSeminars);
  topExpertise$ = this.store.select(selectTopExpertise);
  milestoneCount$ = this.store.select(selectCollegeMilestoneCount);
  attainmentTimeline$ = this.store.select(selectAttainmentTimeline);
  topLevel$ = this.store.select(selectCollegeLevel);
  teachingLength$ = this.store.select(selectTeachingLength);


  constructor(public store: Store){}


}
