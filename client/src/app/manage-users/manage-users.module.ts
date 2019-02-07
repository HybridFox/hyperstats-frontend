import { NgModule,  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { StoreService } from '@store/store.service';
import { LoadingModule } from '@ui/loading';
import { FormFieldsModule } from '@ui/form-fields';
import { SharedModule } from '@shared/shared.module';

import { ManageUsersRoutingModule } from './manage-users-routing.module';

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

    ManageUsersRoutingModule,
    SharedModule,
    LoadingModule,
    FormFieldsModule,
  ],
  providers: [
    Services,
  ],
})
export class ManageUsersModule {
  constructor(private storeService: StoreService) {
    this.storeService.injectAsyncReducer('user-management', Reducer);
  }
}
