import { Component } from '@angular/core';
import { LoadingScreenComponent } from "../../components/loading-screen/loading-screen.component";
import { CommonModule } from '@angular/common';
import { FacultyMilestoneCalendarComponent } from "../../components/faculty/faculty-milestone-calendar/faculty-milestone-calendar.component";
import { PieChartComponent } from '../../components/charts/pie-chart/pie-chart.component';
import { LineGraphComponent } from '../../components/charts/line-graph/line-graph.component';

@Component({
    selector: 'app-manage-analytics',
    standalone: true,
    templateUrl: './manage-analytics.component.html',
    styleUrl: './manage-analytics.component.css',
    imports: [LoadingScreenComponent, CommonModule, FacultyMilestoneCalendarComponent, PieChartComponent, LineGraphComponent]
})
export class ManageAnalyticsComponent {
  isLoading: boolean = true;

}
