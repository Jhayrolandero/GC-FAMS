import { Component, OnInit } from '@angular/core';
import { GcBoxComponent } from './gc-box/gc-box.component';
import { PersonalInfoFormComponent } from './personal-info-form/personal-info-form.component';
import { CollegeService } from '../../services/admin/college.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MessageService } from '../../services/message.service';

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
  imports: [GcBoxComponent, PersonalInfoFormComponent, ReactiveFormsModule, NgFor, NgClass, NgIf],
  providers: [CollegeService, MessageService],
  templateUrl: './manage-faculty.component.html',
  styleUrl: './manage-faculty.component.css'
})


export class ManageFacultyComponent implements OnInit {

  constructor(private College: CollegeService, private MessageService: MessageService) {}

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
  first_name: new FormControl<string>('', Validators.required),
  last_name: new FormControl(''),
  birthdate: new FormControl(''),
  age: new FormControl(''),
  citizenship: new FormControl(''),
  civil_status: new FormControl(''),
  sex: new FormControl(''),
  email: new FormControl(''),
  employment_status: new FormControl(-1),
  phone_number: new FormControl(2, Validators.min(3)),
  middle_name: new FormControl(''),
  ext_name: new FormControl(''),
  region: new FormControl(''),
  province: new FormControl(''),
  language: new FormControl(''),
  city: new FormControl(''),
  barangay: new FormControl(''),
  });
  // program: new FormControl(''),

  get phoneNumber() {
    return this.facultyInfo.get('phone_number')
  }

  selectedCollege: number = -1;
  setCollege(value: number): void {
    this.facultyInfo.patchValue({
      college_ID: value
    });
    this.selectedCollege = value
  }

  setPosition(value: string): void {
    this.facultyInfo.patchValue({
      teaching_position: value
    });
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

  validateForm(): void {

  }
  onSubmit() {
    this.facultyInfo.get('first_name').errors.required
    // TODO: Use EventEmitter with form value
    // this.College.addFaculty(this.facultyInfo.value).subscribe(
    //   msg => console.log(msg)
    // )
    // console.log(this.facultyInfo.value.phone_number.errors)
    // console.log(this.facultyInfo.valid)
    console.log(this.facultyInfo.errors)

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

  ngOnInit(): void {
    this.fetchCollege()
    this.fetchProgram()
  }

  fetchCollege(): void {
    this.College.fetchCollege().subscribe(
      {
        next: colleges => this.colleges = this.modifyData(colleges),
        error: err => console.log(err)
     }
    )
  }
  fetchProgram(): void {
    this.College.fetchProgram().subscribe(
      {
        next: programs => this.programs = this.modifyData1(programs),
        error: (err: Error) => console.log(err.message)
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
