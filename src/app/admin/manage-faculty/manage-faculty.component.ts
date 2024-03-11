import { Component, OnInit } from '@angular/core';
import { GcBoxComponent } from './gc-box/gc-box.component';
import { PersonalInfoFormComponent } from './personal-info-form/personal-info-form.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { AdminFetcherService } from '../../services/admin/admin-fetcher.service';
import { College } from '../../services/Interfaces/college';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
import { EmployeePositionComponent } from './employee-position/employee-position.component';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { FormsErrorComponent } from './forms-error/forms-error.component';

export interface program {
  map(arg0: (item: any) => any): any;
  'program_id': number;
  'college_id': number;
  'program_name': string;
  'program_abbv': string;
  'bgColor': string;
  'imgPath': string;
}

export interface Employment {
  'employmentType': string;
  'empStatus': number
}


@Component({
  selector: 'app-manage-faculty',
  standalone: true,
  imports: [GcBoxComponent,
    PersonalInfoFormComponent,
    ReactiveFormsModule,
    NgFor,
    EmployeeTypeComponent,
    EmployeePositionComponent,
    LoadingScreenComponent,
    CommonModule,
    FormsErrorComponent],
  templateUrl: './manage-faculty.component.html',
  styleUrl: './manage-faculty.component.css'
})


export class ManageFacultyComponent implements OnInit {
isLoading: boolean = true
selectedCollege: number = -1;
selectedEmployeeType: number = -1;
selectedEmployeePosition: string = '';
// disabledBox: boolean = false;
employmentStatus:Employment[] = [
  {'employmentType': 'Part-Time', 'empStatus': 0},
  {'employmentType': 'Full-Time', 'empStatus': 1},
]

positions: string[] = [
  "Dean", "Coordinator", "Instructor"
]

colleges: College[] = [];
programs: program[] = [];

facultyInfo = new FormGroup({
  college_ID: new FormControl<number | null>( null, [
    Validators.required,
  ]),
  teaching_position: new FormControl('', [
    Validators.required,
  ]),
  first_name: new FormControl<string>('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*')
  ]),
  last_name: new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*')
  ]),
  birthdate: new FormControl('', [
    Validators.required,
  ]),
  age: new FormControl('', [
    Validators.required,
  ]),
  citizenship: new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*')
  ]),
  civil_status: new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*')
  ]),
  sex: new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*')
  ]),
  email: new FormControl('', [
    Validators.required,
    Validators.email]
    ),
  employment_status: new FormControl<number | null>(null, [
    Validators.required,
  ]),
  phone_number: new FormControl('', [
    Validators.required,
  ]),
  middle_name: new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*')
  ]),
  ext_name: new FormControl(''),
  region: new FormControl('', [
    Validators.required,
  ]),
  province: new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*')
  ]),
  language: new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*')
  ]),
  city: new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*')
  ]),
  barangay: new FormControl('', [
    Validators.required,
  ]),
});


formControl(name: string) {
  return this.facultyInfo.get(name)
}
  constructor(private adminService: AdminFetcherService) {}
  ngOnInit(): void {
    this.getCollege()
  }

  setCollege(value: number): void {
    this.facultyInfo.patchValue({
      college_ID: value
    });
    this.selectedCollege = value
    console.log(this.selectedCollege);
  }


  setEmployment(value: number): void {
    this.facultyInfo.patchValue({
      employment_status: value
    })
    this.selectedEmployeeType = value;
    console.log("Selected employee type is: " + this.selectedEmployeeType);

    if(value != 1) {
      this.selectedEmployeePosition = '';
      // this.disabledBox = true;
      this.facultyInfo.patchValue({
        teaching_position: 'instructor'
      })
    } else {
      this.facultyInfo.patchValue({
        teaching_position: ''
      });
    }
  }

  setPosition(value: string): void {
    this.facultyInfo.patchValue({
      teaching_position: value
    });
    this.selectedEmployeePosition = value;

    if(this.selectedEmployeePosition != ''){
      this.selectedEmployeeType = 1;
    }

    console.log("Currently selected position is:" + this.selectedEmployeePosition);
  }



  onSubmit() {

    console.log(this.facultyInfo.value);

  }


  getCollege():void {
    this.adminService.fetchCollege().subscribe({
      next: (next) => this.colleges = next,
      error: (error) => console.log(error),
      complete: () => this.isLoading = false
    }
    )
  }


  column1: string[] = ["email", "phone_number", "birthdate"]
  column2: string[] = ["last_name", "first_name", "middle_name", "ext_name"]
  column3: string[] = ["region", "province", "city", "barangay"]
  column4: string[] = ["sex", "language", "citizenship", "age", "civil_status"]


}
