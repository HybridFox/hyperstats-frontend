import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { Components } from './components';
import { UploadModule } from '@ui/upload';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    UploadModule,
    FormsModule,
  ],
  providers: [],
  declarations: [
    ...Components,
  ],
  exports: [
    ...Components,
    FormsModule,
  ],
})
export class FormFieldsModule { }
