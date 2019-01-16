import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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

import { AuthGuard } from '@guards/auth.guard';

import { ErrorInterceptor } from '@helpers/error.interceptor';

import { FooterModule } from '@ui/footer';
import { FormFieldsModule } from '@ui/form-fields';
import { MainMenuModule } from '@ui/main-menu';
import { UserMenuModule } from '@ui/user-menu';
import { MenuModule } from '@ui/menu';

import { TranslateToastComponent } from './components/translate-toast/translate-toast.component';
import { Components } from './components';
<<<<<<< Updated upstream
=======
import { Pages } from './pages';
import { CodesService } from './services/codes/codes.service';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    CoreComponent,
    Pages,
    TranslateToastComponent,

    ...Components,
  ],
  entryComponents: [
    TranslateToastComponent,
  ],
  imports: [
    FooterModule,
    FormFieldsModule,
    StoreModule,
    BrowserModule,
    CoreRoutingModule,
    HttpClientModule,
    ApiModule,

    SharedModule,
    ReactiveFormsModule,

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
    MainMenuModule,
    UserMenuModule,
    MenuModule,
  ],
  providers: [
    StoreService,
    CodesService,
    Services,
    AuthGuard,

    AuthActions,
    AuthRepository,

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
