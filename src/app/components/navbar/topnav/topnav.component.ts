import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { mainPort } from '../../../app.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { selectAllProfile } from '../../../state/faculty-state/faculty-state.selector';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../services/auth.service';
import { flushCollege } from '../../../state/dean-state/dean-state.actions';
import { flushCollegeCommexState, flushCommexState } from '../../../state/commex/commex.action';
import { flushProfileState } from '../../../state/faculty-state/faculty-state.actions';
import { FlushAttended, FlushAttendee, FlushAttendeeNumber } from '../../../state/attendee/attendee.action';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css'
})
export class TopnavComponent {
  dropToggle = false;
  isLoading: boolean = false;
  port = mainPort
  public facultyProfile$ = this.store.select(selectAllProfile);


  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router) { }

  triggerToggle() {
    this.setToggle.emit();
  }

  openDialog(): void {
    this.router.navigate(['/']);
    // console.log("Checking dialogue");
    // this.dialog.open(TopnavLogout);
  }

  @Output() setToggle = new EventEmitter<string>();

}

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule],
  templateUrl: './topnav.logout.html'
})
export class TopnavLogout {
  authService = inject(AuthService);
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<TopnavLogout>,
    private store: Store
  ) { }
  logout() {

    this.store.dispatch(flushCollege())
    this.store.dispatch(flushCollegeCommexState())
    this.store.dispatch(flushCommexState())
    this.store.dispatch(flushProfileState())
    this.store.dispatch(FlushAttended())
    this.store.dispatch(FlushAttendee())
    this.store.dispatch(FlushAttendeeNumber())

    this.authService.flushToken();
    this.router.navigate(['/']);
    this.dialogRef.close()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}


