import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldsModule } from '@ui/form-fields';
import { StoreService } from '@store/store.service';
import { SharedModule } from '@shared/shared.module';

import { ReportsRoutingModule } from './recycling-partners-routing.module';
import { recyclingPartnerReducer } from './store/reducers';
import { recyclingPartnersServices } from './store';
import { Pages } from './pages';
import { Components } from './components';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    FormFieldsModule
  ],
  providers: [
    recyclingPartnersServices,
  ],
  declarations: [
    Pages,
    Components
  ],
})
export class RecyclingPartnersModule {
  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.injectAsyncReducer('recyclingPartners', recyclingPartnerReducer);
  }
}
