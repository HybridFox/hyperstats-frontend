import { NgModule, ModuleWithProviders } from '@angular/core';

import { LocalstorageConfig } from './localstorage.types';
import { LocalstorageService } from './localstorage.service';
import { LocalstorageReduxPlugin } from './localstorage.enhancer';
import {
  LOCALSTORAGE_CONFIG,
  DEFAULT_LOCALSTORAGE_CONFIG,
} from './localstorage.conf';

@NgModule({
  imports: [
  ],
  providers: [
    { provide: LOCALSTORAGE_CONFIG, useValue: DEFAULT_LOCALSTORAGE_CONFIG },
    LocalstorageService,
    LocalstorageReduxPlugin,
  ],
})
export class LocalstorageModule {
  static forRoot(
    localstorageConfig: LocalstorageConfig = DEFAULT_LOCALSTORAGE_CONFIG,
  ): ModuleWithProviders {
    return {
      ngModule: LocalstorageModule,
      providers: [
        { provide: LOCALSTORAGE_CONFIG, useValue: localstorageConfig },
        LocalstorageService,
        LocalstorageReduxPlugin,
      ],
    };
  }
}
