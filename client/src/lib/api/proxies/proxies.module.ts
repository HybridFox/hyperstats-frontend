import { NgModule } from '@angular/core';

import { ProxiesRepository } from './proxies.repository';

@NgModule({
  providers: [
    ProxiesRepository,
  ],
})
export class ProxiesApiModule {}
