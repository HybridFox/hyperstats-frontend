import { NgModule,  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { FormFieldsModule } from '@ui/form-fields';

import { AppRoutingModule } from './app-routing.module';

import { Pages } from './pages';

@NgModule({
  declarations: [
    Pages,
  ],
  entryComponents: [],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,

    SharedModule,
    FormFieldsModule,
  ],
  providers: [],
})
export class AppModule { }
