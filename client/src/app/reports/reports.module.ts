import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsComponent } from './reports.component';

import { SharedModule } from '@shared/shared.module';

import { ReportsRoutingModule } from './reports-routing.module';

import { StoreService } from '@store/store.service';
import { ReportsStoreServices, Reducers } from './store';

import { ReportsApiModule } from '@api/reports';
import { FormFieldsModule } from '@ui/form-fields';

import { Pages } from './pages';
import { ReportsServices } from './services';
import { LoadingModule } from '@ui/loading';
import { Components } from './components';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReportsApiModule,
    FormFieldsModule,
    LoadingModule,
  ],
  providers: [
    ...ReportsStoreServices,
    ...ReportsServices,
  ],
  declarations: [
    Pages,
    ReportsComponent,
    ...Components,
  ],
})
export class ReportsModule {
  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.injectAsyncReducer('reports', Reducers);
  }
}
