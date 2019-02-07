import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LoadingComponent } from './loading.component';
import { LoadingTemplateComponent } from './loading-template.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [
    LoadingComponent,
    LoadingTemplateComponent,
  ],
  exports: [
    LoadingComponent,
    LoadingTemplateComponent,
  ],
})
export class LoadingModule { }
