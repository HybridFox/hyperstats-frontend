import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecyclingProcessesComponent } from './recycling-processes.component';

import { RecyclingProcessPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: RecyclingProcessesComponent,
    children: [
      {
        path: '',
        component: RecyclingProcessPageComponent,
      },
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
