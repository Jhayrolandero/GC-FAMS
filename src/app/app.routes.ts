import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FacultyComponent } from './faculty/faculty.component';
import { AdminComponent } from './admin/admin.component';
import { FacultyMembersComponent } from './admin/faculty-members/faculty-members.component';
import { ProgramAnalyticsComponent } from './admin/program-analytics/program-analytics.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AnalyticsComponent } from './faculty/analytics/analytics.component';
import { ScheduleComponent } from './faculty/schedule/schedule.component';
import { CommunityExtensionsComponent } from './faculty/community-extensions/community-extensions.component';
import { ProfileComponent } from './faculty/profile/profile.component';
export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'faculty', redirectTo: '/faculty/profile', pathMatch: 'full'},
  {path: 'admin', redirectTo: '/admin/admin-profile', pathMatch: 'full'},
  
  {path: 'login', component: LoginComponent},
  {path: 'faculty', component: FacultyComponent, children: [
    {path: 'profile', component: ProfileComponent},
    {path: 'analytics', component: AnalyticsComponent},
    {path: 'schedule', component: ScheduleComponent},
    {path: 'projects', component: AnalyticsComponent},
    {path: 'graduate-studies', component: AnalyticsComponent},
    {path: 'certifications', component: AnalyticsComponent},
    {path: 'community-extensions', component: CommunityExtensionsComponent},
    {path: 'evaluation', component: AnalyticsComponent},
  ]},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'admin-profile', component: ProgramAnalyticsComponent},
    {path: 'program-analytics', component: ProgramAnalyticsComponent},
    {path: 'faculty-members', component: FacultyMembersComponent},
    {path: 'faculty-schedules', component: ProgramAnalyticsComponent},
    {path: 'program-projects', component: ProgramAnalyticsComponent},
    {path: 'community-extensions', component: ProgramAnalyticsComponent},
    {path: 'evaluation-analytics', component: ProgramAnalyticsComponent},
  ]},
  {path: '**', component: PagenotfoundComponent}
];
