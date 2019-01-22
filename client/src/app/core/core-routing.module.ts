import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';

import * as Pages from './pages';
import { CoreComponent } from './core.component';

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
    path: '',
    canActivate: [AuthGuard],
    component: CoreComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
