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
    { path: 'recycling-processes', loadChildren: '../recycling-processes/recycling-processes.module#RecyclingProcessesModule' },
    { path: 'recycling-partners', loadChildren: '../recycling-partners/recycling-partners.module#RecyclingPartnersModule' },
    { path: 'proxies', loadChildren: '../proxies/proxies.module#ProxiesModule' },
    { path: 'audit-trail', loadChildren: '../audit-trail/audit-trail.module#AuditTrailModule' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecyclerRoutingModule { }
