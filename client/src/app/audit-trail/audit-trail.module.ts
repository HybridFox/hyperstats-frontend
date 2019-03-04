import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ReportsApiModule } from '@api/reports';
import { FormFieldsModule } from '@ui/form-fields';

import { AuditTrailRoutingModule } from './audit-trail-routing.module';
import { AuditTrailComponent } from './audit-trail.page';

@NgModule({
  imports: [
    CommonModule,
    AuditTrailRoutingModule,
    SharedModule,
    ReportsApiModule,
    FormFieldsModule,
  ],
  declarations: [
    AuditTrailComponent
  ],
})
export class AuditTrailModule {}
