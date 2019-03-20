import { NgModule,  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreService } from '@store/store.service';
import { LoadingModule } from '@ui/loading';
import { FormFieldsModule } from '@ui/form-fields';
import { SharedModule } from '@shared/shared.module';

import { CompaniesOverviewRoutingModule } from './companies-overview-routing.module';

import { Reducer, Services } from './store';
import { Pages } from './pages';
import { ReportsRepository } from '@api/reports';
import { CompaniesFormModule } from '@ui/companies-form';
import { ActivatedRouteSnapshot } from '@angular/router';

@NgModule({
  declarations: [
    Pages,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    CompaniesOverviewRoutingModule,
    SharedModule,
    LoadingModule,
    FormFieldsModule,
    CompaniesFormModule
  ],
  providers: [
    Services,
    ReportsRepository,
  ]
})
export class CompaniesOverviewModule {
  constructor(private storeService: StoreService) {
    this.storeService.injectAsyncReducer('companies-overview', Reducer);
  }
}
