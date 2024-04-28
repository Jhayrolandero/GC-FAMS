import { Component, NgZone } from '@angular/core';
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
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';
import { Attendee } from '../../services/Interfaces/attendee';
import { Observable, Subscription, catchError, concatMap, first, from, map, merge, mergeAll, mergeMap, of, tap, toArray } from 'rxjs';
import { Dictionary } from '../../services/Interfaces/dictionary';
import { Response } from '../../services/Interfaces/response';
import { AttendeeCount } from '../../services/Interfaces/attendeeCount';
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
  fetchAttendee$: Observable<Faculty[]> = this.facultyService.fetchData<Faculty[]>("faculty");
  fetchAttendeeError$: Observable<Error> = this.fetchAttendee$.pipe(catchError((err) => of(err)));
  profile$: Observable<Profile>
  postLoading$: Observable<boolean>
  constructor(
    private facultyService: FacultyRequestService,
    public dialogRef: MatDialogRef<CommexFormComponent>,
    private store: Store<{ commexs: CommexState }>,
    private profileStore: Store<{ profile: ProfileState }>,
    private commexFacultyStore: Store<{ commexs: CommexState }>,
    private _fb: FormBuilder
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

  onCheckChange(e: any, attendeeObj: { faculty_ID: number, college_ID: number }) {
    const formArray: FormArray = this.commexForm.get('attendees') as FormArray;

    if (e.target.checked) {
      formArray.push(new FormControl(attendeeObj));
      // Add a new control in the arrayForm
    } else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: any) => {
        if (JSON.stringify(ctrl.value) === JSON.stringify(attendeeObj)) {
          // Remove the unselected element from the arrayForm
          console.log("removed");
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

    console.log(this.commexformData.getAll("attendees[]"))
  }

  submitAttendee() {

    const formArray: FormArray = this.commexForm.get('attendees') as FormArray;


    console.log(
      this.commexForm.controls['attendees'].value
    )

    this.commexformData = this.facultyService.formDatanalize(this.commexForm);


    formArray.value.forEach((val: any) => {
      this.commexformData.append("attendees[]", JSON.stringify(val))
    })

    this.store.dispatch(CommexActions.postCommex({ commex: this.commexformData }))
  }


  // commexForm = new FormGroup({
  //   commex_title: new FormControl('', [
  //     Validators.required
  //   ]),
  //   commex_details: new FormControl('', [
  //     Validators.required
  //   ]),
  //   commex_header_img: new FormControl<File | null>(null),
  //   commex_date: new FormControl('', [
  //     Validators.required
  //   ]),
  // })



  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {

    const formData = this.facultyService.formDatanalize(this.commexForm);
    this.store.dispatch(CommexActions.postCommex({ commex: formData }))
    // // console.log(this.commexForm);
    // // console.log(formData.get("commex_title"))
    // this.facultyService.postData(formData, 'addCommex').subscribe({
    //   next: (next: any) => { console.log(next); },
    //   error: (error) => { console.log(error) },
    //   complete: () => { this.onNoClick(); }
    // });
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
  imports: [OtherCommexComponent,
    NgFor,
    SlicePipe,
    CommonModule,
    LoadingScreenComponent,
    CommexFormComponent,
    TooltipComponent,
    NgIf,
    FormsModule],
  templateUrl: './community-extensions.component.html',
  styleUrl: './community-extensions.component.css'
})
export class CommunityExtensionsComponent {

  constructor(
    private facultyService: FacultyRequestService,
    public dialog: MatDialog,
    private commexFacultyStore: Store<{ commexs: CommexState }>,
    private attendeeStore: Store<{ attendees: AttendeeNumberState }>,
    private commexCollegeStore: Store<{ collegeCommexs: CommexState }>,
    private profileStore: Store<{ profile: ProfileState }>,
    private messageService: MessageService
  ) {

    this.attendeeLoading$ = this.attendeeStore.pipe(select(AttendeeSelector.attendeeLoadingSelector))
    this.commexs$ = merge(
      this.commexFacultyStore.pipe(select(CommexsSelector.parsedCommexSelector)),
      this.commexCollegeStore.pipe(select(CommexsSelector.parsedCollegeCommexSelector))
    )
    this.isLoading$ = this.commexFacultyStore.pipe(select(CommexsSelector.isLoadingSelector))
    this.latestCommex$ = this.commexFacultyStore.pipe(select(CommexsSelector.latestCommexSelector))
    this.profileCollege$ = this.profileStore.pipe(select(ProfileSelectors.selectAllProfile))
  }
  commexs$: Observable<CommunityExtension[]>
  latestCommex$: Observable<CommunityExtension>
  isLoading$: Observable<boolean>
  attendeeLoading$: Observable<boolean>
  attendeesNumber: Dictionary<number> = {}
  profileCollege$: Observable<Profile>

  fetchAttendeeNumber$ = (id: number) => {
    this.attendeeStore.dispatch(AttendeeActions.getAttendeeNumber({ id: id }))
  }
  ngOnInit(): void {
    this.commexFacultyStore.dispatch(CommexActions.getCommex({ uri: 'getcommex?t=faculty' }))


    // this.commexCollegeStore.dispatch(CommexActions.getCollegeCommex({ uri: `getcommex/${}?t=college` }))

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
  attendees: Dictionary<Attendee[]>[] = []
  attendee: Attendee[] = []
  isVisible: boolean = false
  activeID: number | null = null
  switch: 'faculty' | 'college' = 'faculty';


  attendeeNumberFetch(): Subscription {

    console.log("Halo :D")

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



  attendeeNameFetch$ = (id: number): Subscription => {
    return this.facultyService.fetchData<Response<Attendee[]>>(`attendee/${id}`).subscribe({
      next: res => this.attendees.push({ [id]: res.data }),
      error: err => console.log(err),
      complete: () => {
        this.attendee = this.attendees.find(mem => mem[id])![id]
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

    const exist = this.attendees.some(attendee => id in attendee);

    if (!exist) {
      this.currFetch$ = this.attendeeNameFetch$(id)
    } else {
      this.attendee = this.attendees.find(mem => mem[id])![id]
    }

    this.isVisible = true
    this.activeID = id
  }

  toggleHide() {
    console.log("Unsub...")
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
        res => {
          this.commexCollegeStore.dispatch(CommexActions.getCollegeCommex({ uri: `getcommex/${res.college_ID}?t=college` }))
        }
      )
      this.commexs$ = this.commexCollegeStore.pipe(select(CommexsSelector.parsedCollegeCommexSelector))
      this.isLoading$ = this.commexCollegeStore.pipe(select(CommexsSelector.isLoadingCollegeCommexSelector))
      this.latestCommex$ = this.commexCollegeStore.pipe(select(CommexsSelector.latestCollegeCommexSelector))
      this.attendeeNumberFetch()
    } else {
      this.switch = 'faculty'
      this.commexs$ = this.commexFacultyStore.pipe(select(CommexsSelector.parsedCommexSelector))
      this.isLoading$ = this.commexFacultyStore.pipe(select(CommexsSelector.isLoadingSelector))
      this.latestCommex$ = this.commexFacultyStore.pipe(select(CommexsSelector.latestCommexSelector))
    }
  }

}
