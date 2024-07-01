import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportVal } from '../../services/Interfaces/reportVal';

interface report {
  title: string,
  reports: ReportVal[]
}

@Component({
  selector: 'app-report-container',
  standalone: true,
  imports: [],
  templateUrl: './report-container.component.html',
  styleUrl: './report-container.component.css'
})
export class ReportContainerComponent {

  router = inject(Router);
  @Input('report') report!: report

  routeView(route: string) {
    this.router.navigate([`admin/reports/${route}`])
  }
}
