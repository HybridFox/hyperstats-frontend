import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecyclingPartnerPageComponent, RecyclingPartnersComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: RecyclingPartnersComponent,
    children: [
      {
        path: '',
        component: RecyclingPartnerPageComponent,
      },
      {
        path: ':recyclingPartner',
        component: RecyclingPartnerPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
