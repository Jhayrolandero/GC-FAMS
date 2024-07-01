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
import { InfoService } from '../../../services/info.service';
import { ExcelServiceService } from '../../../service/excel-service.service';


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

  currDate = new Date()
  schoolYear = -1;
  semester = '';
  college: string = ""
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
    private info: InfoService,
    private excelService: ExcelServiceService
  ) {
      this.accountPath = this.route.snapshot.url[0].path;
      //This declares the daes for the topnav!
      // this.schoolYear = this.currDate.getFullYear();
      // const currMonth = this.currDate.getMonth();
      this.semester = this.excelService.currSem
      // if(currMonth >= 1 && currMonth <= 3){
      //   this.semester = '1st Semester';
      // }
      // else if(currMonth >= 4 && currMonth <= 6){
      //   this.semester = 'Midyear';
      // }
      // else{
      //   this.semester = '2nd Semester'
      // }
      this.getCollege()
    }

  triggerToggle() {
    this.setToggle.emit();
  }


  async getCollege() {
    this.college = await this.info.getCollege()
  }
  openDialog(): void {
    this.store.dispatch(logOut());
    this.router.navigate([`/${this.accountPath}`]);
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
  ) {
  }

  logout() {

    this.authService.flushToken();
    this.router.navigate(['/faculty']);
    this.dialogRef.close()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
