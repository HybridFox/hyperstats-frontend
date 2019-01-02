import { NgModule } from '@angular/core';

import { ApiConfigService } from './config.service';

@NgModule({
  providers: [
    ApiConfigService,
  ],
})

export class ApiModule {}
