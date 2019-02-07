import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecyclingProcessesPageComponent } from './recycling-processes.page';
import { RecyclingProcessPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: RecyclingProcessesPageComponent,
    children: [
      {
        path: ':recyclingProcess',
        component: RecyclingProcessPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
