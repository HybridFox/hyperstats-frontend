import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';

import { StoreModule } from '@store/store.module';
import { StoreService } from '@store/store.service';

@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    StoreModule,
    BrowserModule,
    CoreRoutingModule
  ],
  providers: [
    StoreService
  ],
  bootstrap: [CoreComponent]
})
export class CoreModule { }
