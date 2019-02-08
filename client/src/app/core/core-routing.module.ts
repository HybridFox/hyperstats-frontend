import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, AdminGuard } from './guards';

import * as Pages from './pages';

const routes: Routes = [
  {
    path: 'about',
    component: Pages.AboutPageComponent
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
    path: 'auth',
    loadChildren: '../auth/auth.module#AuthModule',
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: '../app/app.module#AppModule',
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
