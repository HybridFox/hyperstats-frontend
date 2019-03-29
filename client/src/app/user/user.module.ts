import { NgModule, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { FormFieldsModule } from '@ui/form-fields';

import { UserRoutingModule } from './user-routing.module';

import { Pages } from './pages';

@NgModule({
  declarations: [
    Pages,
  ],
  entryComponents: [],
  imports: [
    UserRoutingModule,
    ReactiveFormsModule,

    SharedModule,
    FormFieldsModule,
    CommonModule,
  ],
  providers: [],
})
export class UserModule { }
