import { Component, Input } from '@angular/core';

// Define a type for a function signature
type MyFunctionType = () => void;
interface ReportVal {
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

  @Input('report') report!: report
}
