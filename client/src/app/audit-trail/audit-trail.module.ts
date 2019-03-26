import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ReportsApiModule } from '@api/reports';
import { FormFieldsModule } from '@ui/form-fields';

import { AuditTrailRoutingModule } from './audit-trail-routing.module';
import { Components } from './components';
import { Pages } from './pages';
import { AuditTrailServices, auditTrailReducer } from './store';
import { AuditTrailApiModule } from '@api/audit-trail';
import { StoreService } from '@store/store.service';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    AuditTrailRoutingModule,
    SharedModule,
    ReportsApiModule,
    FormFieldsModule,
    AuditTrailApiModule,
  ],
  declarations: [
    Pages,
    Components,
  ],
  providers: [
    AuditTrailServices,
  ],
})
export class AuditTrailModule {
  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.injectAsyncReducer('audit-trail', auditTrailReducer);
  }
}

