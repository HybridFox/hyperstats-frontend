import { NgModule } from '@angular/core';

import { RecyclingPartnerRepository } from './recycling-partner.repository';

@NgModule({
  providers: [
    RecyclingPartnerRepository,
  ],
})

export class RecyclingPartnerApiModule {}
