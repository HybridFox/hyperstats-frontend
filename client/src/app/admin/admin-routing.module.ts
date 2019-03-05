import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: '../manage-users/manage-users.module#ManageUsersModule',
  },
  {
    path: 'companies',
    loadChildren: '../manage-companies/manage-companies.module#ManageCompaniesModule',
  },
  {
    path: 'signup-requests',
    loadChildren: '../signup-requests/signup-requests.module#SignupRequestsModule',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
