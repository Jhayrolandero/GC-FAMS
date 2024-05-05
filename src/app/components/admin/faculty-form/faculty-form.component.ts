import { Component, Inject, OnInit, Renderer2, ElementRef, EventEmitter, Output } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Employment } from '../../../services/Interfaces/employment';
import { LoadingScreenComponent } from '../../loading-screen/loading-screen.component';
import { Faculty } from '../../../services/Interfaces/faculty';
import { forkJoin } from 'rxjs';
import { text } from 'stream/consumers';
import { Store } from '@ngrx/store';
import { selectAllCollege } from '../../../state/dean-state/dean-state.selector';
import { loadCollegeProfile } from '../../../state/dean-state/dean-state.actions';
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

  @Output() newItemEvent = new EventEmitter();
  colleges$ = this.store.select(selectAllCollege);

  constructor(
    private adminService: AdminFetcherService,
    private messageService: MessageService,
    public facultyService: FacultyRequestService,
    private dialogRef: MatDialogRef<FacultyFormComponent>,
    public store: Store,
    @Inject(MAT_DIALOG_DATA) public data?: { faculty: Faculty }) {
    this.editMode = !!data?.faculty
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.facultyInfo.patchValue({
        first_name: this.data!.faculty.first_name,
        last_name: this.data!.faculty.last_name,
        birthdate: this.data!.faculty.birthdate,
        age: this.data!.faculty.age,
        citizenship: this.data!.faculty.citizenship,
        civil_status: this.data!.faculty.civil_status,
        sex: this.data!.faculty.sex,
        email: this.data!.faculty.email,
        phone_number: this.data!.faculty.phone_number,
        middle_name: this.data!.faculty.middle_name,
        ext_name: this.data!.faculty.ext_name,
        region: this.data!.faculty.region,
        province: this.data!.faculty.province,
        language: this.data!.faculty.language,
        city: this.data!.faculty.city,
        barangay: this.data!.faculty.barangay,
        isAdmin: this.data!.faculty.isAdmin,
        password: this.data!.faculty.password
      })

      this.facultyInfo.get('email')?.disable();
      this.setCollege(this.data!.faculty.college_ID)
      this.setEmployment(this.data!.faculty.employment_status)
      this.setPosition(this.data!.faculty.teaching_position)

      this.imageURL = this.data!.faculty.profile_image !== 'null' ? this.data!.faculty.profile_image : undefined
      this.coverURL = this.data!.faculty.cover_image !== 'null' ? this.data!.faculty.cover_image : undefined
      // console.log(this.data!.faculty)
      console.log(this.coverURL)
    } else {
      console.log(this.coverURL)
      console.log(typeof undefined)
      this.facultyInfo.get('email')?.enable();
    }
  }

  editMode: boolean = false;
  isLoading: boolean = false
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
    age: new FormControl<string | number>('', [
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
      Validators.email],

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
      this.selectedEmployeePosition = 'Instructor';
      // this.disabledBox = true;
      this.facultyInfo.patchValue({
        teaching_position: 'Instructor'
      })
    }
  }

  setPosition(value: string): void {
    this.facultyInfo.patchValue({
      teaching_position: value
    });
    this.selectedEmployeePosition = value;
    console.log(this.selectedEmployeePosition)
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
    if (this.editMode) {
      this.messageService.sendMessage("Editing Faculty...", 0)

      const facultyInfoData = this.facultyInfo.value;

      // Exclude profile_image and cover_image fields
      const { profile_image, cover_image, ...restOfFacultyInfo } = facultyInfoData;
      this.facultyService.patchData(restOfFacultyInfo, `faculty/${this.data!.faculty.faculty_ID}`).subscribe({
        next: (res: any) => {
          console.log(res)
          this.messageService.sendMessage("Faculty Successfully Edited!", 1)
        },
        error: (err) => {
          console.log(err)
          this.messageService.sendMessage("An unexpected Error has occurred!", -1)
        },
        complete: () => {
          this.dialogRef.close({ edited: true })
        }
      })
    } else {
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
        },
        complete: () => {
          this.store.dispatch(loadCollegeProfile());
          this.dialogRef.close({ added: true })
        }
      })
    }
  }


  column1: string[] = ["email", "phone_number", "birthdate"]
  column2: string[] = ["last_name", "first_name", "middle_name", "ext_name"]
  column3: string[] = ["region", "province", "city", "barangay"]
  column4: string[] = ["sex", "language", "citizenship", "age", "civil_status"]

  imageFile?: { link: string, file: any, name: string };
  imageURL: string | undefined = undefined;
  coverURL: string | undefined = undefined;
  message?: Message


  PreviewImage(event: Event, type: string) {

    const allowedFileType = ["image/png", "image/jpeg"]
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0]; // Using optional chaining to handle null or undefined

    if (file && allowedFileType.includes(file.type)) {
      // File Preview
      const reader = new FileReader();

      switch (type) {
        case 'profile':
          this.setProfile(reader, file);
          console.log(file)
          console.log(reader.result)
          break
        case 'cover':
          this.setCover(reader, file)
          break
      }
      reader.readAsDataURL(file);
    } else {
      this.messageService.sendMessage("File type should be .png or .jpeg/.jpg", -1)
    }
  }


  setProfile(reader: FileReader, file: File | undefined) {
    reader.onload = () => {
      this.imageURL = reader.result as string;
      this.facultyInfo.patchValue({
        profile_image: file
      })
    };
  }

  setCover(reader: FileReader, file: File | undefined) {
    reader.onload = () => {
      this.coverURL = reader.result as string;
      this.facultyInfo.patchValue({
        cover_image: file
      })
    };
  }

}
