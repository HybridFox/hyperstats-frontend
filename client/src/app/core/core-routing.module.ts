import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';

import * as Pages from './pages';

const routes: Routes = [
  {
    path: 'login',
    component: Pages.LoginPageComponent
  },
  {
    path: 'about',
    component: Pages.AboutPageComponent
  },
  {
    path: 'register',
    component: Pages.RegisterPageComponent
  },
  {
    path: 'forgot-password',
    component: Pages.ForgotPasswordPageComponent
  },
  {
    path: 'company-information',
    component: Pages.CompanyPageComponent
  },
  {
    path: 'verification-succeeded',
    component: Pages.VerificationSucceededPageComponent
  },
  {
    path: 'verification-failed',
    component: Pages.VerificationFailedPageComponent
  },
  {
    path: 'help',
    component: Pages.HelpPageComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'reports', loadChildren: '../reports/reports.module#ReportsModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
