import { NgModule } from '@angular/core';

import { RecyclingProcessesRepository } from './recycling-processes.repository';

@NgModule({
  providers: [
    RecyclingProcessesRepository,
  ],
})
export class RecyclingProcessesApiModule {}
