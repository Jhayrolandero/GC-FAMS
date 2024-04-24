import { Component } from '@angular/core';
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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';
import { Attendee } from '../../services/Interfaces/attendee';
import { Observable, Subscription, concatMap, from, map, mergeAll, mergeMap, of, toArray } from 'rxjs';
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
import { error } from 'console';
import * as AttendeeSelector from '../../state/attendee/attendee.selector';
import { AttendeeState } from '../../services/Interfaces/attendeeState';

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

  constructor(
    private facultyPostService: FacultyRequestService,
    public dialogRef: MatDialogRef<CommexFormComponent>,
    private store: Store<{ commexs: CommexState }>
  ) { }


  commexForm = new FormGroup({
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
  })

  attendeeForm = new FormGroup({
    commex_ID: new FormControl(0),
    faculty_ID: new FormControl(0)
  })
  // attendeeForm = new

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {

    const formData = this.facultyPostService.formDatanalize(this.commexForm);
    this.store.dispatch(CommexActions.postCommex({ commex: formData }))
    // // console.log(this.commexForm);
    // // console.log(formData.get("commex_title"))
    // this.facultyPostService.postData(formData, 'addCommex').subscribe({
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

  commexs$: Observable<CommunityExtension[]>
  latestCommex$: Observable<CommunityExtension>
  isLoading$: Observable<boolean>
  // attendeeNumber$: Observable<Dictionary<number>>
  attendeeLoading$: Observable<boolean>
  // attendeeLoading$: Observable<boolean>
  attendeesNumber: Dictionary<number> = {}
  constructor(
    private facultyService: FacultyRequestService,
    public dialog: MatDialog,
    private store: Store<{ commexs: CommexState }>,
    private attendeeStore: Store<{ attendees: AttendeeNumberState }>,
    private attendeeNameStore: Store<{ attendeesName: AttendeeState }>,
    private messageService: MessageService
  ) {

    this.attendeeLoading$ = this.attendeeStore.pipe(select(AttendeeSelector.attendeeLoadingSelector))
    this.commexs$ = this.store.pipe(select(CommexsSelector.parsedCommexSelector))
    this.isLoading$ = this.store.pipe(select(CommexsSelector.isLoadingSelector))
    this.latestCommex$ = this.store.pipe(select(CommexsSelector.latestCommexSelector))
    this.attendeeLoading$ = this.attendeeStore.pipe(select(AttendeeSelector.attendeeLoadingSelector))
    // this.attendeeNumber$ = this.attendeeStore.pipe(select(AttendeeSelector.attendeeNumberSelector))
    this.attendeeNameStore.dispatch(AttendeeActions.getAttendee({ id: 14 }))

  }

  fetchAttendeeNumber$ = (id: number) => {
    this.attendeeStore.dispatch(AttendeeActions.getAttendeeNumber({ id: id }))
  }
  ngOnInit(): void {
    this.store.dispatch(CommexActions.getCommex({ uri: 'getcommex?t=faculty' }))

    this.commexs$.pipe(
      mergeMap(commexs => from(commexs).pipe(
        map(commex => this.attendeeStore.dispatch(AttendeeActions.getAttendeeNumber({ id: commex.commex_ID })))
      ))
    ).subscribe()


    this.attendeeStore.pipe(select(AttendeeSelector.attendeeNumberSelector)).subscribe({
      next: res => {
        this.attendeesNumber = { ...this.attendeesNumber, ...res }
        console.log(res)
        console.log(this.attendeesNumber)
        console.log(this.attendeesNumber[14])
      },
      error: err => console.log(err),
      complete: () => console.log(this.attendeesNumber)
    })

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



  attendeeFetch() {
    this.commexs$
      .pipe(
        concatMap((res) =>
          from(res).pipe(
            map((val) =>
              this.attendeeStore.dispatch(AttendeeActions.getAttendeeNumber({ id: val.commex_ID }))
            )
          )
        )
      )
      .subscribe({
        error: (error) => console.log(error),
      });
  }

  attendeeFetch$ = (id: number): Subscription => {
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


  // temporary solution i will make this lazy loaded in the future
  // getCommex(view: 'college' | 'faculty'): void {

  //   let uri = ''
  //   switch (view) {
  //     case 'faculty':
  //       uri = 'getcommex?t=faculty'
  //       break
  //     case 'college':
  //       uri = 'getcommex/1?t=college'
  //       break
  //   }


  //   this.facultyService.fetchData<CommunityExtension[]>(uri).pipe(
  //     mergeAll(),
  //     mergeMap(commex => this.fetchAttendee<Response<AttendeeCount[]>>(commex.commex_ID)
  //       .pipe(map(attendee => ({ ...commex, attendee: attendee.data[0].count })))),
  //     toArray()
  //   ).subscribe({
  //     next: (res) => {

  //       switch (view) {
  //         case 'faculty':
  //           this.facultyCommexs = res
  //           break
  //         case 'college':
  //           this.collegeCommexs = res
  //           break
  //       }
  //     },
  //     error: err => console.log(err),
  //     complete: () => {

  //       switch (view) {
  //         case 'faculty':
  //           this.commexs = this.facultyCommexs
  //           break
  //         case 'college':
  //           this.commexs = this.collegeCommexs
  //           break
  //       }
  //       // this.commexs = this.facultyCommexs
  //       this.dateSorter();
  //       this.commexs.forEach(this.parseImageLink);
  //       this.isLoading = false
  //     }
  //   })
  // }

  fetchAttendee<T>(id: number): Observable<T> {
    return this.facultyService.fetchData<T>(`attendee/${id}?q=number`);
  }

  openDialog() {
    this.dialog.open(CommexFormComponent).afterClosed().subscribe(result => {
      // this.getCommex(this.switch);
      // this.checkCache()
    });
  }

  // toggleVisible(id: number) {

  //   const exist = this.attendees.some(attendee => id in attendee);

  //   if (!exist) {
  //     this.currFetch$ = this.attendeeFetch$(id)
  //   } else {
  //     this.attendee = this.attendees.find(mem => mem[id])![id]
  //   }

  //   this.isVisible = true
  //   this.activeID = id
  // }

  // toggleHide() {
  //   console.log("Unsub...")

  //   this.currFetch$.unsubscribe()


  //   this.isVisible = false
  //   this.activeID = null
  //   this.attendee = []
  //   this.isAttendeeLoading = true;
  // }

  // toggleView() {


  //   if (this.switch === 'faculty') {
  //     this.switch = 'college'

  //   } else {
  //     this.switch = 'faculty'
  //   }


  //   this.checkCache()
  // }

  // not really a cache just a copy of state
  // checkCache() {
  //   if (this.collegeCommexs.length == 0 || this.facultyCommexs.length == 0) {
  //     this.messageService.sendMessage(`Fetching ${this.switch}`, 0)
  //     this.getCommex(this.switch);
  //     return
  //   }


  //   switch (this.switch) {
  //     case 'faculty':
  //       this.commexs = this.facultyCommexs
  //       break
  //     case 'college':
  //       this.commexs = this.collegeCommexs
  //       break
  //   }
  // }
}
