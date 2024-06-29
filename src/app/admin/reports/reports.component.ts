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
  ) {

    this.getCollege()
  }
  college: string = ""
  evalReport!: Report;
  programReport!: Report;
  facultyReport!: Report;

  async getCollege() {
    this.college = await this.info.getCollege()
    this.setupReport()
  }


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

  setupReport() {
  this.evalReport = {
    title: "Evaluation Report",
    reports: [
      {
        reportTitle:`${this.college} - Evaluation-Radar`,
        reportFunction:() => this.excelService.generateRadarReport()
      },
      {
        reportTitle:`${this.college} - Semestral Difference`,
        reportFunction:() => this.excelService.generateSemDiffReport()
      },
      {
        reportTitle:`${this.college} - Individual Evaluation Average Timeline`,
        reportFunction:() => this.excelService.generateIndTimelineReport()
      },
      {
        reportTitle:`${this.college} - Educational Attainment Timeline (${this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`,
        reportFunction:() => this.excelService.generateEducAttainmentReport()
      }
    ]
  };

  this.programReport = {
    title: "Program Report",
    reports: [
      {
        reportTitle: `${this.college} - Education Attainment Timeline (${this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`,        reportFunction: () => this.excelService.generateEducReport()
      },
      {
        reportTitle: `${this.college} - Educational Attainment`,
        reportFunction: () => this.excelService.generateEducAttainmentReport2()
      },
      {
        reportTitle: `${this.college} - Employment Type`,
        reportFunction: () => this.excelService.generateEmploymentTypeReport()
      },
      {
        reportTitle: `${this.college} - Seminars Attended`,
        reportFunction: () => this.excelService.generateSeminarReport()
      },
      {
        reportTitle: `${this.college} - Teaching Level`,
        reportFunction: () => this.excelService.generateTeachingLevelReport()
      },
      {
        reportTitle: `${this.college} - Instructor's Expertise`,
        reportFunction: () => this.excelService.generateExpertiseReport()
      },
      {
        reportTitle: `${this.college} - Teaching Evaluation Correlation`,
        reportFunction: () => this.excelService.generateTeachCorrelationReport()
      },
      {
        reportTitle: `${this.college} - Teaching Length and Certificates Count `,
        reportFunction: () => this.excelService.generateCertsTeachReport()
      },
      {
        reportTitle: `${this.college} - Certification Count`,
        reportFunction: () => this.excelService.generateCertTypeReport()
      }
    ]
  }

  this.facultyReport = {
    title: "Faculty Report",
    reports: [
      {
        reportTitle: `${this.college} - Faculty Report ${this.excelService.currSem}`,
        reportFunction: () =>  this.excelService.generateFacultyReport()
      }
    ]
  }
  }
}
