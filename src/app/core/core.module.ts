import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ApiModule } from '@api/api';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';

import { StoreModule } from '@store/store.module';
import { StoreService } from '@store/store.service';

import { Services } from './services';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { WebpackTranslateLoader } from './translations';

import { Pages } from './pages';
import { AuthActions } from '@store/auth';
import { AuthRepository } from '@store/auth/auth.repository';
import { SharedModule } from '@shared/shared.module';

import { Components } from './components';

@NgModule({
  declarations: [
    CoreComponent,
    Components,
    Pages
  ],
  imports: [
    StoreModule,
    BrowserModule,
    CoreRoutingModule,
    HttpClientModule,
    ApiModule,

    SharedModule,
    ReactiveFormsModule,

    // Translations
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

    AuthActions,
    AuthRepository,

    { provide: LOCALE_ID, useValue: 'en' },
  ],
  bootstrap: [CoreComponent]
})
export class CoreModule { }
