import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { Components } from './components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
  ],
  providers: [],
  declarations: [
    ...Components,
  ],
  exports: [
    ...Components,
  ],
})
export class FormFieldsModule { }
