import { Component, OnInit } from '@angular/core';
import { AdminFetcherService } from '../../../services/admin/admin-fetcher.service';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { MessageService } from '../../../services/message.service';
import { College } from '../../../services/Interfaces/college';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Message } from 'postcss';
import { GcBoxComponent } from "../../../admin/manage-faculty/gc-box/gc-box.component";
import { EmployeeTypeComponent } from "../../../admin/manage-faculty/employee-type/employee-type.component";
import { EmployeePositionComponent } from "../../../admin/manage-faculty/employee-position/employee-position.component";
import { CommonModule } from '@angular/common';
import { FormsErrorComponent } from "../../../admin/manage-faculty/forms-error/forms-error.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Employment } from '../../../services/Interfaces/employment';
import { LoadingScreenComponent } from '../../loading-screen/loading-screen.component';
export interface program {

  map(arg0: (item: any) => any): any;
  'program_id': number;
  'college_id': number;
  'program_name': string;
  'program_abbv': string;
  'bgColor': string;
  'imgPath': string;
}

@Component({
  selector: 'app-faculty-form',
  standalone: true,
  templateUrl: './faculty-form.component.html',
  styleUrl: './faculty-form.component.css',
  imports: [
    GcBoxComponent,
    EmployeeTypeComponent,
    EmployeePositionComponent,
    CommonModule,
    FormsErrorComponent,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    LoadingScreenComponent
  ]
})
export class FacultyFormComponent implements OnInit {
  constructor(
    private adminService: AdminFetcherService,
    private messageService: MessageService,
    private facultyService: FacultyRequestService) { }

  ngOnInit(): void {
    this.getCollege()
  }

  isLoading: boolean = true
  selectedCollege: number = -1;
  selectedEmployeeType: number = -1;
  selectedEmployeePosition: string = '';
  // disabledBox: boolean = false;
  employmentStatus: Employment[] = [
    { 'employmentType': 'Part-Time', 'empStatus': 0 },
    { 'employmentType': 'Full-Time', 'empStatus': 1 },
  ]

  positions: string[] = [
    "Dean", "Coordinator", "Instructor"
  ]

  colleges: College[] = [];
  programs: program[] = [];

  facultyInfo = new FormGroup({
    college_ID: new FormControl<number | null>(null, [
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
      Validators.pattern('^[0-9]+$')
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
      Validators.pattern('^[0-9]+$')
    ]),
    middle_name: new FormControl('', [
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
    profile_image: new FormControl<File | null>(null),
    cover_image: new FormControl<File | null>(null),
    password: new FormControl<string>(''),
    isAdmin: new FormControl(0)
  });


  formControl(name: string) {
    return this.facultyInfo.get(name)
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
    if (value != 1) {
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

    if (this.selectedEmployeePosition != '') {
      this.selectedEmployeeType = 1;
    }

    if (value === 'Dean' || value === 'Coordinator') {
      this.facultyInfo.patchValue({
        isAdmin: 1
      });
    } else {
      this.facultyInfo.patchValue({
        isAdmin: 0
      });
    }
  }


  onSubmit() {
    this.messageService.sendMessage("Adding Faculty...", 0)

    //Assign first name as password
    this.facultyInfo.patchValue({
      password: this.facultyInfo.get('first_name')?.value
    })
    console.log(this.facultyInfo);

    //Convert to formdata
    const formData = this.facultyService.formDatanalize(this.facultyInfo);

    this.facultyService.postData(formData, "faculty").subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.messageService.sendMessage("New Faculty member has been added", 1)
        } else if (res.code == 406) {
          this.messageService.sendMessage("Email already taken!", -1)
        } else {
          this.messageService.sendMessage("An unexpected Error has occurred!", -1)
        }
      },
      error: (error) => {
        console.log(error)
        this.messageService.sendMessage("An unexpected Error has occurred!", -1)
      }
    })
  }


  getCollege(): void {
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

  imageFile?: { link: string, file: any, name: string };
  imageURL: string = '';
  coverURL: string = '';
  message?: Message
  PreviewImage(event: Event, type: string) {

    const allowedFileType = ["image/png", "image/jpeg"]
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0]; // Using optional chaining to handle null or undefined

    // console.log(file.)
    if (file && allowedFileType.includes(file.type)) {
      // File Preview
      const reader = new FileReader();

      if (type === 'profile') {
        console.log("Changed Profile");
        reader.onload = () => {
          this.imageURL = reader.result as string;
          this.facultyInfo.patchValue({
            profile_image: file
          })
        };
      }
      else if (type === 'cover') {
        console.log("Changed Cover");
        reader.onload = () => {
          this.coverURL = reader.result as string;
          this.facultyInfo.patchValue({
            cover_image: file
          })
        };
      }
      reader.readAsDataURL(file);
    } else {
      this.messageService.sendMessage("File type should be .png or .jpeg/.jpg", -1)
    }
  }

}
