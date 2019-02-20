import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as ReportSections from './pages/detail';
import { ReportsPageComponent } from './pages/overview';
import { ReportPageComponent } from './pages/detail';

const routes: Routes = [
  {
    path: '',
    component: ReportsPageComponent,
  },
  {
    path: ':id',
    component: ReportPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'information',
      },
      {
        path: 'information',
        component: ReportSections.NewPageComponent
      },
      {
        path: 'input-fraction',
        component: ReportSections.InputFractionPageComponent
      },
      {
        path: 'additives',
        component: ReportSections.AdditivesPageComponent
      },
      {
        path: 'output-fraction',
        component: ReportSections.OutputFractionPageComponent
      },
      {
        path: 'recycling-efficiency',
        component: ReportSections.RecyclingEfficiencyPageComponent
      },
      {
        path: 'additional-information',
        component: ReportSections.AdditionalInformationPageComponent
      },
      {
        path: 'file-report',
        component: ReportSections.FilePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

