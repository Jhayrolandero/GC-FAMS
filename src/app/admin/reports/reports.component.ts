import { Component } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { CommonModule } from '@angular/common';
import { ReportContainerComponent } from '../../components/report-container/report-container.component';
import { ExcelServiceService } from '../../service/excel-service.service';

type MyFunctionType = () => void;
interface ReportVal {
  id: number;
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
        id: 1,
        reportTitle:`${this.college} - Evaluation-Radar`,
        reportFunction:() => this.excelService.generateRadarReport()
      },
      {
        id: 2,
        reportTitle:`${this.college} - Semestral Difference`,
        reportFunction:() => this.excelService.generateSemDiffReport()
      },
      {
        id: 3,
        reportTitle:`${this.college} - Individual Evaluation Average Timeline`,
        reportFunction:() => this.excelService.generateIndTimelineReport()
      },
      {
        id: 4,
        reportTitle:`${this.college} - Educational Attainment Timeline (${this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`,
        reportFunction:() => this.excelService.generateEducAttainmentReport()
      }
    ]
  };

  this.programReport = {
    title: "Program Report",
    reports: [
      {
        id: 5,
        reportTitle: `${this.college} - Education Attainment Timeline (${this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`,
        reportFunction: () => this.excelService.generateEducReport()
      },
      {
        id: 6,
        reportTitle: `${this.college} - Educational Attainment`,
        reportFunction: () => this.excelService.generateEducAttainmentReport2()
      },
      {
        id: 7,
        reportTitle: `${this.college} - Employment Type`,
        reportFunction: () => this.excelService.generateEmploymentTypeReport()
      },
      {
        id: 8,
        reportTitle: `${this.college} - Seminars Attended`,
        reportFunction: () => this.excelService.generateSeminarReport()
      },
      {
        id: 9,
        reportTitle: `${this.college} - Teaching Level`,
        reportFunction: () => this.excelService.generateTeachingLevelReport()
      },
      {
        id: 10,
        reportTitle: `${this.college} - Instructor's Expertise`,
        reportFunction: () => this.excelService.generateExpertiseReport()
      },
      {
        id: 11,
        reportTitle: `${this.college} - Teaching Evaluation Correlation`,
        reportFunction: () => this.excelService.generateTeachCorrelationReport()
      },
      {
        id: 12,
        reportTitle: `${this.college} - Teaching Length and Certificates Count `,
        reportFunction: () => this.excelService.generateCertsTeachReport()
      },
      {
        id: 13,
        reportTitle: `${this.college} - Certification Count`,
        reportFunction: () => this.excelService.generateCertTypeReport()
      }
    ]
  }

  this.facultyReport = {
    title: "Faculty Report",
    reports: [
      {
        id: 14,
        reportTitle: `${this.college} - Faculty Report ${this.excelService.currSem}`,
        reportFunction: () =>  this.excelService.generateFacultyReport()
      }
    ]
  }
  }
}
