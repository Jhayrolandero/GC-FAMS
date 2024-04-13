import { Component } from '@angular/core';
import { Profile } from '../../services/Interfaces/profile';
import { Schedule } from '../../services/admin/schedule';
import { Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { mainPort } from '../../app.component';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { Resume } from '../../services/Interfaces/resume';
import { HttpClient } from '@angular/common/http';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { forkJoin } from 'rxjs';
import { MessageComponent } from '../../components/message/message.component';
import { CvDropdownComponent } from "./Profile Dropdown/cv-dropdown.component";
@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [
        MessageComponent,
        LoadingScreenComponent,
        NgOptimizedImage,
        CommonModule,
        CvDropdownComponent
    ]
})
export class ProfileComponent {
  isLoading: boolean = true
  facultyProfile!: Profile;
  schedules: Schedule[] = [];

  rotated = false;
  components: string[] = ["Educational Attaiment", "Certifications", "Industry Experience", "Projects", "Expertise"]

  //CV form toggle
  cvToggle = false;

    constructor(private facultyService: FacultyRequestService, private router: Router, private http: HttpClient){
      this.getProfileScheduleResume()
  }

  getProfileScheduleResume() {
    forkJoin({
      profileRequest: this.facultyService.fetchData(this.facultyProfile, 'getprofile/fetchProfile'),
      scheduleRequest: this.facultyService.fetchData(this.schedules, 'getschedules/fetchFaculty'),
    }).subscribe({
      next: (({
        profileRequest,
        scheduleRequest}) => {
          this.facultyProfile = profileRequest
          this.schedules = scheduleRequest
      }),
      error: (error) => {
        console.log(error)
        this.router.navigate(['/']);
      },
      complete: () => {
        this.facultyProfile.profile_image = mainPort + this.facultyProfile.profile_image;
        this.facultyProfile.cover_image = mainPort + this.facultyProfile.cover_image;
        this.isLoading = false
      }
    })
  }

  testPng(){
    console.log("Test");
    var cv = document.getElementById('cv')!;
    html2canvas(cv).then(canvas => {
    // Few necessary setting options
    var imgWidth = 210;
    var pageHeight = 297;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('new-file.pdf'); // Generated PDF
    });
  }

  getCv(){
    // const url = this.router.serializeUrl(this.router.createUrlTree(['cv']));
    // window.open(url, '_blank');
    this.router.navigate(['cv']);
  }

  rotate(){
    this.rotated = !this.rotated;
  }


  toggle(drop: string){
    switch (drop) {
      case 'cv':
        this.cvToggle = !this.cvToggle;
        break;

      default:
        break;
    }
  }
}

