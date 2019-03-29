import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as Pages from './pages';

const routes: Routes = [
  {
    path: '',
    component: Pages.WrapperPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: Pages.LoginPageComponent,
        data: {
          menuState: 'transparant',
          hideLogo: true,
        }
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
