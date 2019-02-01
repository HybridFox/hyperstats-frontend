import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecyclingPartnersComponent } from './recycling-partners.component';

import { SharedModule } from '@shared/shared.module';

import { ReportsRoutingModule } from './recycling-partners-routing.module';

import { StoreService } from '@store/store.service';
import { recyclingPartnerReducer } from './store/reducers';
import { ReportsServices } from './store';

import { RecyclingPartnerApiModule } from '@api/recycling-partner';
import { FormFieldsModule } from '@ui/form-fields';

import { Pages } from './pages';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    RecyclingPartnerApiModule,
    FormFieldsModule
  ],
  providers: [
    ReportsServices,
  ],
  declarations: [
    Pages,
    RecyclingPartnersComponent
  ],
})
export class RecyclingPartnersModule {
  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.injectAsyncReducer('recyclingPartners', recyclingPartnerReducer);
  }
}
