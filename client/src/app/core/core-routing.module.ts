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
    path: 'register',
    component: Pages.RegisterPageComponent
  },
  {
    path: 'forgot-password',
    component: Pages.ForgotPasswordPageComponent
  },
  {
    path: 'reset-password',
    component: Pages.ResetPasswordPageComponent
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
