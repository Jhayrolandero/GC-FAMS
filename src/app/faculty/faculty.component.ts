import { Component } from '@angular/core';
import { SidebarComponent } from '../components/navbar/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TopnavComponent } from '../components/navbar/topnav/topnav.component';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from '../components/loading-screen/loading-screen.component';
@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet, AnalyticsComponent, TopnavComponent, CommonModule, LoadingScreenComponent],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css'
})
export class FacultyComponent {


}
