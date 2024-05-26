import { Component, EventEmitter, Inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Message } from 'postcss';
import { program } from '../../../components/admin/faculty-form/faculty-form.component';
import { Employment } from '../../../services/Interfaces/employment';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { MessageService } from '../../../services/message.service';
import { loadCollegeProfile } from '../../../state/dean-state/dean-state.actions';
import { selectAllCollege } from '../../../state/dean-state/dean-state.selector';
import { GcBoxComponent } from "../gc-box/gc-box.component";
import { LoadingScreenComponent } from "../../../components/loading-screen/loading-screen.component";
import { EmployeeTypeComponent } from "../employee-type/employee-type.component";
import { EmployeePositionComponent } from "../employee-position/employee-position.component";
import { FormsErrorComponent } from "../forms-error/forms-error.component";
import { CommonModule } from '@angular/common';
import { Faculty } from '../../../services/Interfaces/faculty';
import { mainPort } from '../../../app.component';
import { ProfileState } from '../../../state/faculty-state/faculty-state.reducer';
import { updatePassword } from '../../../state/faculty-state/faculty-state.actions';
import { Observable } from 'rxjs';
import { selectPasswordLoading } from '../../../state/faculty-state/faculty-state.selector';
import { AddressesService } from '../../../services/addresses.service';

@Component({
    selector: 'app-add-faculty',
    standalone: true,
    templateUrl: './add-faculty.component.html',
    styleUrl: './add-faculty.component.css',
    imports: [
      GcBoxComponent,
      LoadingScreenComponent,
      EmployeeTypeComponent,
      EmployeePositionComponent,
      FormsErrorComponent,
      CommonModule,
      FormsErrorComponent,
      ReactiveFormsModule
    ]
})
export class AddFacultyComponent {
  @Output() switchShowAdd = new EventEmitter();
  @Input() editData?: Faculty;
  colleges$ = this.store.select(selectAllCollege);
  editMode: boolean = false;
  passwordLoading$: Observable<boolean>

  constructor(
    private profileStore: Store<{ profile: ProfileState }>,
    private messageService: MessageService,
    public facultyService: FacultyRequestService,
    public store: Store,
    private route: ActivatedRoute,
    private router: Router,
    public address: AddressesService
  ) {
    this.passwordLoading$ = this.profileStore.select(selectPasswordLoading)
  }


  regions: any = this.address.region
  municipalities: any = this.address.municipalities
  provinces: string[] = []
  barangay: string[] = []
  goBack(){
    this.switchShowAdd.emit();
  }

  renderProvince(region: any | undefined) {
    this.provinces =  this.regions[region.target.value]
  }

  renderBrngy(municipality: any | undefined) {
    this.barangay = this.municipalities[municipality.target.value]
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.editMode = !!this.editData;
    console.log(this.editData);
    console.log(this.editMode);
    if (this.editMode) {
      this.facultyInfo.patchValue({
        first_name: this.editData?.first_name,
        last_name: this.editData?.last_name,
        birthdate: this.editData?.birthdate,
        age: this.editData?.age,
        citizenship: this.editData?.citizenship,
        civil_status: this.editData?.civil_status,
        sex: this.editData?.sex,
        email: this.editData?.email,
        teaching_level: this.editData?.teaching_level,
        phone_number: this.editData?.phone_number,
        middle_name: this.editData?.middle_name,
        ext_name: this.editData?.ext_name,
        region: this.editData?.region,
        province: this.editData?.province,
        language: this.editData?.language,
        city: this.editData?.city,
        barangay: this.editData?.barangay,
        street: this.editData?.street,
        isAdmin: this.editData?.isAdmin,
        password: this.editData?.password
      })

      this.provinces =  this.regions[this.editData!.region]
      this.barangay = this.municipalities[this.editData!.city]

      this.facultyInfo.get('email')?.disable();
      this.setCollege(this.editData!.college_ID)
      this.setEmployment(this.editData!.employment_status)
      this.setPosition(this.editData!.teaching_position)

      this.imageURL = this.editData?.profile_image !== 'null' ? this.editData?.profile_image : undefined
      this.coverURL = this.editData?.cover_image !== 'null' ? this.editData?.cover_image : undefined
      console.log(this.coverURL)
    } else {
      this.facultyInfo.get('email')?.enable();
    }
  }

  isLoading: boolean = false
  selectedCollege: number = -1;
  selectedEmployeeType: number = -1;
  selectedEmployeePosition: string = '';
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
    teaching_level: new FormControl('', [
      Validators.required
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
    street: new FormControl('', [
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
    console.log(this.facultyInfo);
    this.facultyInfo.patchValue({
      employment_status: value
    })
    this.selectedEmployeeType = value;
    if (value != 1) {
      this.selectedEmployeePosition = 'Instructor';
      // this.disabledBox = true;
      this.facultyInfo.patchValue({
        teaching_position: 'Instructor',
        isAdmin: 0,
        employment_status: 0

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
        isAdmin: 1,
        employment_status: 1
      });
    } else {
      this.facultyInfo.patchValue({
        isAdmin: 0,
        employment_status: 0
      });
    }
  }


  onSubmit() {
    if (this.editMode) {
      this.messageService.sendMessage("Editing Faculty...", 0)

      const facultyInfoData = this.facultyInfo.value;

      // Exclude profile_image and cover_image fields
      const { profile_image, cover_image, ...restOfFacultyInfo } = facultyInfoData;
      this.facultyService.patchData(restOfFacultyInfo, `faculty/${this.editData?.faculty_ID}`).subscribe({
        next: (res: any) => {
          console.log(res)
          this.messageService.sendMessage("Faculty Successfully Edited!", 1)
        },
        error: (err) => {
          console.log(err)
          this.messageService.sendMessage("An unexpected Error has occurred!", -1)
        },
        complete: () => {
          this.store.dispatch(loadCollegeProfile());
          this.goBack();
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
          // this.dialogRef.close({ added: true })
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

  newPasswordInfo = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
  })

  passwordFormControl(form:string) {
    return this.newPasswordInfo.get(form);
  }


  privSwitch: boolean = false;
  newPrivSwitch: boolean = false
  newConfirmdoesntMatchError: string | undefined = undefined
  port = mainPort

  oldPassword: string = ""

  submitPassword() {
    if(!this.newPasswordInfo.valid) return

    if(this.passwordFormControl('newPassword')?.value !== this.passwordFormControl('confirmPassword')?.value) {
      this.newConfirmdoesntMatchError = "Password doesn't match"

      this.newPasswordInfo.patchValue({
        newPassword: "",
        confirmPassword: ""
      })
      return
    }


    this.profileStore.dispatch(updatePassword(
      { password: this.passwordFormControl('newPassword')?.value, id: this.editData?.faculty_ID}))
    console.log(this.newPasswordInfo.value)
  }

}
