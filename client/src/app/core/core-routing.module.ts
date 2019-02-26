import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, AdminGuard, ValidationGuard } from './guards';

import * as Pages from './pages';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard, ValidationGuard],
    component: Pages.LandingPageComponent
  },
  {
    path: '',
    component: Pages.GeneralWrapperPageComponent,
    children: [
      {
        path: 'about',
        component: Pages.AboutPageComponent
      },
      {
        path: 'contact',
        component: Pages.ContactPageComponent
      },
      {
        path: 'terms-and-conditions',
        component: Pages.TermsAndConditionsPageComponent
      },
    ]
  },
  {
    path: '',
    component: Pages.AppWrapperPageComponent,
    children: [
      {
        path: 'recycler',
        canActivate: [AuthGuard, ValidationGuard],
        loadChildren: '../recycler/recycler.module#RecyclerModule',
      },
      {
        path: 'user',
        canActivate: [AuthGuard, ValidationGuard],
        loadChildren: '../user/user.module#UserModule',
      },
      {
        path: 'admin',
        canActivate: [AuthGuard, AdminGuard, ValidationGuard],
        loadChildren: '../admin/admin.module#AdminModule',
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: '../auth/auth.module#AuthModule',
  },
  {
    path: 'recycler',
    canActivate: [AuthGuard, ValidationGuard],
    loadChildren: '../recycler/recycler.module#RecyclerModule',
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard, ValidationGuard],
    loadChildren: '../admin/admin.module#AdminModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
