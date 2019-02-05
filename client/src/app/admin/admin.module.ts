import { NgModule,  } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';

import { Pages } from './pages';

@NgModule({
  declarations: [
    Pages,
  ],
  entryComponents: [],
  imports: [
    AdminRoutingModule,
  ],
  providers: [],
})
export class AdminModule { }
