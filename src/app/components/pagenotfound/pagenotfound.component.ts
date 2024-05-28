import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.css'
})
export class PagenotfoundComponent {

  router = inject(Router);

  goBack() {
    this.router.navigate(['/']);

  }
}
