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
import { Observable, Subscription, map, mergeAll, mergeMap, toArray } from 'rxjs';
import { Dictionary } from '../../services/Interfaces/dictionary';
import { Response } from '../../services/Interfaces/response';
import { AttendeeCount } from '../../services/Interfaces/attendeeCount';
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
  ],
  templateUrl: 'commex-form.component.html',
  styleUrl: 'commex-form.component.css'
})
export class CommexFormComponent {

  constructor(private facultyPostService: FacultyRequestService,
    public dialogRef: MatDialogRef<CommexFormComponent>,
  ) { }

  commexForm = new FormGroup({
    commex_title: new FormControl(''),
    commex_details: new FormControl(''),
    commex_header_img: new FormControl<File | null>(null),
    commex_date: new FormControl(''),
  })

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    // console.log(this.commexForm);
    const formData = this.facultyPostService.formDatanalize(this.commexForm);
    // console.log(formData.get("commex_title"))
    this.facultyPostService.postData(formData, 'addCommex').subscribe({
      next: (next: any) => { console.log(next); },
      error: (error) => { console.log(error) },
      complete: () => { this.onNoClick(); }
    });
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
  constructor(private facultyService: FacultyRequestService, public dialog: MatDialog) { }

  tempPort = mainPort;
  isLoading: boolean = true;
  isAttendeeLoading: boolean = true;
  formToggle: boolean = false;
  commexs: CommunityExtension[] = [];
  collegeCommexs: CommunityExtension[] = [];
  facultyCommexs: CommunityExtension[] = [];
  attendees: Dictionary<Attendee[]>[] = []
  attendee: Attendee[] = []
  isVisible: boolean = false
  activeID: number | null = null
  mainPort: string = mainPort;
  switch: 'faculty' | 'college' = 'faculty';

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

  currFetch$!: Subscription

  ngOnInit(): void {
    this.getCommex();
  }
  // temporary solution i will make this lazy loaded in the future
  getCommex(): void {
    this.facultyService.fetchData<CommunityExtension[]>('getcommex?t=faculty').pipe(
      mergeAll(),
      mergeMap(commex => this.fetchAttendee<Response<AttendeeCount[]>>(commex.commex_ID)
        .pipe(map(attendee => ({ ...commex, attendee: attendee.data[0].count })))),
      toArray()
    ).subscribe({
      next: (res) => {
        this.commexs = res
        // console.log(res)
      },
      error: err => console.log(err),
      complete: () => {
        this.dateSorter();
        this.commexs.forEach(this.parseImageLink);
        this.isLoading = false
      }
    })
  }

  fetchAttendee<T>(id: number): Observable<T> {
    return this.facultyService.fetchData<T>(`attendee/${id}?q=number`);
  }

  //Adds mainPort to all header image links.
  parseImageLink(i: CommunityExtension) {
    i.commex_header_img = mainPort + i.commex_header_img;
  }

  dateSorter() {
    this.commexs.sort(function (a, b) {
      return new Date(b.commex_date).valueOf() - new Date(a.commex_date).valueOf();
    })
    console.log(this.commexs);
  }

  openDialog() {
    this.dialog.open(CommexFormComponent).afterClosed().subscribe(result => {
      this.getCommex();
    });
  }

  toggleVisible(id: number) {

    const exist = this.attendees.some(attendee => id in attendee);

    if (!exist) {
      this.currFetch$ = this.attendeeFetch$(id)
    } else {
      this.attendee = this.attendees.find(mem => mem[id])![id]
    }

    // // this.attendee = this.attendees.map(attendee => attendee[id])[0]
    // // console.log(this.attendees.map(attendee => attendee[id]))
    // console.log(this.attendees.find(mem => mem[id]));
    // // console.log(this.attendee)
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
    } else {
      this.switch = 'faculty'
    }

    console.log(this.switch)
  }
}
