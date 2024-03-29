import { Component, OnInit, WritableSignal, signal } from '@angular/core';
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
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { error } from 'console';
import { Message } from '../../services/Interfaces/message';
import { MessageComponent } from '../../components/message/message.component';
import { MessageService } from '../../services/message.service';
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
    FormsErrorComponent,
    MessageComponent],
  templateUrl: './manage-faculty.component.html',
  styleUrl: './manage-faculty.component.css'
})


export class ManageFacultyComponent implements OnInit {

  constructor(
    private adminService: AdminFetcherService,
    // private facultyService: FacultyPostService,
    // private messageService: MessageService) {}
    private facultyService: FacultyRequestService) {}

    ngOnInit(): void {
      this.getCollege()
    }

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

    if(value === 'Dean' || value === 'Coordinator') {
      this.facultyInfo.patchValue({
        isAdmin: 1
      });
    } else {
      this.facultyInfo.patchValue({
        isAdmin: 0
      });
    }
  }

  // messages = this.messageService.messages

  onSubmit() {
    this.message = {
      message: "Adding Faculty",
      status: 0
    }
this.facultyInfo.patchValue({
      password: this.facultyInfo.get('first_name')?.value
    })
    const formData = this.facultyService.formDatanalize(this.facultyInfo);

    this.facultyService.postData(formData, "faculty").subscribe({
      next: (res : any) => {
        if (res.code == 200) {
          this.message = {
            message: "New Faculty member has been added",
            status: 1
          }

        } else if (res.code == 406) {
          this.message = {
            message: "Email is already taken!",
            status: -1
          }

        } else {
          this.message = {
            message: "An unexpected Error has occurred!",
            status: -1
          }

        }
      },
      error: (error) => {
        console.log(error)
        this.message = {
          message: "An unexpected Error has occurred!",
          status: -1
        }
      }
    })
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

  imageFile?: {link: string, file: any, name: string};
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

        if(type === 'profile'){
          console.log("Changed Profile");
          reader.onload = () => {
              this.imageURL = reader.result as string;
              this.facultyInfo.patchValue({
                profile_image: file
              })
          };
        }
        else if(type === 'cover'){
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
      this.message = {
        message: "File type should be .png or .jpeg/.jpg",
        status: -1
      }
      console.log("File type should be .png or .jpeg/.jpg");
      // this.messageService.sendMessage("File type should be .png or .jpeg/.jpg", -1)
      // this.messages.set(this.messageService.messageArr)
    }
}

}
