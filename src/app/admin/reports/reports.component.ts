import { Component } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { CommonModule } from '@angular/common';
import { ReportContainerComponent } from '../../components/report-container/report-container.component';
import { ExcelServiceService } from '../../service/excel-service.service';
import { ReportVal } from '../../services/Interfaces/reportVal';

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

  setupReport() {
  this.evalReport = {
    title: "Evaluation Report",
    reports: [
      {
        id: "RmFjdWx0eSBTdHVkZW50IEV2YWx1YXRpb24=",
        reportTitle:`${this.college} - Faculty Student Evaluation`,
        reportFunction:() => this.excelService.generateFacultyStudentReport()
      },
      {
        id: "RXZhbHVhdGlvbiBwZXIgU2VtZXN0ZXIgRGlmZmVyZW5jZQ==",
        reportTitle:`${this.college} - Evaluation per Semester Difference`,
        reportFunction:() => this.excelService.generateSemDiffReport()
      },
      {
        id: "SW5kaXZpZHVhbCBFdmFsdWF0aW9uIEF2ZXJhZ2UgVGltZWxpbmU=",
        reportTitle:`${this.college} - Individual Evaluation Average Timeline`,
        reportFunction:() => this.excelService.generateIndTimelineReport()
      },
      {
        id: "T3ZlcmFsbCBFdmFsdWF0aW9uIEF2ZXJhZ2UgVGltZWxpbmU=",
        reportTitle:`${this.college} - Overall Evaluation Average Timeline (${this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`,
        reportFunction:() => this.excelService.generateEducAttainmentReport()
      }
    ]
  };

  this.programReport = {
    title: "Program Report",
    reports: [
      {
        id: "RWR1Y2F0aW9uYWwgQXR0YWlubWVudCBUaW1lbGluZQ==",
        reportTitle: `${this.college} - Educational Attainment Timeline (${this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`,
        reportFunction: () => this.excelService.generateEducReport()
      },
      {
        id: "RWR1Y2F0aW9uYWwgQXR0YWlubWVudA==",
        reportTitle: `${this.college} - Educational Attainment`,
        reportFunction: () => this.excelService.generateEducAttainmentReport2()
      },
      {
        id: 'RW1wbG95bWVudCBUeXBl',
        reportTitle: `${this.college} - Employment Type`,
        reportFunction: () => this.excelService.generateEmploymentTypeReport()
      },
      {
        id: "U2VtaW5hcnMgQXR0ZW5kZWQ=",
        reportTitle: `${this.college} - Seminars Attended`,
        reportFunction: () => this.excelService.generateSeminarReport()
      },
      {
        id: "VGVhY2hpbmcgTGV2ZWw=",
        reportTitle: `${this.college} - Teaching Level`,
        reportFunction: () => this.excelService.generateTeachingLevelReport()
      },
      {
        id: "SW5zdHJ1Y3RvcidzIEV4cGVydGlzZQ==",
        reportTitle: `${this.college} - Instructor's Expertise`,
        reportFunction: () => this.excelService.generateExpertiseReport()
      },
      {
        id: "VGVhY2hpbmcgRXZhbHVhdGlvbiBDb3JyZWxhdGlvbg==",
        reportTitle: `${this.college} - Teaching Evaluation Correlation`,
        reportFunction: () => this.excelService.generateTeachCorrelationReport()
      },
      {
        id: "VGVhY2hpbmcgTGVuZ3RoIGFuZCBDZXJ0aWZpY2F0ZXMgQ291bnQ=",
        reportTitle: `${this.college} - Teaching Length and Certificates Count`,
        reportFunction: () => this.excelService.generateCertsTeachReport()
      },
      {
        id: "Q2VydGlmaWNhdGlvbiBDb3VudA==",
        reportTitle: `${this.college} - Certification Count`,
        reportFunction: () => this.excelService.generateCertTypeReport()
      },
      {
        id: "TWlsZXN0b25lIEFjaGlldmVk",
        reportTitle: `${this.college} - Milestone Achieved ${this.college} (${ this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`,
        reportFunction: () => this.excelService.generateMilestoneReport()
      },
      {
        id: "QXR0YWlubWVudCBUaW1lbGluZQ==",
        reportTitle: `${this.college} - Attainment Timeline ${this.college} (${ this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`,
        reportFunction: () => this.excelService.generateAttainmentReport()
      },
    ]
  }

  this.facultyReport = {
    title: "Faculty Report",
    reports: [
      {
        id: "RmFjdWx0eSBSZXBvcnQ=",
        reportTitle: `${this.college} - Faculty Report ${this.excelService.currSem}`,
        reportFunction: () =>  this.excelService.generateFacultyReport()
      }
    ]
  }
  }
}
