import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { ProxiesRoutingModule } from './proxies-routing.module';

import { ReportsApiModule } from '@api/reports';
import { FormFieldsModule } from '@ui/form-fields';

import { Pages } from './pages';

@NgModule({
  imports: [
    CommonModule,
    ProxiesRoutingModule,
    SharedModule,
    ReportsApiModule,
    FormFieldsModule,
  ],
  declarations: [
    Pages,
  ],
})
export class ProxiesModule {}
