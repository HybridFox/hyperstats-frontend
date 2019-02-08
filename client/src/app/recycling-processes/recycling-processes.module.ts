import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecyclingProcessesPageComponent } from './recycling-processes.page';

import { SharedModule } from '@shared/shared.module';

import { ReportsRoutingModule } from './recycling-processes-routing.module';

import { StoreService } from '@store/store.service';
import { recyclingProcessesReducer } from './store/reducers';
import { RecylingProcessesServices } from './store';

import { ReportsApiModule } from '@api/reports';
import { FormFieldsModule } from '@ui/form-fields';

import { Pages } from './pages';
import { recyclingPartnersServices, recyclingPartnerReducer } from '../recycling-partners/store';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReportsApiModule,
    FormFieldsModule
  ],
  providers: [
    RecylingProcessesServices,
    recyclingPartnersServices
  ],
  declarations: [
    Pages,
    RecyclingProcessesPageComponent
  ],
})
export class RecyclingProcessesModule {
  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.injectAsyncReducer('recyclingProcesses', recyclingProcessesReducer);
    this.storeService.injectAsyncReducer('recyclingPartners', recyclingPartnerReducer);
  }
}
