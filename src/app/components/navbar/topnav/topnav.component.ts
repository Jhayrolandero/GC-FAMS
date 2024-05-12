import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { mainPort } from '../../../app.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { selectAllProfile } from '../../../state/faculty-state/faculty-state.selector';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../services/auth.service';
import { logOut } from '../../../state/logout.action';


@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterModule
  ],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css'
})
export class TopnavComponent {

  @Input("path") path:string = ""
  dropToggle = false;
  isLoading: boolean = false;
  port = mainPort
  public facultyProfile$ = this.store.select(selectAllProfile);
  accountPath: string;
  isFaculty: boolean;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog,
    private router: Router) {

      this.accountPath = this.route.snapshot.url[0].path;
      this.isFaculty = this.accountPath === "faculty";
    }

  triggerToggle() {
    this.setToggle.emit();
  }

  openDialog(): void {
    this.store.dispatch(logOut());
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
    this.authService.flushToken();
    this.router.navigate(['/']);
    this.dialogRef.close()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}


