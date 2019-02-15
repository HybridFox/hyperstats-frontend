import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as Pages from './pages';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reports',
    },
    { path: 'new-report', loadChildren: '../new-report/new-report.module#NewReportModule' },
    {
        path: 'reports',
        component: Pages.ReportsPageComponent
    },
    { path: 'help', loadChildren: '../help/help.module#HelpModule' },
    { path: 'recycling-processes', loadChildren: '../recycling-processes/recycling-processes.module#RecyclingProcessesModule' },
    { path: 'recycling-partners', loadChildren: '../recycling-partners/recycling-partners.module#RecyclingPartnersModule' },
    { path: 'proxies', loadChildren: '../proxies/proxies.module#ProxiesModule' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecyclerRoutingModule { }
