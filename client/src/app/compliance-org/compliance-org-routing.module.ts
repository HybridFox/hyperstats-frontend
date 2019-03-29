import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'reports',
  },
  { path: 'reports', loadChildren: '../reports/reports.module#ReportsModule' },
  { path: 'help', loadChildren: '../help/help.module#HelpModule' },
  { path: 'proxies', loadChildren: '../proxies/proxies.module#ProxiesModule' },
  { path: 'recyclers', loadChildren: '../companies-overview/companies-overview.module#CompaniesOverviewModule' },
  { path: 'authorisation-org', loadChildren: '../companies-overview/companies-overview.module#CompaniesOverviewModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplianceOrgRoutingModule { }
