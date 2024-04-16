import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { Profile } from '../../../services/Interfaces/profile';
import { mainPort } from '../../../app.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

type topnavProfile = {
  profile_image: string,
  first_name: string,
  last_name: string,
  middle_name: string,
  ext_name: string
}
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
export class TopnavComponent implements OnInit {
  dropToggle = false;
  isLoading: boolean = true;
  facultyProfile: topnavProfile = {
    profile_image: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    ext_name: ""
  };
  constructor(
    private auth: AuthService,
    private router: Router,
    private facultyService: FacultyRequestService,
    public dialog: MatDialog) { }

  triggerToggle() {
    this.setToggle.emit();
  }

  openDialog(): void {
    console.log("Checking dialogue");
    this.dialog.open(TopnavLogout);
  }


  ngOnInit(): void {
    this.getProfile()
  }
  getProfile() {
    this.facultyService.fetchData<Profile>(this.facultyProfile, 'getprofile/fetchProfile').subscribe({
      next: (res) => {
        this.facultyProfile.profile_image = res.profile_image
        this.facultyProfile.first_name = res.first_name
        this.facultyProfile.last_name = res.last_name
        this.facultyProfile.middle_name = res.middle_name
        this.facultyProfile.ext_name = res.ext_name
        console.log(this.facultyProfile);
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['/']);
      },
      complete: () => {
        this.facultyProfile.profile_image = mainPort + this.facultyProfile.profile_image;
        this.isLoading = false
      }
    });
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
  constructor(private router: Router, public dialogRef: MatDialogRef<TopnavLogout>) { }
  logout() {
    this.router.navigate(['/']);
    this.dialogRef.close()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}


