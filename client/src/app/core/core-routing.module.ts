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
    path: 'company-information',
    component: Pages.CompanyPageComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'reports', loadChildren: '../reports/reports.module#ReportsModule'},
      { path: 'new-report', loadChildren: '../new-report/new-report.module#NewReportModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
