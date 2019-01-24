import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecyclingPartnersComponent } from './recycling-partners.component';

import { RecyclingPartnerPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: RecyclingPartnersComponent,
    children: [
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
