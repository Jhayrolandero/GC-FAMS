import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../components/navbar/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { TopnavComponent } from '../components/navbar/topnav/topnav.component';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../components/message/message.component';
import { MessageService } from '../services/message.service';
import { Message } from '../services/Interfaces/message';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { loadProfile } from '../state/faculty-state/faculty-state.actions';
import { loadCollegeCert, loadCollegeCommex, loadCollegeCourse, loadCollegeEduc, loadCollegeEval, loadCollegeExp, loadCollegeExpertise, loadCollegeProfile, loadCollegeProj } from '../state/dean-state/dean-state.actions';
import { getCollegeCommex, getCommex } from '../state/commex/commex.action';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterOutlet,
    TopnavComponent,
    CommonModule,
    MessageComponent,
    MatSidenavModule, 
    MatButtonModule, 
    FormsModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  sideBarToggle = true;
  opened: boolean = true;

  constructor(public store: Store){
    store.dispatch(loadProfile());
    store.dispatch(loadCollegeProfile());
    store.dispatch(loadCollegeEduc());
    store.dispatch(loadCollegeCert());
    store.dispatch(loadCollegeExp());
    store.dispatch(loadCollegeProj());
    store.dispatch(loadCollegeExpertise());
    store.dispatch(loadCollegeEval());
    store.dispatch(loadCollegeCommex());
  }

  toggle(){
    this.sideBarToggle = !this.sideBarToggle;
    console.log(this.sideBarToggle);
  }
}
