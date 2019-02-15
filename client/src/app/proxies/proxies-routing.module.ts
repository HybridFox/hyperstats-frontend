import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as Pages from './pages';

const routes: Routes = [
  {
    path: '',
    component: Pages.OverviewPageComponent,
    children: [
      {
        path: '',
        component: Pages.DetailPageComponent,
      },
      {
        path: ':proxy',
        component: Pages.DetailPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProxiesRoutingModule { }
