import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { Components } from './components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [],
  declarations: [
    ...Components,
  ],
  exports: [
    ...Components,
  ],
})
export class SharedComponentsModule { }
