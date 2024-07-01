import { Component } from '@angular/core';
import { FacultyMilestoneCalendarComponent } from '../faculty/faculty-milestone-calendar/faculty-milestone-calendar.component';
import { Store } from '@ngrx/store';
import * as DeanSelector from '../../state/dean-state/dean-state.selector'
import * as FacultySelector from '../../state/faculty-state/faculty-state.selector'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faculty-analytics',
  standalone: true,
  imports: [
    FacultyMilestoneCalendarComponent,
    CommonModule
  ],
  templateUrl: './faculty-analytics.component.html',
  styleUrl: './faculty-analytics.component.css'
})
export class FacultyAnalyticsComponent {

  constructor(private store: Store) {}

  facultyCount$ = this.store.select(DeanSelector.selectCollegeFacultyCount);
  profile$ = this.store.select(FacultySelector.selectAllProfile)
  evaluationYearAverage$ = this.store.select(DeanSelector.yearEvaluationAverage);
  unitFacultyAverage$ = this.store.select(DeanSelector.facultyCourseUnitAverage);
  certCountAverage$ = this.store.select(DeanSelector.facultyCertsCountAverage);
  seminarYearAverageFaculty$ = this.store.select(DeanSelector.selectCurrYearAverageSeminarCount);
}
