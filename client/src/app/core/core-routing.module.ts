import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, AdminGuard } from './guards';

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
    path: 'privacy',
    component: Pages.PrivacyPageComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: Pages.LandingPageComponent,
      },
      { path: 'new-report', loadChildren: '../new-report/new-report.module#NewReportModule'},
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
      { path: 'recycling-processes', loadChildren: '../recycling-processes/recycling-processes.module#RecyclingProcessesModule'},
      { path: 'recycling-partners', loadChildren: '../recycling-partners/recycling-partners.module#RecyclingPartnersModule'},
    ]
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: '../admin/admin.module#AdminModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
