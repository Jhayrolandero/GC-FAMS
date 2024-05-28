import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent{
  isFaculty: boolean;
  selectedBar: string = '1';
  accountPath: string;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.accountPath = this.route.snapshot.url[0].path;
    this.isFaculty = this.accountPath === "faculty";
    this.selectedBar = this.router.url.split("/")[2];
    console.log(this.router.url.split("/")[2]);
  }

  onSelect(linkRoute: string) {
    this.selectedBar = linkRoute;
  }


  logout() {
    this.auth.flushToken();
    this.router.navigate(['/']);
  }
}
