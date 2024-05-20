import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { FacultyComponent } from './faculty/faculty.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'faculty', redirectTo: '/faculty/curriculum-vitae', pathMatch: 'full' },
  { path: 'admin', redirectTo: '/admin/manage-faculty', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'faculty', component: FacultyComponent, children: [
      {
        path: 'curriculum-vitae', loadComponent: () => import('./faculty/profile/profile.component').then(m => m.ProfileComponent),
      },
      { path: 'analytics', loadComponent: () => import('./faculty/analytics/analytics.component').then(m => m.AnalyticsComponent) },
      { path: 'community', loadComponent: () => import('./faculty/community-extensions/community-extensions.component').then(m => m.CommunityExtensionsComponent) },
      { path: 'evaluation', loadComponent: () => import('./faculty/evaluation/evaluation.component').then(m => m.EvaluationComponent) },
      { path: 'manage-profile', loadComponent: () => import('./components/manage-profile/manage-profile.component').then(m => m.ManageProfileComponent) },
    ], canActivateChild: [authGuard],
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'add-faculty', loadComponent: () => import('./admin/manage-faculty/add-faculty/add-faculty.component').then(m => m.AddFacultyComponent) },
      { path: 'manage-faculty', loadComponent: () => import('./admin/manage-faculty/manage-faculty.component').then(m => m.ManageFacultyComponent) },
      { path: 'evaluation-analytics', loadComponent: () => import('./admin/evaluation-analytics/evaluation-analytics.component').then(m => m.EvaluationAnalyticsComponent) },
      { path: 'program-analytics', loadComponent: () => import('./admin/manage-analytics/manage-analytics.component').then(m => m.ManageAnalyticsComponent) },
      { path: 'curriculum-vitae', loadComponent: () => import('./faculty/profile/profile.component').then(m => m.ProfileComponent),},
      { path: 'analytics', loadComponent: () => import('./faculty/analytics/analytics.component').then(m => m.AnalyticsComponent) },
      { path: 'community', loadComponent: () => import('./faculty/community-extensions/community-extensions.component').then(m => m.CommunityExtensionsComponent) },
      { path: 'evaluation', loadComponent: () => import('./faculty/evaluation/evaluation.component').then(m => m.EvaluationComponent) },
      { path: 'manage-profile', loadComponent: () => import('./components/manage-profile/manage-profile.component').then(m => m.ManageProfileComponent) },

    ], canActivateChild: [authGuard]
  },
  { path: 'cv', loadComponent: () => import('./components/cv/cv.component').then(m => m.CvComponent) },
  { path: '**', loadComponent: () => import('./components/pagenotfound/pagenotfound.component').then(m => m.PagenotfoundComponent) }
];
