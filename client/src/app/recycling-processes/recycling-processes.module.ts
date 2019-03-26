import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ReportsRoutingModule } from './recycling-processes-routing.module';

import { StoreService } from '@store/store.service';
import { recyclingProcessesReducer } from './store/reducers';
import { RecylingProcessesServices } from './store';

import { ReportsApiModule } from '@api/reports';
import { FormFieldsModule } from '@ui/form-fields';
import { UploadModule } from '@ui/upload';
import { AssetsApiModule } from '@api/assets';

import { ReportsStoreServices, Reducers } from '../reports/store';
import { ReportsServices } from '../reports/services';

import { Pages } from './pages';
import { Components } from './components';
import { RecyclingPartnersModule } from '../recycling-partners/recycling-partners.module';
import { RecyclingProcessesApiModule } from '@api/recycling-processes';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReportsApiModule,
    FormFieldsModule,
    UploadModule,
    RecyclingPartnersModule,
    AssetsApiModule,
    RecyclingProcessesApiModule,
  ],
  providers: [
    ...ReportsStoreServices,
    ...ReportsServices,
    RecylingProcessesServices,
  ],
  declarations: [
    Pages,
    Components
  ],
})
export class RecyclingProcessesModule {
  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.injectAsyncReducer('recyclingProcesses', recyclingProcessesReducer);
    this.storeService.injectAsyncReducer('reports', Reducers);
  }
}
