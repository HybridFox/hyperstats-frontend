import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { Components } from './components';
import { FormFieldsModule } from '@ui/form-fields';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    FormFieldsModule,
    SharedModule
  ],
  providers: [],
  declarations: [
    ...Components,
  ],
  exports: [
    ...Components,
  ],
})
export class CompaniesFormModule { }
