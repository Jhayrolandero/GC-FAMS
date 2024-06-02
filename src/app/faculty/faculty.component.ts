import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadingScreenComponent } from '../components/loading-screen/loading-screen.component';
import { MessageComponent } from '../components/message/message.component';
import { SidebarComponent } from '../components/navbar/sidebar/sidebar.component';
import { TopnavComponent } from '../components/navbar/topnav/topnav.component';
import { getCommex } from '../state/commex/commex.action';
import { loadCert, loadCourse, loadEduc, loadEval, loadExp, loadExpertise, loadProfile, loadProj } from '../state/faculty-state/faculty-state.actions';
import { AnalyticsComponent } from './analytics/analytics.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

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

  options = this._formBuilder.group({
    bottom: 0,
    fixed: true,
    top: 0,
  });


  sideBarToggle = true;
  opened: boolean = true;

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
    private store: Store,
    breakpointObserver: BreakpointObserver,
    private _formBuilder: FormBuilder
  ) {


    store.dispatch(loadProfile());
    store.dispatch(loadCert());
    store.dispatch(loadCourse());
    store.dispatch(loadEduc());
    store.dispatch(loadExp());
    store.dispatch(loadProj());
    store.dispatch(loadExpertise());
    store.dispatch(loadEval());
    store.dispatch(getCommex({refresh: false}));


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

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
