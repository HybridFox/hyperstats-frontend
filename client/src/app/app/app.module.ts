import { NgModule,  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { FormFieldsModule } from '@ui/form-fields';

import { AppRoutingModule } from './app-routing.module';

import { Pages } from './pages';
import { Components } from './components';

@NgModule({
  declarations: [
    Pages,
    Components,
  ],
  entryComponents: [],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,

    SharedModule,
    FormFieldsModule,
    CommonModule,
  ],
  providers: [],
})
export class AppModule { }
