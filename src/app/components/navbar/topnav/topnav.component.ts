import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FacultyFetcherService } from '../../../services/faculty/faculty-fetcher.service';
import { Profile } from '../../../services/Interfaces/profile';
import { mainPort } from '../../../app.component';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css'
})
export class TopnavComponent implements OnInit{

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
    private facultyService: FacultyFetcherService){
    }

    triggerToggle(){
      this.setToggle.emit();
    }


    ngOnInit(): void {
        this.getProfile()
    }
    getProfile(){
      this.facultyService.fetchProfile().subscribe({
      next: (res : Profile) => {
        this.facultyProfile.profile_image = res.profile_image
        this.facultyProfile.first_name = res.first_name
        this.facultyProfile.last_name = res.last_name
        this.facultyProfile.middle_name = res.middle_name
        this.facultyProfile.ext_name = res.ext_name

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


