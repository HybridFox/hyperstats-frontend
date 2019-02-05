import { NgModule,  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { StoreService } from '@store/store.service';
import { LoadingModule } from '@ui/loading';

import { ManageUsersRoutingModule } from './manage-users-routing.module';

import { Services, Reducer } from './store';
import { Pages } from './pages';

@NgModule({
  declarations: [
    Pages,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    HttpClientModule,

    ManageUsersRoutingModule,
    LoadingModule,
  ],
  providers: [
    Services,
  ],
})
export class AdminModule {
  constructor(private storeService: StoreService) {
    this.storeService.injectAsyncReducer('user-management', Reducer);
  }
}
