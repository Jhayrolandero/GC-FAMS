import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../state/faculty-state/faculty-state.reducer';
import { selectAllProfile, selectEditLoading, selectPasswordError, selectPasswordLoading } from '../../state/faculty-state/faculty-state.selector';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { CommonModule } from '@angular/common';
import { mainPort } from '../../app.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsErrorComponent } from '../../admin/manage-faculty/forms-error/forms-error.component';
import { updateInfo, updatePassword } from '../../state/faculty-state/faculty-state.actions';
import { UpdateFaculty } from '../../services/Interfaces/updateFaculty';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormComponent } from '../form/form.component';
@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [
    LoadingScreenComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ProfileFormComponent,
    FormsModule,
    ReactiveFormsModule,
    FormsErrorComponent,
    FormComponent
  ],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.css'
})
export class ManageProfileComponent {

  oldPrivSwitch: boolean = false
  privSwitch: boolean = false;
  newPrivSwitch: boolean = false
  newConfirmdoesntMatchError: string | undefined = undefined
  port = mainPort
  oldPassword: string = ""
  passwordLoading$: Observable<boolean>
  editLoading$: Observable<boolean>

  constructor(
    private profileStore: Store<{ profile: ProfileState }>,
    public dialog: MatDialog,
    private router: Router
  ) {

    this.passwordLoading$ = this.profileStore.select(selectPasswordLoading)
    this.editLoading$ = this.profileStore.select(selectEditLoading)

      this.facultyProfile$.subscribe({
        next: res => {
          this.facultyInfo.patchValue({
            first_name: res!.first_name,
            last_name: res!.last_name,
            birthdate: res!.birthdate,
            age: res!.age,
            citizenship: res!.citizenship,
            civil_status: res!.civil_status,
            sex: res!.sex,
            email: res!.email,
            phone_number: res!.phone_number,
            middle_name: res!.middle_name,
            ext_name: res!.ext_name,
            region: res!.region,
            province: res!.province,
            language: res!.language,
            city: res!.city,
            barangay: res!.barangay,
          })

          this.oldPassword = res!.password
        }
      })
  }

  facultyProfile$ = this.profileStore.select(selectAllProfile);


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


  facultyInfo = new FormGroup({
    first_name: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*')
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*')
    ]),
    birthdate: new FormControl(new Date(), [
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
    email: new FormControl({value: "", disabled:true}, [
      Validators.email],

    ),
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
  });
  // password: new FormControl<string>(''),

  goBack(){
    this.router.navigate(['admin/manage-faculty'])
  }


  openDialog(image : "cover" | "profile"): void {
    this.dialog.open(ProfileFormComponent, {
      data : {image}
    });
    }

    formControl(form:string) {
      return this.facultyInfo.get(form);
    }

    passwordFormControl(form:string) {
      return this.newPasswordInfo.get(form);
    }

    submitForm() {
    if(!this.facultyInfo.valid) return

    this.profileStore.dispatch(updateInfo({ facultyData : this.facultyInfo.value as UpdateFaculty}))
      // console.log(this.facultyInfo.valid)
    }

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
        {
        password: this.passwordFormControl('newPassword')?.value,
      }))

    }
}
