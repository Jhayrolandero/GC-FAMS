import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../components/navbar/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { TopnavComponent } from '../components/navbar/topnav/topnav.component';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../components/message/message.component';
import { MessageService } from '../services/message.service';
import { Message } from '../services/Interfaces/message';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    TopnavComponent,
    CommonModule,
    MessageComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  sideBarToggle = true;

  toggle(){
    this.sideBarToggle = !this.sideBarToggle;
    console.log(this.sideBarToggle);
  }
}
