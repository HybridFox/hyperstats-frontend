import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxDaterangepickerModule } from '@qqnc/ngx-daterangepicker';

import { ApiModule } from '@api/api';

import { CoreRoutingModule } from './core-routing.module';

import { StoreModule } from '@store/store.module';
import { StoreService } from '@store/store.service';

import { ErrorInterceptor } from '@helpers/error.interceptor';
import { FormFieldsModule } from '@ui/form-fields';
import { LoadingModule } from '@ui/loading';
import { MomentModule } from 'ngx-moment';
import { NgxAircalModule } from "ngx-aircal";
import { NgxMdDaterangepicker } from 'ngx-material-daterangepicker';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StoreRouterModule } from '@core/store-router';

import { MonitorApiModule } from '@api/monitors';

import { Components, RootComponent } from './components';
import { Pages } from './pages';
import { CoreServices, coreReducer } from './store';

@NgModule({
  declarations: [
    ...Components,
    ...Pages,
  ],
  imports: [
    MonitorApiModule,
    FormFieldsModule,
    StoreModule,
    BrowserModule,
    CoreRoutingModule,
    HttpClientModule,
    ApiModule,
    NgxChartsModule,
    MomentModule,
    RouterModule,
    NgxMdDaterangepicker,

    ReactiveFormsModule,
    LoadingModule,

    StoreRouterModule,

    // Toastr
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      progressBar: true,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    CoreServices,
    StoreService,

    { provide: LOCALE_ID, useValue: 'en' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [RootComponent]
})
export class CoreModule {
  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.injectAsyncReducer('core', coreReducer);
  }
}
