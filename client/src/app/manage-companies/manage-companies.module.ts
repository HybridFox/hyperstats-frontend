import { NgModule,  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreService } from '@store/store.service';
import { LoadingModule } from '@ui/loading';
import { FormFieldsModule } from '@ui/form-fields';
import { SharedModule } from '@shared/shared.module';

import { ManageComapniesRoutingModule } from './manage-companies-routing.module';

import { Services, Reducer } from './store';
import { Pages } from './pages';
import { Components } from './components';

@NgModule({
  declarations: [
    Pages,
    Components,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    ManageComapniesRoutingModule,
    SharedModule,
    LoadingModule,
    FormFieldsModule,
  ],
  providers: [
    Services,
  ],
})
export class ManageComapniesModule {
  constructor(private storeService: StoreService) {
    this.storeService.injectAsyncReducer('company-management', Reducer);
  }
}