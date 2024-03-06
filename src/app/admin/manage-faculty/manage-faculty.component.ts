import { Component, OnInit } from '@angular/core';
import { GcBoxComponent } from './gc-box/gc-box.component';
import { PersonalInfoFormComponent } from './personal-info-form/personal-info-form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { AdminFetcherServiceService } from '../../services/admin/admin-fetcher-service.service';
import { College } from '../../services/Interfaces/college';

export interface program {
  map(arg0: (item: any) => any): any;
  'program_id': number;
  'college_id': number;
  'program_name': string;
  'program_abbv': string;
  'bgColor': string;
  'imgPath': string;
}

export interface employment {
  'employmentType': string;
  'empStatus': number
}


@Component({
  selector: 'app-manage-faculty',
  standalone: true,
  imports: [GcBoxComponent, PersonalInfoFormComponent, ReactiveFormsModule, NgFor],
  templateUrl: './manage-faculty.component.html',
  styleUrl: './manage-faculty.component.css'
})


export class ManageFacultyComponent implements OnInit {

selectedCollege: number = -1;
disabledBox: boolean = false;
employmentStatus:employment[] = [
  {'employmentType': 'Part-Time', 'empStatus': 0},
  {'employmentType': 'Full-Time', 'empStatus': 1},
]

positions: string[] = [
  "Dean", "Coordinator", "Instructor"
]

facultyInfo = new FormGroup({
  college_ID: new FormControl(-1),
  teaching_position: new FormControl(''),
  first_name: new FormControl(''),
  last_name: new FormControl(''),
  birthdate: new FormControl(''),
  age: new FormControl(),
  citizenship: new FormControl(''),
  civil_status: new FormControl(''),
  sex: new FormControl(''),
  email: new FormControl(''),
  employment_status: new FormControl(-1),
  phone_number: new FormControl(''),
  middle_name: new FormControl(''),
  ext_name: new FormControl(''),
  region: new FormControl(''),
  province: new FormControl(''),
  language: new FormControl(''),
  city: new FormControl(''),
  barangay: new FormControl(''),
  });
  // program: new FormControl(''),

  setCollege(value: number): void {
    this.facultyInfo.patchValue({
      college_ID: value
    });
    this.selectedCollege = value
    console.log(this.selectedCollege);
  }

  setPosition(value: string): void {
    this.facultyInfo.patchValue({
      teaching_position: value
    });
  }

  setProgram(value: string): void {
    // this.facultyInfo.patchValue({
    //   program: value
    // })
  }

  setEmployment(value: number): void {
    this.facultyInfo.patchValue({
      employment_status: value
    })

    if(value != 1) {
      this.disabledBox = true;
      this.facultyInfo.patchValue({
        teaching_position: 'instructor'
      })
    } else {
      this.disabledBox = false;
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // this.College.addFaculty(this.facultyInfo.value).subscribe(
    //   msg => console.log(msg)
    // )

  }
  colleges: College[] = [];
  programs: program[] = [];

  filterPrograms(): program[] {

    let programs: program[] = []
    this.programs.map(program => {
      if(this.selectedCollege > 0 && this.selectedCollege == program.college_id) {
        programs.push(program)
      }
    })
    return programs
  }

  constructor(private adminService: AdminFetcherServiceService) {}
  ngOnInit(): void {
    this.getCollege()
    this.fetchProgram()
  }

  getCollege():void {
    this.adminService.fetchCollege().subscribe((next) => {
      this.colleges = next;
      console.log(this.colleges);
      }
    )
  }

  fetchProgram(): void {
    // this.College.fetchProgram().subscribe(
    //   programs => {
    //     this.programs = this.modifyData1(programs)
    //   }
    // )
  }


  abbvCollege(college: string): string {
    const abbv = college.match(/[A-Z]/g) || [];
    return abbv.join("");
  }

  // modifyData(data: college): any {
  //   // Example: Add a new property to each item
  //   return data.map((item: college) => {

  //     switch(item.college_name.toLowerCase()) {
  //       case 'college of computer studies':
  //         return {
  //           ...item,
  //           college_abbv: this.abbvCollege(item.college_name),
  //           bgColor: '#FF7A00',
  //           imgPath: '../../../../assets/college-logo/ccs.png'
  //           };
  //         case 'college of business and accountancy':
  //           return {
  //             ...item,
  //             college_abbv: this.abbvCollege(item.college_name),
  //             bgColor: '#FFDF00',
  //             imgPath: '../../../../assets/college-logo/cba.png'
  //           };
  //         case 'college of education, arts, and sciences':
  //           return {
  //             ...item,
  //             college_abbv: this.abbvCollege(item.college_name),
  //             bgColor: '#0077CC',
  //             imgPath: '../../../../assets/college-logo/ceas.png'
  //           };
  //         case 'college of allied health studies':
  //           return {
  //             ...item,
  //             college_abbv: this.abbvCollege(item.college_name),
  //             bgColor: '#FF0000',
  //             imgPath: '../../../../assets/college-logo/cahs.png'
  //           };
  //         case 'college of hospitality and tourism management':
  //           return {
  //             ...item,
  //             college_abbv: this.abbvCollege(item.college_name),
  //             bgColor: '#FF0082',
  //             imgPath: '../../../../assets/college-logo/chtm.png'
  //           };
  //       default:
  //         return {
  //           ...item,
  //           newProperty: 'default'
  //         };
  //     }
  //   });

  // }

  // modifyData1(data: program): any {
  //   // Example: Add a new property to each item
  //   return data.map((item: program) => {

  //     switch(item.college_id) {
  //       case  1 :
  //         return {
  //           ...item,
  //           program_abbv: this.abbvCollege(item.program_name),
  //           bgColor: '#FF7A00',
  //           imgPath: '../../../../assets/college-logo/ccs.png'
  //           };
  //         case  2:
  //           return {
  //             ...item,
  //             program_abbv: this.abbvCollege(item.program_name),
  //             bgColor: '#FFDF00',
  //             imgPath: '../../../../assets/college-logo/cba.png'
  //           };
  //         case  4:
  //           return {
  //             ...item,
  //             program_abbv: this.abbvCollege(item.program_name),
  //             bgColor: '#0077CC',
  //             imgPath: '../../../../assets/college-logo/ceas.png'
  //           };
  //         case  3:
  //           return {
  //             ...item,
  //             program_abbv: this.abbvCollege(item.program_name),
  //             bgColor: '#FF0000',
  //             imgPath: '../../../../assets/college-logo/cahs.png'
  //           };
  //         case  5:
  //           return {
  //             ...item,
  //             program_abbv: this.abbvCollege(item.program_name),
  //             bgColor: '#FF0082',
  //             imgPath: '../../../../assets/college-logo/chtm.png'
  //           };
  //       default:
  //         return {
  //           ...item,
  //           newProperty: 'default'
  //         };
  //     }
  //   });
  // }

}
