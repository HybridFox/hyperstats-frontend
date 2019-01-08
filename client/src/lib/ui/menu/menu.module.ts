import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MainMenuModule } from '@ui/main-menu';
import { UserMenuModule } from '@ui/user-menu';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    MainMenuModule,
    UserMenuModule
  ],
  declarations: [
    MenuComponent,
  ],
  exports: [
    MenuComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})

export class MenuModule {}
