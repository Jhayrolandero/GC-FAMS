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
import { filter, firstValueFrom, take, takeLast } from 'rxjs';
import { error } from 'console';
import { AdminFetcherService } from '../services/admin/admin-fetcher.service';

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
    private info: InfoService,
    private adminService: AdminFetcherService
  ) {
    this.getCollege()
  }

  college: string = ''

  async getCollege() {
    this.college = await this.info.getCollege()
  }

  currSem = this.getSemester(new Date().getMonth()+'', new Date().getFullYear()).semester + " Semester, A.Y. "+ this.getSemester(new Date().getMonth()+'', new Date().getFullYear()).academicYear

  getSemester(month: string, year: number) {
    // Define month names and their corresponding semester periods
    const months: { [key: string]: { semester: string, yearOffset: number } } = {
      "0": { semester: "2nd", yearOffset: 0 },
      "1": { semester: "2nd", yearOffset: 0 },
      "2": { semester: "2nd", yearOffset: 0 },
      "3": { semester: "2nd", yearOffset: 0 },
      "4": { semester: "2nd", yearOffset: 0 },
      "5": { semester: "2nd", yearOffset: 0 },
      "6": { semester: "Midyear", yearOffset: 0 },
      "7": { semester: "1st", yearOffset: 0 },
      "8": { semester: "1st", yearOffset: 0 },
      "9": { semester: "1st", yearOffset: 0 },
      "10": { semester: "1st", yearOffset: 0 },
      "11": { semester: "1st", yearOffset: 0 },
    };

    // Check if the provided month is valid
    if (!months.hasOwnProperty(month)) {
      throw new Error("Invalid month");
    }

    const { semester, yearOffset } = months[month];

    // Determine academic year
    let academicYearStart, academicYearEnd;
    if (semester === "1st") {
      academicYearStart = year;
      academicYearEnd = year + 1;
    } else if (semester === "2nd") {
      academicYearStart = year - 1;
      academicYearEnd = year;
    } else if (semester === "Midyear") {
      academicYearStart = year;
      academicYearEnd = year;
    } else {
      throw new Error("Month provided does not belong to any semester.");
    }

    return {
      semester: semester,
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

  async fetchData(selector: any): Promise<any> {
    return await firstValueFrom(
      this.store.pipe(
        select(selector),
        filter((data : any) => !!data && data.length > 0),
        take(1)
      )
    );
  }

  downloadExcel(file: any, name: string){
    const url = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = name + '.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  generateFacultyReport() {
    this.fetchData(DeanSelector.selectFacultyReport).then(res => {
      console.log(res);
      this.adminService.excelGenerator([res, 'Faculty Details Report']).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, 'Faculty Details Report');
        },
        error: (err) => {
          console.log(err)
        },
      })
    })
  }

  generateFacultyStudentReport() {
    this.fetchData(DeanSelector.selectRadarReport).then(radarData => {
      this.adminService.excelGenerator([radarData, 'Faculty Student Evaluation']).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, 'Faculty Student Evaulation');
        },
        error: (err) => {
          console.log(err)
        },
      })
    })
  }

  generateSemDiffReport() {
    this.fetchData(DeanSelector.selectSemDiffReport).then(res => {
      console.log(res);
      this.adminService.excelGenerator([res, 'Evaluation per Semester Difference']).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, 'Evaluation per Semester Difference');
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  }

  generateIndTimelineReport() {
    this.fetchData(DeanSelector.selectAllAveReport).then(res => {
      console.log(res);
      this.adminService.excelGenerator([res, 'Individual Evaluation Average Timeline']).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, 'Individual Evaluation Average Timeline');
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })

  }

  generateEducAttainmentReport() {
    this.fetchData(DeanSelector.selectOverallAveReport).then(res => {
      this.adminService.excelGenerator([res, 'Overall Evaluation Average Timeline']).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, 'Overall Evaluation Average Timeline');
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  }

  /*
    Manage Analytics
  */
  generateEducReport() {
    this.fetchData(DeanSelector.selectCollegeEducTimelineReport).then(res => {
      this.adminService.excelGenerator([res, 'Education Attainment Timeline']).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, 'Education Attainment Timeline');
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  }

  generateAttainmentReport() {
    this.fetchData(DeanSelector.selectAttainmentTimelineReport).then(res => {
      console.log(res);
      this.adminService.excelGenerator([res, 'Attainment Timeline']).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, 'Attainment Timeline');
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  }

  generateMilestoneReport() {
    this.fetchData(DeanSelector.selectMilestoneReport).then(res => {
      console.log(res);
      this.adminService.excelGenerator([res, 'Milestone Achieved']).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, 'Milestone Achieved');
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  }

  generateEducAttainmentReport2() {
    this.fetchData(DeanSelector.selectCurrentEducAttainment).then(res => {
      console.log(res);
      this.adminService.excelGenerator([res, 'Educational Attainment']).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, 'Educational Attainment');
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  }

  generateEmploymentTypeReport() {
    this.fetchData(DeanSelector.selectEmploymentTypeReport).then(res => {
      console.log(res);
      this.adminService.excelGenerator([res, 'Employment Type']).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, 'Employment Type');
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })

  }

  generateSeminarReport() {
    this.fetchData(DeanSelector.selectSeminarReport).then(res => {
      console.log(res);
      this.adminService.excelGenerator([res, 'Seminars Attended']).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, 'Seminars Attended');
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  }

  generateTeachingLevelReport() {
    this.fetchData(DeanSelector.selectTeachingLevelReport).then(res => {
      console.log(res);
      this.adminService.excelGenerator([res, 'Teaching Level']).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, 'Teaching Level');
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  }

  generateExpertiseReport() {
    this.fetchData(DeanSelector.selectExpertiseReport).then(res => {
      console.log(res);
      this.adminService.excelGenerator([res, "Instructor's Expertise"]).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, "Instructor's Expertise");
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  }

  generateTeachCorrelationReport() {
    this.fetchData(DeanSelector.selectTeachingCorrelationReport).then(res => {
      console.log(res);
      this.adminService.excelGenerator([res, "Teaching Evaluation Correlation"]).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, "Teaching Evaluation Correlation");
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })

  }

  generateCertsTeachReport() {
    this.fetchData(DeanSelector.selectTeachingCertReport).then(res => {
      console.log(res);
      this.adminService.excelGenerator([res, "Teaching Length and Certificates Count"]).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, "Teaching Length and Certificates Count");
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  }

  generateCertTypeReport() {
    this.fetchData(DeanSelector.selectCertTypeReport).then(res => {
      console.log(res);
      this.adminService.excelGenerator([res, "Certification Count"]).subscribe({
        next: (next: any) => {
          this.downloadExcel(next, "Certification Count");
        },
        error: (err) => {
          console.log(err)
        },
      })
    }).catch(error => {
      console.error("Error fetching data:", error);
    })
  }


  indAttainmentReport(data: AttainmentData[], name?: string) {
    this.adminService.excelGenerator([data, "Attainment Timeline"]).subscribe({
      next: (next: any) => {
        name ? this.downloadExcel(next, `${name} Attainment Timeline`) : this.downloadExcel(next, "Attainment Timeline")
        // this.downloadExcel(next, `${name ? name+ " - " : ''} Attainment Timeline`);
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  indMilestoneReport(data: object[], name?: string) {
    this.adminService.excelGenerator([data, "Milestone Achieved"]).subscribe({
      next: (next: any) => {
        name ? this.downloadExcel(next, `${name} Milestone Achieved`) : this.downloadExcel(next, "Milestone Achieved")
        // this.downloadExcel(next, `${name ? name+ " - " : ''} Milestone Achieved`);
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  facultyEval(data: object[], name?: string) {
    this.adminService.excelGenerator([data, "Faculty Evaluation"]).subscribe({
      next: (next: any) => {
        name ? this.downloadExcel(next, `${name} Faculty Evaluation`) : this.downloadExcel(next, "Faculty Evaluation")

        // this.downloadExcel(next, `${name ? name+ " - " : ''} Faculty Evaluation`);
      },
      error: (err) => {
        console.log(err)
      },
    })
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
