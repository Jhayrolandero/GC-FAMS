import { Component, OnInit } from '@angular/core';
import { FacultyMilestoneCalendarComponent } from '../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component';
import { FacultyMilestoneHistoryComponent } from '../../components/faculty/faculty-milestone-history/faculty-milestone-history.component';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { single } from './data';
import { Init } from 'v8';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    FacultyMilestoneCalendarComponent,
    FacultyMilestoneHistoryComponent,
    PieChartComponent,
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit{

  single: any[] = []
  constructor(){
    console.log("Test render");
  }

  ngOnInit(): void {
    this.single = [...single]
    console.log(this.single)
  }
}
