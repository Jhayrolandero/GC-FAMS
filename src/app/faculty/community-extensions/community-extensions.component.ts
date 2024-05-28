import { Component, Inject } from '@angular/core';
import { CommunityExtension } from '../../services/Interfaces/community-extension';
import { OtherCommexComponent } from './other-commex/other-commex.component';
import { CommonModule, NgFor, NgIf, SlicePipe } from '@angular/common';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { mainPort } from '../../app.component';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';
import { Attendee } from '../../services/Interfaces/attendee';
import { Observable, Subscription, catchError, first, from, map, merge, mergeMap, of, take } from 'rxjs';
import { Dictionary } from '../../services/Interfaces/dictionary';
import { Response } from '../../services/Interfaces/response';
import { MessageService } from '../../services/message.service';
import { Store, select } from '@ngrx/store';
import { CommexState } from '../../services/Interfaces/commexState';
import * as CommexActions from '../../state/commex/commex.action';
import { MatStepperModule } from '@angular/material/stepper';
import * as CommexsSelector from '../../state/commex/commex.selector';
import * as AttendeeActions from '../../state/attendee/attendee.action';
import { AttendeeNumberState } from '../../services/Interfaces/attendeeNumberState';
import * as AttendeeSelector from '../../state/attendee/attendee.selector';
import { ProfileState } from '../../state/faculty-state/faculty-state.reducer';
import * as ProfileSelectors from '../../state/faculty-state/faculty-state.selector';
import { Profile } from '../../services/Interfaces/profile';
import { Faculty } from '../../services/Interfaces/faculty';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AttendedState } from '../../services/Interfaces/attendedState';
import { MatMenuModule } from '@angular/material/menu';
import { CryptoJSService } from '../../services/crypto-js.service';
import { Encryption } from '../../services/Interfaces/encryption';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-commex-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule
  ],
  templateUrl: 'commex-form.component.html',
  styleUrl: 'commex-form.component.css'
})
export class CommexFormComponent {

  mainPort: string = mainPort
  commexForm;
  commexformData: FormData
  fetchAttendee$: Observable<Faculty[]> = this.facultyService.fetchData<Encryption>("faculty").pipe(
    map(data => this.decryptData<Faculty[]>(data))
  );  // fetchAttendee$: Observable<Faculty[]> = this.facultyService.fetchData<Encryption>("faculty").pipe(of(this.decryptData<Faculty[]>(data)))
  fetchAttendeeError$: Observable<Error> = this.fetchAttendee$.pipe(catchError((err) => of(err)));
  profile$: Observable<Profile | undefined>
  postLoading$: Observable<boolean>


  constructor(
    private facultyService: FacultyRequestService,
    public dialogRef: MatDialogRef<CommexFormComponent>,
    private store: Store<{ commexs: CommexState }>,
    private profileStore: Store<{ profile: ProfileState }>,
    private commexFacultyStore: Store<{ commexs: CommexState }>,
    private _fb: FormBuilder,
    private cryptoJS: CryptoJSService
  ) {
    this.commexForm = this._fb.group({
      commex_title: new FormControl('', [
        Validators.required
      ]),
      commex_details: new FormControl('', [
        Validators.required
      ]),
      commex_header_img: new FormControl<File | null>(null),
      commex_date: new FormControl('', [
        Validators.required
      ]),
      attendees: this._fb.array([])
    })


    this.commexformData = new FormData()

    this.profile$ = this.profileStore.pipe(select(ProfileSelectors.selectAllProfile))
    this.postLoading$ = this.commexFacultyStore.pipe(select(CommexsSelector.postLoadingSelector))
  }


  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }

  onCheckChange(e: any, attendeeObj: { faculty_ID: number, college_ID: number }) {
    const formArray: FormArray = this.commexForm.get('attendees') as FormArray;

    if (e.target.checked) {
      formArray.push(new FormControl(attendeeObj));
      // Add a new control in the arrayForm
    } else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: any) => {
        if (JSON.stringify(ctrl.value) === JSON.stringify(attendeeObj)) {
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }

    this.commexformData.delete("attendees[]")


    formArray.value.forEach((val: any) => {
      this.commexformData.append("attendees[]", JSON.stringify(val))
    })

  }

  submitAttendee() {

    const formArray: FormArray = this.commexForm.get('attendees') as FormArray;
    this.commexformData = this.facultyService.formDatanalize(this.commexForm);
    formArray.value.forEach((val: any) => {
      this.commexformData.append("attendees[]", JSON.stringify(val))
    })

    this.store.dispatch(CommexActions.postCommex({ commex: this.commexformData }))
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    const formData = this.facultyService.formDatanalize(this.commexForm);
    this.store.dispatch(CommexActions.postCommex({ commex: formData }))
  }

  imageURL?: string = undefined;
  PreviewImage(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0]; // Using optional chaining to handle null or undefined

    if (file) {
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
        this.commexForm.patchValue({
          commex_header_img: file
        })
      };
      reader.readAsDataURL(file);
    }
    console.log(this.commexForm);
  }
}




@Component({
  selector: 'app-community-extensions',
  standalone: true,
  imports: [
    OtherCommexComponent,
    NgFor,
    SlicePipe,
    CommonModule,
    LoadingScreenComponent,
    CommexFormComponent,
    TooltipComponent,
    NgIf,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule  ],
  templateUrl: './community-extensions.component.html',
  styleUrl: './community-extensions.component.css'
})
export class CommunityExtensionsComponent {

  constructor(
    private facultyService: FacultyRequestService,
    public dialog: MatDialog,
    private commexFacultyStore: Store<{ commexs: CommexState }>,
    private attendeeStore: Store<{ attendees: AttendeeNumberState }>,
    private attendedStore: Store<{ attended: AttendedState }>,
    private commexCollegeStore: Store<{ collegeCommexs: CommexState }>,
    private profileStore: Store<{ profile: ProfileState }>,
    private cryptoJS: CryptoJSService,
  ) {

    this.attendeeLoading$ = this.attendeeStore.pipe(select(AttendeeSelector.attendeeLoadingSelector))
    this.commexs$ = this.commexFacultyStore.pipe(select(CommexsSelector.parsedCommexSelector)),
    this.isLoading$ = this.commexFacultyStore.pipe(select(CommexsSelector.isLoadingSelector))
    this.latestCommex$ = this.commexFacultyStore.pipe(select(CommexsSelector.latestCommexSelector))
    this.profileCollege$ = this.profileStore.pipe(select(ProfileSelectors.selectAllProfile))
    this.isAttendedLoading$ = this.attendedStore.pipe(select(AttendeeSelector.attendedLoadingSelector))
    this.isProfileLoading$ = this.profileStore.pipe(select(ProfileSelectors.selectProfileLoading))
    this.attended$ = this.attendedStore.pipe(select(AttendeeSelector.attendedSelector))
  }

  commexs$: Observable<CommunityExtension[]>

  latestCommex$: Observable<CommunityExtension | null>
  isLoading$: Observable<boolean>
  isAttendedLoading$: Observable<boolean>
  isProfileLoading$: Observable<boolean>
  attendeeLoading$: Observable<boolean>
  attendeesNumber: Dictionary<number> = {}
  attended$: Observable<Dictionary<number>>;
  // attended: Dictionary<number> = {}
  profileCollege$: Observable<Profile | undefined>
  profileCollegeID: number = 0
  profileFacultyID: number = 0

  fetchAttendeeNumber$ = (id: number) => {
    this.attendeeStore.dispatch(AttendeeActions.getAttendeeNumber({ id: id }))
  }

  ngOnInit(): void {

    this.attendeeNumberFetch()
    // Switch the view depending on state
    if (this.switch === "faculty") {
      this.commexs$ = this.commexFacultyStore.pipe(select(CommexsSelector.parsedCommexSelector))
    } else {
      this.commexs$ = this.commexCollegeStore.pipe(select(CommexsSelector.parsedCollegeCommexSelector))
    }
  }
  tempPort = mainPort;
  isAttendeeLoading: boolean = true;
  formToggle: boolean = false;
  collegeCommexs: CommunityExtension[] = [];
  facultyCommexs: CommunityExtension[] = [];
  attendees: Dictionary<Attendee[]> = {}
  attendee: Attendee[] = []
  isVisible: boolean = false
  activeID: number | null = null
  switch: 'faculty' | 'college' = 'faculty';
  startDate: string = ''
  endDate: string = ''

  attendeeNumberFetch(): Subscription {
    this.commexs$.pipe(
      mergeMap(commexs => from(commexs).pipe(
        map(commex => this.attendeeStore.dispatch(AttendeeActions.getAttendeeNumber({ id: commex.commex_ID })))
      ))
    ).subscribe()

    return this.attendeeStore.pipe(select(AttendeeSelector.attendeeNumberSelector)).subscribe({
      next: res => {
        this.attendeesNumber = { ...this.attendeesNumber, ...res }
      },
      error: err => console.log(err),
      complete: () => console.log(this.attendeesNumber)
    })
  }

  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }

  attendeeNameFetch$ = (id: number): Subscription => {
    return this.facultyService.fetchData<Encryption>(`attendee/${id}`).subscribe({
      next: res => {
        this.attendees = ({
          ...this.attendees,
          [id]: this.decryptData<Response<Attendee[]>>(res).data
        })
      },
      error: err => console.log(err),
      complete: () => {
        this.attendee = this.attendees[id]
        this.isAttendeeLoading = false
        console.log(this.attendees)
      }
    });
  }

  fetchAttendee<T>(id: number): Observable<T> {
    return this.facultyService.fetchData<T>(`attendee/${id}?q=number`);
  }

  openDialog() {
    this.dialog.open(CommexFormComponent).afterClosed().subscribe(result => {
      // this.getCommex(this.switch);
      // this.checkCache()
    });
  }

  currFetch$!: Subscription
  toggleVisible(id: number) {

    const exist = this.attendees.hasOwnProperty(id);

    if (!exist) {
      this.currFetch$ = this.attendeeNameFetch$(id)
    } else {
      this.attendee = this.attendees[id]
    }

    this.isVisible = true
    this.activeID = id
  }


  toggleHide() {
    this.currFetch$.unsubscribe()
    this.isVisible = false
    this.activeID = null
    this.attendee = []
    this.isAttendeeLoading = true;
  }

  toggleView() {
    if (this.switch === 'faculty') {
      this.switch = 'college'

      this.profileCollege$.pipe(first()).subscribe(
        () => {
          this.commexCollegeStore.dispatch(CommexActions.getCollegeCommex({ uri: `getcommex/?t=college`, refresh: false }))
        }
      )
      this.commexs$ = this.commexCollegeStore.pipe(select(CommexsSelector.parsedCollegeCommexSelector))
      this.isLoading$ = this.commexCollegeStore.pipe(select(CommexsSelector.isLoadingCollegeCommexSelector))
      this.latestCommex$ = this.commexCollegeStore.pipe(select(CommexsSelector.latestCollegeCommexSelector))
      this.attendeeNumberFetch()
      // this.attendedFetch()
    } else {
      this.switch = 'faculty'
      // this.store.dispatch(CommexActions.getCommex());
      this.commexs$ = this.commexFacultyStore.pipe(select(CommexsSelector.parsedCommexSelector))
      this.isLoading$ = this.commexFacultyStore.pipe(select(CommexsSelector.isLoadingSelector))
      this.latestCommex$ = this.commexFacultyStore.pipe(select(CommexsSelector.latestCommexSelector))
    }
  }


  setStartDate(date: Date) {
    const stringified = JSON.stringify(date);
    const dob = stringified.substring(1, 11);
    this.startDate = dob
    this.filterCommexSelection()
  }


  setEndDate(date: Date) {
    const stringified = JSON.stringify(date);
    const dob = stringified.substring(1, 11);
    this.endDate = dob
    this.filterCommexSelection()
  }

  filterCommexSelection() {

    if (!this.startDate || !this.endDate) return

    switch (this.switch) {
      case "college":
        this.commexs$ = this.commexCollegeStore.pipe(select(CommexsSelector.filterCollegeCommexSelector(this.startDate, this.endDate)))
        break;
      case "faculty":
        this.commexs$ = this.commexFacultyStore.pipe(select(CommexsSelector.filterCommexSelector(this.startDate, this.endDate)))
        break;
    }
  }

  leaveCommex(commex_ID: number) {
    this.attendeeStore.dispatch(AttendeeActions.leaveCommex({ commex_ID: commex_ID}))
    // reset the attendees to fetch new
    // this.store.dispatch(CommexActions.getCommex());
  }

  attendCommex(commex_ID: number, commex: CommunityExtension) {
    console.log("Nay")
    const attendCommex = new FormData()

    let faculty_ID = undefined
    this.profileCollege$.pipe(take(1)).subscribe(
      res => {
        faculty_ID = res?.faculty_ID
        // this.commexCollegeStore.dispatch(CommexActions.getCollegeCommex({ uri: `getcommex/${res?.college_ID}?t=college` }))
      }
    )
    const attendeeForm = { commex_ID, faculty_ID }


    attendCommex.append("attendees[]", JSON.stringify(attendeeForm))


    this.attendeeStore.dispatch(AttendeeActions.joinCommex({
      commex_ID: commex_ID,
      formData: attendCommex,
      commex: this.removeHTTP(commex, mainPort)
    }))
    // reset the attendees to fetch new
  }

  // Band aid function just to remove the http://

  removeHTTP(commex : CommunityExtension, mainPort: string) {
    const commexCopy = {...commex}
    return {
      ...commexCopy,
      commex_header_img: commexCopy.commex_header_img.replace(mainPort, '')
    }
    }


  openConfirm(commex_ID: number): void {
    this.dialog.open(ConfirmDeleteComponent, {
      data: { commex_ID, view: this.switch },
    });
  }
}



@Component({
  selector: 'confirm-delete',
  templateUrl: 'confirm-delete.component.html',
  styleUrl: 'confirm-delete.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule
  ],
})

export class ConfirmDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private commexFacultyStore: Store<{ commexs: CommexState }>,
    private commexCollegeStore: Store<{ collegeCommexs: CommexState }>,
    @Inject(MAT_DIALOG_DATA) public data: { commex_ID: number, view: 'college' | 'faculty' }) {
  }

  isLoading$: Observable<boolean> = this.data.view === 'college' ? this.commexCollegeStore.select(CommexsSelector.deleteCollegeLoadingSelector) : this.commexFacultyStore.select(CommexsSelector.deleteLoadingSelector)

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteCommex() {
    this.commexFacultyStore.dispatch(CommexActions.deleteCommex({ commex_ID: this.data.commex_ID, view: this.data.view }))
    this.onNoClick();
  }
}
