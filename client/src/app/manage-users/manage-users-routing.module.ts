import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as Pages from './pages';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview',
  }, {
    path: 'overview',
    component: Pages.OverviewPageComponent,
  }, {
    path: 'overview/:id',
    component: Pages.DetailPageComponent,
  }, {
    path: 'signup-requests',
    component: Pages.RequestsPageComponent,
  }, {
    path: 'signup-requests/:id',
    component: Pages.DetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
