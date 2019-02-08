import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as Pages from './pages';

const routes: Routes = [
    {
        path: '',
        component: Pages.WrapperPageComponent,
        children: [
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
            {
                path: 'profile',
                component: Pages.ProfilePageComponent
            },
            {
                path: 'company-information',
                component: Pages.CompanyPageComponent
            },
            { path: 'help', loadChildren: '../help/help.module#HelpModule' },
            { path: 'recycling-processes', loadChildren: '../recycling-processes/recycling-processes.module#RecyclingProcessesModule' },
            { path: 'recycling-partners', loadChildren: '../recycling-partners/recycling-partners.module#RecyclingPartnersModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
