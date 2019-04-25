import { NgModule } from '@angular/core';

import { AssetsRepository } from './assets.repository';

@NgModule({
  providers: [
    AssetsRepository,
  ],
})
export class AssetsApiModule {}
