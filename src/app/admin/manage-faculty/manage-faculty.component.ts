import { Component, OnInit } from '@angular/core';
import { GcBoxComponent } from './gc-box/gc-box.component';
import { PersonalInfoFormComponent } from './personal-info-form/personal-info-form.component';
import { CollegeService } from '../../services/admin/college.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface college {
  'college_id': number;
  'college_name': string;
}

@Component({
  selector: 'app-manage-faculty',
  standalone: true,
  imports: [GcBoxComponent, PersonalInfoFormComponent, ReactiveFormsModule],
  providers: [CollegeService],
  templateUrl: './manage-faculty.component.html',
  styleUrl: './manage-faculty.component.css'
})


export class ManageFacultyComponent implements OnInit {

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
    college: new FormControl(''),
    department: new FormControl(''),
    position: new FormControl('')
  });

  setCollege(value: string): void {
    this.facultyInfo.patchValue({
      college: value
    });
  }

  setCourse(value: string): void {
    this.facultyInfo.patchValue({
      college: value
    });
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.facultyInfo.value);
  }
  colleges: college[] = [];

  constructor(private College: CollegeService) {}
  ngOnInit(): void {
    this.fetchCollege()
  }

  fetchCollege():void {
    this.College.fetchCollege().subscribe(
      colleges => this.colleges = colleges
    )
  }
}
