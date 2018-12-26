import { NgModule } from '@angular/core';

// Core modules
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { Services } from '@shared/services';
import { AuthActions } from '@store/auth';
import { AuthRepository } from '@store/auth/auth.repository';

@NgModule({
  providers: [
    Services,
    DatePipe,
    DecimalPipe,

    // Auth
    AuthActions,
    AuthRepository
  ],
  imports: [
    // Core
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild()
  ],
  exports: [
    TranslateModule,
  ]
})
export class SharedModule { }
