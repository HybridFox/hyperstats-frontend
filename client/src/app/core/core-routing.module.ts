import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';

import * as Pages from './pages';

const routes: Routes = [
  {
    path: 'login',
    component: Pages.LoginPageComponent,
    data: {
      menuState: 'transparant'
    }
  },
  {
    path: 'about',
    component: Pages.AboutPageComponent
  },
  {
    path: 'register',
    component: Pages.RegisterPageComponent,
    data: {
      menuState: 'transparant'
    }
  },
  {
    path: 'forgot-password',
    component: Pages.ForgotPasswordPageComponent,
    data: {
      menuState: 'transparant'
    }
  },
  {
    path: 'reset-password',
    component: Pages.ResetPasswordPageComponent
  },
  {
    path: 'company-information',
    component: Pages.CompanyPageComponent
  },
  {
    path: 'verification-succeeded',
    component: Pages.VerificationSucceededPageComponent,
    data: {
      menuState: 'transparant'
    }
  },
  {
    path: 'verification-failed',
    component: Pages.VerificationFailedPageComponent,
    data: {
      menuState: 'transparant'
    }
  },
  {
    path: 'help',
    component: Pages.HelpPageComponent,
    children: [
      { path: ':section', component: Pages.HelpSectionPageComponent },
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'reports',
        loadChildren: '../reports/reports.module#ReportsModule'
      },
      {
        path: 'profile',
        component: Pages.ProfilePageComponent
      },
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'recycling-processes', loadChildren: '../recycling-processes/recycling-processes.module#RecyclingProcessesModule'},
    ]
  },
  {
    path: 'privacy',
    component: Pages.PrivacyPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
