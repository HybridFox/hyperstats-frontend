import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsComponent } from './reports.component';

import { SharedModule } from '@shared/shared.module';

import { ReportsRoutingModule } from './reports-routing.module';

import { StoreService } from '@store/store.service';
import { reportsReducer } from './store/reducers';
import { ReportsServices } from './store';

import { ReportsApiModule } from '@api/reports';

import { Pages } from './pages';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReportsApiModule
  ],
  providers: [
    ReportsServices,
  ],
  declarations: [
    Pages,
    ReportsComponent
  ],
})
export class ReportsModule {
  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.injectAsyncReducer('reports', reportsReducer);
  }
}
