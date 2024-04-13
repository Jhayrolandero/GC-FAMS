import { Component, OnInit } from '@angular/core';
import { CommunityExtension } from '../../services/Interfaces/community-extension';
import { OtherCommexComponent } from './other-commex/other-commex.component';
import { CommonModule, NgFor, NgIf, SlicePipe } from '@angular/common';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { mainPort } from '../../app.component';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
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
import { Subscription } from 'rxjs';
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
  imports: [OtherCommexComponent, NgFor, SlicePipe, CommonModule, LoadingScreenComponent, CommexFormComponent, TooltipComponent, NgIf],
  templateUrl: './community-extensions.component.html',
  styleUrl: './community-extensions.component.css'
})
export class CommunityExtensionsComponent {
  tempPort = mainPort;
  isLoading: boolean = true;
  isAttendeeLoading: boolean = true;
  formToggle: boolean = false;
  commexs: CommunityExtension[] = [];
  attendees: Attendee[] = []
  isVisible: boolean = false
  activeID: number | null = null
  attendeeFetch!: Subscription
  constructor(private facultyService: FacultyRequestService, public dialog: MatDialog,) {
    this.getCommex();
  }

  getCommex(): void {
    this.facultyService.fetchData(this.commexs, 'getcommex/fetchCommex').subscribe({
      next: (next) => this.commexs = next,
      error: (error) => console.log(error),
      complete: () => {
        this.dateSorter();
        this.commexs.forEach(this.parseImageLink);
        this.isLoading = false
      }
    });
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
    const dialogRef = this.dialog.open(CommexFormComponent).afterClosed().subscribe(result => {
      this.getCommex();
    });
  }


  toggleVisible(id: number) {
    this.isVisible = true

    this.attendeeFetch = this.facultyService.fetchData(this.attendees, `attendee/${id}`).subscribe({
      next: (res: any) => {
        if (res.code == 200) {
          this.attendees = res.data
        }
      },
      error: (error) => console.log(error),
      complete: () => {
        this.isAttendeeLoading = false;
      }
    })

    this.activeID = id
  }

  toggleHide() {
    this.isVisible = false
    this.activeID = null
    this.attendees = []
    this.isAttendeeLoading = true;
    this.attendeeFetch.unsubscribe()
  }
}
