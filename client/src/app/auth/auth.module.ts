import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { FormFieldsModule } from '@ui/form-fields';

import { AuthRoutingModule } from './auth-routing.module';

import { Pages } from './pages';

@NgModule({
  declarations: [
    Pages,
  ],
  entryComponents: [],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,

    SharedModule,
    FormFieldsModule,
    CommonModule,
  ],
  providers: [],
})
export class AuthModule { }
