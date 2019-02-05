import { NgModule,  } from '@angular/core';

import { ManageUsersRoutingModule } from './manage-users-routing.module';

import { Pages } from './pages';

@NgModule({
  declarations: [
    Pages,
  ],
  entryComponents: [],
  imports: [
    ManageUsersRoutingModule,
  ],
  providers: [],
})
export class AdminModule { }
