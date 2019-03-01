import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuditTrailComponent } from './audit-trail.page';

const routes: Routes = [
  {
    path: '',
    component: AuditTrailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditTrailRoutingModule {}
