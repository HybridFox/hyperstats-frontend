import { NgModule,  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreService } from '@store/store.service';
import { LoadingModule } from '@ui/loading';
import { FormFieldsModule } from '@ui/form-fields';
import { SharedModule } from '@shared/shared.module';

import { ManageCompaniesRoutingModule } from './manage-companies-routing.module';

import { Services, Reducer } from './store';
import { Pages } from './pages';
import { CompaniesFormModule } from '@ui/companies-form';

@NgModule({
  declarations: [
    Pages,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    ManageCompaniesRoutingModule,
    SharedModule,
    LoadingModule,
    FormFieldsModule,
    CompaniesFormModule
  ],
  providers: [
    Services,
  ],
})
export class ManageCompaniesModule {
  constructor(private storeService: StoreService) {
    this.storeService.injectAsyncReducer('company-management', Reducer);
  }
}
