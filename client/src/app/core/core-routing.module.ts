import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, AdminGuard, ValidationGuard, OrganisationGuard } from './guards';

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
      {
        path: 'validation',
        canActivate: [AuthGuard],
        component: Pages.ValidationPageComponent,
      },
    ]
  },
  {
    path: '',
    component: Pages.AppWrapperPageComponent,
    children: [
      {
        path: 'recycler',
        canActivate: [AuthGuard, ValidationGuard, OrganisationGuard],
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
      {
        path: 'compliance-organisation',
        canActivate: [AuthGuard, ValidationGuard, OrganisationGuard],
        loadChildren: '../compliance-org/compliance-org.module#ComplianceOrgModule',
      },
      {
        path: 'authorisation-organisation',
        canActivate: [AuthGuard, ValidationGuard, OrganisationGuard],
        loadChildren: '../authorisation-org/authorisation-org.module#AuthorisationOrgModule',
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: '../auth/auth.module#AuthModule',
  },
  {
    path: 'recycler',
    canActivate: [AuthGuard, ValidationGuard, OrganisationGuard],
    loadChildren: '../recycler/recycler.module#RecyclerModule',
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard, ValidationGuard],
    loadChildren: '../admin/admin.module#AdminModule',
  },
  {
    path: 'compliance-organisation',
    canActivate: [AuthGuard, OrganisationGuard, ValidationGuard],
    loadChildren: '../compliance-org/compliance-org.module#ComplianceOrgModule',
  },
  {
    path: 'authorisation-organisation',
    canActivate: [AuthGuard, ValidationGuard, OrganisationGuard],
    loadChildren: '../authorisation-org/authorisation-org.module#AuthorisationOrgModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
