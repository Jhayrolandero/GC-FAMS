import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadingScreenComponent } from '../components/loading-screen/loading-screen.component';
import { MessageComponent } from '../components/message/message.component';
import { SidebarComponent } from '../components/navbar/sidebar/sidebar.component';
import { TopnavComponent } from '../components/navbar/topnav/topnav.component';
import { getCommex } from '../state/commex/commex.action';
import { loadCert, loadCourse, loadEduc, loadEval, loadExp, loadExpertise, loadProfile, loadProj } from '../state/faculty-state/faculty-state.actions';
import { AnalyticsComponent } from './analytics/analytics.component';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [SidebarComponent,
    RouterOutlet,
    AnalyticsComponent,
    TopnavComponent,
    CommonModule,
    LoadingScreenComponent,
    MessageComponent,
    MatSidenavModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule],

  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css'
})
export class FacultyComponent {
  sideBarToggle = true;
  opened: boolean = true;

  constructor(private store: Store) {
    store.dispatch(loadProfile());
    store.dispatch(loadCert());
    store.dispatch(loadCourse());
    store.dispatch(loadEduc());
    store.dispatch(loadExp());
    store.dispatch(loadProj());
    store.dispatch(loadExpertise());
    store.dispatch(loadEval());
    store.dispatch(getCommex({ uri: 'getcommex?t=faculty' }))
  }

  toggle() {
    this.sideBarToggle = !this.sideBarToggle;
    console.log(this.sideBarToggle);
  }
}
