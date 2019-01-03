import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';

import { ApiModule } from '@api/api';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';

import { StoreModule } from '@store/store.module';
import { StoreService } from '@store/store.service';

import { Services } from './services';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { WebpackTranslateLoader } from './translations';

import { FooterModule } from '@ui/footer';
@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    FooterModule,
    StoreModule,
    BrowserModule,
    CoreRoutingModule,
    HttpClientModule,
    ApiModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader,
      },
    }),
  ],
  providers: [
    StoreService,
    Services,

    { provide: LOCALE_ID, useValue: 'en' },
  ],
  bootstrap: [CoreComponent]
})
export class CoreModule { }
