import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as Pages from './pages';

const routes: Routes = [
  {
    path: '',
    component: Pages.TestPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
