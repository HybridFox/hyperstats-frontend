import { NgModule } from '@angular/core';

import { MonitorRepository } from './monitor.repository';

@NgModule({
  providers: [
    MonitorRepository,
  ],
})
export class MonitorApiModule {}
