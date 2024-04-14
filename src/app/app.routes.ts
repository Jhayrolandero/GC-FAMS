import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FacultyComponent } from './faculty/faculty.component';
import { AdminComponent } from './admin/admin.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AnalyticsComponent } from './faculty/analytics/analytics.component';
import { ScheduleComponent } from './faculty/schedule/schedule.component';
import { CommunityExtensionsComponent } from './faculty/community-extensions/community-extensions.component';
import { ProfileComponent } from './faculty/profile/profile.component';
import { ManageFacultyComponent } from './admin/manage-faculty/manage-faculty.component';
import { EvaluationComponent } from './faculty/evaluation/evaluation.component';
import { CvComponent } from './components/cv/cv.component';
import { authGuard } from './services/auth.guard';
import { ManageAnalyticsComponent } from './admin/manage-analytics/manage-analytics.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'faculty', redirectTo: '/faculty/curriculum-vitae', pathMatch: 'full' },
  { path: 'admin', redirectTo: '/admin/manage-faculty', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  {
    path: 'faculty', component: FacultyComponent, children: [
      { path: 'curriculum-vitae', component: ProfileComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'graduate-studies', component: AnalyticsComponent },
      { path: 'certifications', component: AnalyticsComponent },
      { path: 'community', component: CommunityExtensionsComponent },
      { path: 'evaluation', component: EvaluationComponent },
    ], canActivateChild: [authGuard]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'manage-faculty', component: ManageFacultyComponent },
      { path: 'program-analytics', component: ManageAnalyticsComponent },
      { path: 'community', component: CommunityExtensionsComponent }
    ], canActivateChild: [authGuard]
  },
  { path: 'cv', component: CvComponent },
  { path: '**', component: PagenotfoundComponent }
];
