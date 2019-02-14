import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ReportsRoutingModule } from './recycling-processes-routing.module';

import { StoreService } from '@store/store.service';
import { recyclingProcessesReducer } from './store/reducers';
import { RecylingProcessesServices } from './store';

import { ReportsApiModule } from '@api/reports';
import { AssetsApiModule } from '@api/assets';
import { FormFieldsModule } from '@ui/form-fields';

import { Pages } from './pages';
import { recyclingPartnersServices, recyclingPartnerReducer } from '../recycling-partners/store';
import { RecyclingPartnersModule } from '../recycling-partners/recycling-partners.module';

import { Components } from './components';
import { RecyclingProcessesComponent } from './recycling-processes.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReportsApiModule,
    FormFieldsModule,
    RecyclingPartnersModule,
    AssetsApiModule
  ],
  providers: [
    RecylingProcessesServices,
  ],
  declarations: [
    Pages,
    RecyclingProcessesComponent,
    Components
  ],
})
export class RecyclingProcessesModule {
  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.injectAsyncReducer('recyclingProcesses', recyclingProcessesReducer);
  }
}
