import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ReportsRoutingModule } from './recycling-processes-routing.module';

import { StoreService } from '@store/store.service';
import { recyclingProcessesReducer } from './store/reducers';
import { RecylingProcessesServices } from './store';

import { ReportsApiModule } from '@api/reports';
import { FormFieldsModule } from '@ui/form-fields';

import { Pages } from './pages';
import { RecyclingPartnersModule } from '../recycling-partners/recycling-partners.module';
import { RecyclingProcessesApiModule } from '@api/recycling-processes';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReportsApiModule,
    FormFieldsModule,
    RecyclingPartnersModule,
    RecyclingProcessesApiModule,
  ],
  providers: [
    RecylingProcessesServices,
  ],
  declarations: [
    Pages,
  ],
})
export class RecyclingProcessesModule {
  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.injectAsyncReducer('recyclingProcesses', recyclingProcessesReducer);
  }
}
