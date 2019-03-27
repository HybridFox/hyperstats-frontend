import { NgModule } from '@angular/core';

import { AuditTrailRepository } from './audit-trail.repository';

@NgModule({
  providers: [
    AuditTrailRepository,
  ],
})
export class AuditTrailApiModule {}
