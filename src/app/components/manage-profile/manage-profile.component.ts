import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../state/faculty-state/faculty-state.reducer';
import { selectAllProfile } from '../../state/faculty-state/faculty-state.selector';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { CommonModule } from '@angular/common';
import { mainPort } from '../../app.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [
    LoadingScreenComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ProfileFormComponent
  ],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.css'
})
export class ManageProfileComponent {

  port = mainPort
  constructor(
    private profileStore: Store<{ profile: ProfileState }>,
    public dialog: MatDialog
  ) {}

  public facultyProfile$ = this.profileStore.select(selectAllProfile);


  facultyInfo = new FormGroup({
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
    password: new FormControl<string>(''),
  });

  openDialog(image : "cover" | "profile"): void {
    this.dialog.open(ProfileFormComponent, {
      data : {image}
    });
    }
}
