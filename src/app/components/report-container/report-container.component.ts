import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Define a type for a function signature
type MyFunctionType = () => void;
interface ReportVal {
  id: number;
  reportTitle: string;
  reportFunction: MyFunctionType;
}

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

  routeView(route: number) {
    this.router.navigate([`admin/reports/${route}`])
  }
}
