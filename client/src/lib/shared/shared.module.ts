import { NgModule } from '@angular/core';

// Core modules
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { Services } from '@shared/services';

@NgModule({
  providers: [
    Services,
    DatePipe,
    DecimalPipe,
  ],
  imports: [
    // Core
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
  ],
  exports: [
    TranslateModule,
  ]
})
export class SharedModule { }
