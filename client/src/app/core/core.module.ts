import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ApiModule } from '@api/api';
import { ContactRepository } from '@api/contact';

import { CoreRoutingModule } from './core-routing.module';

import { StoreModule } from '@store/store.module';
import { StoreService } from '@store/store.service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AuthActions } from '@store/auth';
import { AuthRepository } from '@store/auth/auth.repository';
import { SharedModule } from '@shared/shared.module';
import { ErrorInterceptor } from '@helpers/error.interceptor';
import { TranslateToastComponent } from '@shared/components/translate-toast/translate-toast.component';
import { FormFieldsModule } from '@ui/form-fields';
import { LoadingModule } from '@ui/loading';

import { StoreRouterModule } from '@core/store-router';
import { CompanyRepository } from '@api/company';

import { WebpackTranslateLoader } from './translations';
import { CodesService } from './services/codes/codes.service';

import { Services } from './services';
import { Components, CoreComponent } from './components';
import { Pages } from './pages';
import { Guards } from './guards';

@NgModule({
  declarations: [
    Components,
    Pages,
    TranslateToastComponent,
  ],
  entryComponents: [
    TranslateToastComponent,
  ],
  imports: [
    FormFieldsModule,
    StoreModule,
    BrowserModule,
    CoreRoutingModule,
    HttpClientModule,
    ApiModule,

    SharedModule,
    ReactiveFormsModule,
    LoadingModule,

    StoreRouterModule,

    // Toastr
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      progressBar: true,
      positionClass: 'toast-bottom-right',
      toastComponent: TranslateToastComponent
    }),

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
    CodesService,
    Services,
    Guards,

    AuthActions,
    AuthRepository,
    ContactRepository,
    CompanyRepository,

    { provide: LOCALE_ID, useValue: 'en' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [CoreComponent]
})
export class CoreModule { }
