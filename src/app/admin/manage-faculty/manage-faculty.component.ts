import { Component, OnInit } from '@angular/core';
import { GcBoxComponent } from './gc-box/gc-box.component';
import { PersonalInfoFormComponent } from './personal-info-form/personal-info-form.component';
import { CollegeService } from '../../services/admin/college.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

export interface college {
  map(arg0: (item: any) => any): any;
  'college_ID': number;
  'college_name': string;
  'college_abbv': string;
  'bgColor': string;
  'imgPath': string;
}

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
  providers: [CollegeService],
  templateUrl: './manage-faculty.component.html',
  styleUrl: './manage-faculty.component.css'
})


export class ManageFacultyComponent implements OnInit {


  disabledBox: boolean = false;
employmentStatus:employment[] = [
  {'employmentType': 'Part-Time', 'empStatus': 0},
  {'employmentType': 'Full-Time', 'empStatus': 1},
]

positions: string[] = [
  "Dean", "Coordinator", "Instructor"
]

facultyInfo = new FormGroup({
    email: new FormControl(''),
    phonenumber: new FormControl(''),
    birthdate: new FormControl(''),
    lastname: new FormControl(''),
    firstname: new FormControl(''),
    middlename: new FormControl(''),
    extname: new FormControl(''),
    region: new FormControl(''),
    province: new FormControl(''),
    city: new FormControl(''),
    barangay: new FormControl(''),
    gender: new FormControl(''),
    language: new FormControl(''),
    nationality: new FormControl(''),
    program: new FormControl(''),
    position: new FormControl(''),
    employment: new FormControl(-1),
  });

  selectedCollege: number = -1;
  setCollege(value: number): void {
    this.selectedCollege = value
  }

  setPosition(value: string): void {
    this.facultyInfo.patchValue({
      position: value
    });
  }

  setProgram(value: string): void {
    this.facultyInfo.patchValue({
      program: value
    })
  }

  setEmployment(value: number): void {
    this.facultyInfo.patchValue({
      employment: value
    })

    if(value != 1) {
      this.disabledBox = true;
      this.facultyInfo.patchValue({
        position: 'instructor'
      })
    } else {
      this.disabledBox = false;
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.facultyInfo.value);
  }
  colleges: college[] = [];
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

  constructor(private College: CollegeService) {}
  ngOnInit(): void {
    this.fetchCollege()
    this.fetchProgram()
  }

  fetchCollege():void {
    this.College.fetchCollege().subscribe(
      colleges => {
        this.colleges = this.modifyData(colleges)

      }
    )
  }

  fetchProgram(): void {
    this.College.fetchProgram().subscribe(
      programs => {
        this.programs = this.modifyData1(programs)
      }
    )
  }


  abbvCollege(college: string): string {
    const abbv = college.match(/[A-Z]/g) || [];
    return abbv.join("");
  }

  modifyData(data: college): any {
    // Example: Add a new property to each item
    return data.map((item: college) => {

      switch(item.college_name.toLowerCase()) {
        case 'college of computer studies':
          return {
            ...item,
            college_abbv: this.abbvCollege(item.college_name),
            bgColor: '#FF7A00',
            imgPath: '../../../../assets/college-logo/ccs.png'
            };
          case 'college of business and accountancy':
            return {
              ...item,
              college_abbv: this.abbvCollege(item.college_name),
              bgColor: '#FFDF00',
              imgPath: '../../../../assets/college-logo/cba.png'
            };
          case 'college of education, arts, and sciences':
            return {
              ...item,
              college_abbv: this.abbvCollege(item.college_name),
              bgColor: '#0077CC',
              imgPath: '../../../../assets/college-logo/ceas.png'
            };
          case 'college of allied health studies':
            return {
              ...item,
              college_abbv: this.abbvCollege(item.college_name),
              bgColor: '#FF0000',
              imgPath: '../../../../assets/college-logo/cahs.png'
            };
          case 'college of hospitality and tourism management':
            return {
              ...item,
              college_abbv: this.abbvCollege(item.college_name),
              bgColor: '#FF0082',
              imgPath: '../../../../assets/college-logo/chtm.png'
            };
        default:
          return {
            ...item,
            newProperty: 'default'
          };
      }
    });

  }

  modifyData1(data: program): any {
    // Example: Add a new property to each item
    return data.map((item: program) => {

      switch(item.college_id) {
        case  1 :
          return {
            ...item,
            program_abbv: this.abbvCollege(item.program_name),
            bgColor: '#FF7A00',
            imgPath: '../../../../assets/college-logo/ccs.png'
            };
          case  2:
            return {
              ...item,
              program_abbv: this.abbvCollege(item.program_name),
              bgColor: '#FFDF00',
              imgPath: '../../../../assets/college-logo/cba.png'
            };
          case  4:
            return {
              ...item,
              program_abbv: this.abbvCollege(item.program_name),
              bgColor: '#0077CC',
              imgPath: '../../../../assets/college-logo/ceas.png'
            };
          case  3:
            return {
              ...item,
              program_abbv: this.abbvCollege(item.program_name),
              bgColor: '#FF0000',
              imgPath: '../../../../assets/college-logo/cahs.png'
            };
          case  5:
            return {
              ...item,
              program_abbv: this.abbvCollege(item.program_name),
              bgColor: '#FF0082',
              imgPath: '../../../../assets/college-logo/chtm.png'
            };
        default:
          return {
            ...item,
            newProperty: 'default'
          };
      }
    });
  }

}
