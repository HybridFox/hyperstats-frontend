import { NgModule,  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { StoreService } from '@store/store.service';
import { LoadingModule } from '@ui/loading';
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
