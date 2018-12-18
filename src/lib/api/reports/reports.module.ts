import { NgModule } from '@angular/core';

import { ReportsRepository } from './reports.repository';

@NgModule({
  providers: [
    ReportsRepository,
  ],
})
export class ReportsApiModule {}
