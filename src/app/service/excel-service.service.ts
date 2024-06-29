import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { EvaluationTimeline } from '../services/Interfaces/indAverageTimeline';
import { EvaluationRadar } from '../services/Interfaces/radarEvaluation';
import { SemDiff } from '../services/Interfaces/semDiff';
import { InfoService } from '../services/info.service';
import { EducAttainmentData } from '../services/Interfaces/educAttainmentData';
import { AttainmentData } from '../services/Interfaces/attainmentData';
import { MilestoneReport } from '../services/Interfaces/milestoneReport';
import { CurrEducAttainment } from '../services/Interfaces/currEducAttainment';
import { EmploymentTypeReport } from '../services/Interfaces/employmentTypeReport';
import { SeminarReport } from '../services/Interfaces/seminarReport';
import { TeachingLevelReport } from '../services/Interfaces/teachingLevelReport';
import { ExpertiseReport } from '../services/Interfaces/expertiseReport';
import { FacultyReport } from '../services/Interfaces/facultyReport';
import { Store, select } from '@ngrx/store';
import * as DeanSelector from '../state/dean-state/dean-state.selector';
import { filter, take } from 'rxjs';

interface SubHeading {
  start: number;
}

interface SubHeadingsDictionary {
  "start": number;
  "title": string;
}

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  constructor(
    private store: Store,
    private info: InfoService
  ) {
    this.getCollege()
  }

  college: string = ''

  async getCollege() {
    this.college = await this.info.getCollege()
  }

  currSem = this.getSemester(new Date().getMonth()+'', new Date().getFullYear()).semester + " Semester, A.Y. "+ this.getSemester(new Date().getMonth()+'', new Date().getFullYear()).academicYear

  getSemester(month : string, year : number) {
    // Normalize the input
    month = month.toLowerCase();

    // Define month names and their corresponding semester periods
    const months: any = {
      0: { semester: 2, yearOffset: 0 },
      1: { semester: 2, yearOffset: 0 },
      2: { semester: 2, yearOffset: 0 },
      3: { semester: 2, yearOffset: 0 },
      4: { semester: 2, yearOffset: 0 },
      5: { semester: 2, yearOffset: 0 },
      6: { semester: 2, yearOffset: 0 },  // Default to midyear for semester 2
      7: { semester: 1, yearOffset: 0 },
      8: { semester: 1, yearOffset: 0 },
      9: { semester: 1, yearOffset: 0 },
      10: { semester: 1, yearOffset: 0 },
      11: { semester: 1, yearOffset: 0 },
    };

    // Check if the provided month is valid
    if (!months.hasOwnProperty(month)) {
      throw new Error("Invalid month");
    }

    const { semester, yearOffset } = months[month];

    // Determine academic year
    let academicYearStart, academicYearEnd;
    if (semester === 1) {
      academicYearStart = year;
      academicYearEnd = year + 1;
    } else if (semester === 2) {
      academicYearStart = year - 1;
      academicYearEnd = year;
    } else {
      throw new Error("Month provided does not belong to any semester.");
    }

    return {
      semester: semester == 1 ? '1st' : '2nd',
      academicYear: `${academicYearStart}-${academicYearEnd}`
    };
  }


  exportexcel<T>(data: T[], title: string ): void
  {

    console.log("generating")
    // Define the headers
    const headers = ["No.", "Name", "Position", "College", "2021", "2022", "2023"];

    // Create a worksheet
    // const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

    /* pass here the table id */
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(this.userList);
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(data, { header: headers });

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, title + '.xlsx');

  }

  generateHeader<T>(college: string, rowlength: number, data: T, title: string, EvalSem: string, subHeading?: SubHeadingsDictionary) {

    let col = ''
    switch(college.toLowerCase()) {
      case 'ccs':
        col = "College of Computer Studies"
        break;
      case 'cahs':
        col = "College of Allied Health Studies"
        break;
      case 'cba':
        col = "College of Business and Accountancy"
        break;
      case 'chtm':
        col = "College of Hospitality and Tourism Management"
        break;
      case 'ceas':
        col = "College of Education, Arts, and Sciences"
        break;
    }

    let headerColLength = 4

    subHeading ? headerColLength++ : headerColLength

    let headers: string[][] = []

    for(let i = 0; i < headerColLength; i++) {
      headers[i] = Array.from({ length: rowlength - 1 }, () => "")
    }

    // let headers = [Array.from({ length: rowlength }, () => ""), Array.from({ length: rowlength }, () => "")]
    headers[0][0] = title;
    headers[1][0] = `Gordon College - ${col}`;
    headers[2][0] = EvalSem
    // subHeading ? headers[3][subHeading.start] = subHeading.title : headers[3][0]

    // Not Working for now
    if(subHeading) {
      let i = 0
      // For subheading
      Object.keys(data as object).map(key => {
        if(i >= subHeading.start) return
        headers[3][i] = key
        i++
      })

      headers[3][subHeading.start] = subHeading.title

      let skip = 0
      let start = subHeading.start
      Object.keys(data as object).map(key => {
        if(skip < start) {
          skip++
          return
        }
        headers[4][skip] = key
        skip++
      })
      // for(let i = subHeading.start + 1; i <headerColLength; i++) {
      //   headers[4][i] = subHeading.title
      // }
    } else {
      let i = 0
      Object.keys(data as object).map(key => {
        headers[3][i] = key
        i++
      })
    }

    return headers
  }

  generateMergeArr(headerColLength: number, subHeading? : SubHeadingsDictionary) {

    return subHeading ?  [
      { s: { r: 0, c: 0 }, e: { r: 0, c: headerColLength } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: headerColLength } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: headerColLength } },
      { s: { r: 3, c: subHeading.start }, e: { r: 3, c: headerColLength } },
      { s: { r: 3, c: 0 }, e: { r: 4, c: 0 } },
      { s: { r: 3, c: 1 }, e: { r: 4, c: 1 } },
      { s: { r: 3, c: 2 }, e: { r: 4, c: 2 } },
      { s: { r: 3, c: 3 }, e: { r: 4, c: 3 } },
    ] : [
      { s: { r: 0, c: 0 }, e: { r: 0, c: headerColLength } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: headerColLength } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: headerColLength } },
    ]

  }

  generateRadarReport() {
    this.store.pipe(
      select(DeanSelector.selectRadarReport),
      filter(data => !!data && data.length > 0),
      take(1)  // This ensures only non-null/non-undefined values are processed
    ).subscribe({
      next: (data) => {
        this.exportExcel<EvaluationRadar>(data!, "Evaluation-Radar", this.college, this.currSem )
      },
      error: err => console.error(err)
    });
  }

  generateSemDiffReport(semDiffData: SemDiff[]) {
    if(semDiffData.length <= 0) return
    this.exportExcel<SemDiff>(semDiffData, "Semestral Difference", this.college, this.currSem)
  }

  generateIndTimelineReport(indvSemAveTimelineData: EvaluationTimeline[]) {
    if(indvSemAveTimelineData.length <= 0) return

    this.exportExcel<EvaluationTimeline>(
      indvSemAveTimelineData,
      "Individual Timeline",
      this.college,
      this.currSem,
      {start: 4, title: "Year"}
    )

  }

  generateEducAttainmentReport(educationTimelineReport: Object[]) {
    if(educationTimelineReport.length <= 0) return

    this.exportExcel<Object>(educationTimelineReport, `Educational Attainment Timeline (${ this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`, this.college, this.currSem)
  }

  generateEducReport(educData: EducAttainmentData[]) {
    if(educData.length <= 0) return

    this.exportExcel<EducAttainmentData>(educData, `Education Attainment Timeline ${this.college} (${ this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`, this.college, this.currSem)

  }

  // Bugged
  generateAttainmentReport(attainmentData: AttainmentData[]) {
    if(attainmentData.length <= 0) return

    this.exportExcel<AttainmentData>(attainmentData, `Attainment Timeline ${this.college} (${ this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`, this.college, this.currSem)

  }

  // Bugged
  generateMilestoneReport(milestoneData: MilestoneReport[]) {
    if(milestoneData.length <= 0) return

    this.exportExcel<MilestoneReport>(milestoneData, `Milestone Achieved ${this.college} (${ this.info.date.getFullYear() - 14} - ${this.info.date.getFullYear()})`, this.college, this.currSem)
  }

  generateEducAttainmentReport2(currEducData: CurrEducAttainment[]) {
    if(currEducData.length <= 0) return

    this.exportExcel<CurrEducAttainment>(currEducData, `Educational Attainment ${this.college}`, this.college, this.currSem)

  }

  generateEmploymentTypeReport(employmentTypeData: EmploymentTypeReport[]) {
    if(employmentTypeData.length <= 0 ) return

    this.exportExcel<EmploymentTypeReport>(employmentTypeData, `Employment Type ${this.college}`, this.college, this.currSem)
  }

  generateSeminarReport(seminarReport: SeminarReport[]) {
    if(seminarReport.length <= 0) return

    this.exportExcel<SeminarReport>(seminarReport, `Seminars Attended ${this.college}`, this.college, this.currSem)
  }

  generateTeachingLevelReport(teachingLevelReport: TeachingLevelReport[]) {
    if(teachingLevelReport.length <= 0) return

    this.exportExcel<TeachingLevelReport>(teachingLevelReport, `Teaching Level ${this.college}`, this.college, this.currSem)

  }

  generateExpertiseReport(expertiseReport: ExpertiseReport[]) {
    if(expertiseReport.length <= 0 ) return

    this.exportExcel<ExpertiseReport>(expertiseReport, `Instructor's Expertise ${this.college}`, this.college, this.currSem)

  }

  generateTeachCorrelationReport(teachingEvalCorrelationReport: Object[]) {
    if(teachingEvalCorrelationReport.length <= 0 ) return

    this.exportExcel<Object>(teachingEvalCorrelationReport, `Teaching Evaluation Correlation ${this.college}`, this.college, this.currSem)

  }

  generateCertsTeachReport(teachingCertsReport: Object[]) {
    if(teachingCertsReport.length <= 0) return

    this.exportExcel<Object>(teachingCertsReport, `Teaching Length and Certificates Count  ${this.college}`, this.college, this.currSem)
  }

  generateCertTypeReport(certTypeReport: Object[]) {
    if(certTypeReport.length <= 0 ) return

    this.exportExcel<Object>(certTypeReport, `Certification Count ${this.college}`, this.college, this.currSem)
  }

  generateFacultyReport(facultyReportData: FacultyReport[]) {
    if(facultyReportData.length < 0) return

    this.exportExcel<FacultyReport>(facultyReportData,`Faculty Report ${this.college} ${this.currSem}`,this.college,this.currSem)
  }

  exportExcel<T>(data: T[], title: string, college: string, EvalSem: string, subHeading? : SubHeadingsDictionary): void
  // exportExcelHeader<T>(data: T[], title: string, header?: string[][] | string[]): void
  {

    console.log("generating")
    // Define the headers
    let headers: string[][] = []


    headers = this.generateHeader<T>('ccs', Object.keys(data[0] as object).length, data[0] as T, title, EvalSem, subHeading)

    const headerRowLength = headers.length
    const headerColLength = headers[0].length
    // COnvert the headers to 2D array

    // console.log(headers)
    const worksheet = XLSX.utils.aoa_to_sheet(headers);


    XLSX.utils.sheet_add_json(worksheet, data, { skipHeader: true, origin: `A${headerRowLength + 1}` });

    worksheet["!merges"] = this.generateMergeArr(headerColLength, subHeading)

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook to a file
    XLSX.writeFile(workbook, title + '.xlsx');
  }



}
