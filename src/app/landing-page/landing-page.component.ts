import { Component, inject } from '@angular/core';
import { FacultyRequestService } from '../services/faculty/faculty-request.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  router = inject(Router);


  constructor(private facultyService: FacultyRequestService,
         private route: ActivatedRoute
  ){}

  countSubscription!: Subscription

  navigateFaculty() {
    this.router.navigate(['/faculty'])
  }

  navigateAdmin() {
    this.router.navigate(['/admin'])
  }


}
