import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../components/navbar/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { TopnavComponent } from '../components/navbar/topnav/topnav.component';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../components/message/message.component';
import { MessageService } from '../services/message.service';
import { Message } from '../services/Interfaces/message';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { loadCert, loadCourse, loadEduc, loadEval, loadExp, loadExpertise, loadProfile, loadProj } from '../state/faculty-state/faculty-state.actions';
import { loadCollege, loadCollegeCert, loadCollegeCommex, loadCollegeCourse, loadCollegeEduc, loadCollegeEval, loadCollegeExp, loadCollegeExpertise, loadCollegeProfile, loadCollegeProj } from '../state/dean-state/dean-state.actions';
import { getCollegeCommex, getCommex } from '../state/commex/commex.action';
import { Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
  //Only unique to admin manage analytics, waits until all dispatches are completed.
  manageAnalyticsLoading = false;
  opened: boolean = true;

  options = this._formBuilder.group({
    bottom: 0,
    fixed: true,
    top: 0,
  });

  destroyed = new Subject<void>();
  screenSize: string = ''

  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(
    public store: Store,
    breakpointObserver: BreakpointObserver,
    private _formBuilder: FormBuilder
  ) {
    store.dispatch(loadProfile());
    store.dispatch(loadCollegeProfile());
    store.dispatch(loadCollegeEduc());
    store.dispatch(loadCollegeCert());
    store.dispatch(loadCollegeExp());
    store.dispatch(loadCollegeProj());
    store.dispatch(loadCollegeExpertise());
    store.dispatch(loadCollegeEval());
    store.dispatch(loadCollegeCommex());
    store.dispatch(loadCollegeCourse());
    store.dispatch(loadCollege());

    store.dispatch(loadProfile());
    store.dispatch(loadCert());
    store.dispatch(loadCourse());
    store.dispatch(loadEduc());
    store.dispatch(loadExp());
    store.dispatch(loadProj());
    store.dispatch(loadExpertise());
    store.dispatch(loadEval());
    store.dispatch(getCommex())

    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.screenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }

  toggle() {
    this.sideBarToggle = !this.sideBarToggle;
    console.log(this.sideBarToggle);
  }
}
