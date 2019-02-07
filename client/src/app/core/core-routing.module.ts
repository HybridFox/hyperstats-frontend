import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';

import * as Pages from './pages';

const routes: Routes = [
  {
    path: 'login',
    component: Pages.LoginPageComponent,
    data: {
      menuState: 'transparant',
      hideLogo: true,
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
      menuState: 'transparant',
      hideLogo: true,
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
    component: Pages.ResetPasswordPageComponent,
    data: {
      menuState: 'transparant'
    }
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
    canActivate: [AuthGuard],
    component: Pages.HelpPageComponent,
    children: [
      { path: ':section', component: Pages.HelpSectionPageComponent },
    ]
  },
  {
    path: 'contact',
    component: Pages.ContactPageComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'new-report', loadChildren: '../new-report/new-report.module#NewReportModule'},
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full',
      },
      {
        path: 'reports',
        component: Pages.ReportsPageComponent
      },
      {
        path: 'profile',
        component: Pages.ProfilePageComponent
      },
      {
        path: 'company-information',
        component: Pages.CompanyPageComponent
      },
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'recycling-processes', loadChildren: '../recycling-processes/recycling-processes.module#RecyclingProcessesModule'},
      { path: 'recycling-partners', loadChildren: '../recycling-partners/recycling-partners.module#RecyclingPartnersModule'},
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
