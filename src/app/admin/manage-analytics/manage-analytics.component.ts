import { Component } from '@angular/core';
import { LoadingScreenComponent } from "../../components/loading-screen/loading-screen.component";
import { CommonModule } from '@angular/common';
import { FacultyMilestoneCalendarComponent } from "../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component";
import { PieChartComponent } from "../../components/pie-chart/pie-chart.component";

@Component({
    selector: 'app-manage-analytics',
    standalone: true,
    templateUrl: './manage-analytics.component.html',
    styleUrl: './manage-analytics.component.css',
    imports: [LoadingScreenComponent, CommonModule, FacultyMilestoneCalendarComponent, PieChartComponent]
})
export class ManageAnalyticsComponent {
  isLoading: boolean = true;

  degree = [
    {name: "Doctorate Degree", value: 2},
    {name: "Master's Degree", value: 5},
    {name: "Bachelor's Degree", value: 7},
  ]
}
