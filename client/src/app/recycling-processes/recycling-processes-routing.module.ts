import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecyclingProcessesPageComponent } from './recycling-processes.page';

const routes: Routes = [
  {
    path: '',
    component: RecyclingProcessesPageComponent,
    children: [
      {
        path: ':recyclingProcess',
        component: RecyclingProcessesPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
