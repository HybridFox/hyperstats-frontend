import { NgModule } from '@angular/core';

// Core modules
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

// Components
import { Services } from '@shared/services';
import { AuthActions } from '@store/auth';
import { AuthRepository } from '@store/auth/auth.repository';

import { Components } from './components';
import { Pipes } from './pipes';

@NgModule({
  providers: [
    Services,
    DatePipe,
    DecimalPipe,
    Pipes,

    // Auth
    AuthActions,
    AuthRepository,
  ],
  imports: [
    // Core
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild(),
    MatMenuModule,
    MatButtonModule,
  ],
  declarations: [
    ...Components,
    Pipes
  ],
  exports: [
    ...Components,
    TranslateModule,
    Pipes
  ]
})
export class SharedModule { }
