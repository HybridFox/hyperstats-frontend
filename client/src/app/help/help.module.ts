import { NgModule, } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { HelpRoutingModule } from './help-routing.module';

import { Pages } from './pages';

@NgModule({
  declarations: [
    Pages,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    HttpClientModule,

    HelpRoutingModule,
    SharedModule,
  ],
  providers: [],
})
export class HelpModule { }
