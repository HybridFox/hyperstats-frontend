import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewReportComponent } from './new-report.component';

import * as Pages from './pages';

const routes: Routes = [
  {
    path: '',
    component: NewReportComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'information',
      },
      {
        path: 'information',
        component: Pages.NewPageComponent
      },
      {
        path: 'input-fraction',
        component: Pages.InputFractionPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewReportRoutingModule { }
