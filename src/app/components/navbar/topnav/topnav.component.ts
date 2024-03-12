import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FacultyFetcherService } from '../../../services/faculty/faculty-fetcher.service';
import { Profile } from '../../../services/Interfaces/profile';
import { mainPort } from '../../../app.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css'
})
export class TopnavComponent implements OnInit{

  isLoading: boolean = true;
  facultyProfile!: Profile;
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
      next: (next) => this.facultyProfile = next,
      error: (error) => {
        console.log(error);
        this.router.navigate(['/']);
      },
      complete: () => {
        this.facultyProfile.profile_image = mainPort + this.facultyProfile.profile_image;
        this.facultyProfile.cover_image = mainPort + this.facultyProfile.cover_image;
        this.isLoading = false
      }
      });
    }

  @Output() setToggle = new EventEmitter<string>();

}


