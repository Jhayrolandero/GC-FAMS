import { Component } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { CommonModule } from '@angular/common';
import { ReportContainerComponent } from '../../components/report-container/report-container.component';
import { ExcelServiceService } from '../../service/excel-service.service';

type MyFunctionType = () => void;
interface ReportVal {
  reportTitle: string;
  reportFunction: MyFunctionType;
}

interface Report {
  title: string;
  reports: ReportVal[];
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, ReportContainerComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  constructor(
    private info: InfoService,
    private excelService: ExcelServiceService
  ) {}

  generateRadarReport() {
    this.excelService.generateRadarReport()
  }

  generateSemDiffReport() {
    this.excelService.generateSemDiffReport()
  }

  generateIndTimelineReport() {
    this.excelService.generateIndTimelineReport()
  }

  generateEducAttainmentReport() {
    this.excelService.generateEducAttainmentReport()
  }

  evalReport: Report = {
    title: "Evaluation Report",
    reports: [
      {
        reportTitle:"Evaluation-Radar",
        reportFunction:this.generateRadarReport.bind(this) as MyFunctionType
      },
      {
        reportTitle:"Semestral Difference",
        reportFunction:this.generateSemDiffReport.bind(this) as MyFunctionType
      },
      {
        reportTitle:"Individual Evaluation Average Timeline",
        reportFunction:this.generateIndTimelineReport.bind(this) as MyFunctionType
      },
      {
        reportTitle:`Educational Attainment Timeline (${this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`,
        reportFunction:this.generateEducAttainmentReport.bind(this) as MyFunctionType
      }
    ]
  };

}
