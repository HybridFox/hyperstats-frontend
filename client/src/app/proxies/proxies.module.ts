import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreService } from '@store/store.service';
import { SharedModule } from '@shared/shared.module';
import { ProxiesRoutingModule } from './proxies-routing.module';

import { ProxiesServices } from './store';
import { proxiesReducer } from './store/reducers';

import { ReportsApiModule } from '@api/reports';
import { FormFieldsModule } from '@ui/form-fields';

import { ProxiesApiModule } from '@api/proxies';

import { Pages } from './pages';

@NgModule({
  imports: [
    CommonModule,
    ProxiesRoutingModule,
    SharedModule,
    ReportsApiModule,
    FormFieldsModule,
    ProxiesApiModule,
  ],
  providers: [
    ProxiesServices,
  ],
  declarations: [
    Pages,
  ],
})
export class ProxiesModule {
  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.injectAsyncReducer('proxies', proxiesReducer);
  }
}
