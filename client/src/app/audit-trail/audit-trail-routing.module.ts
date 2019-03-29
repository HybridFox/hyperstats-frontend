import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import * as Pages from './pages';

const routes: Routes = [
  {
    path: '',
    component: Pages.AuditTrailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditTrailRoutingModule { }
