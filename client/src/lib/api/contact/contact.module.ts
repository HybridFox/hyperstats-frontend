import { NgModule } from '@angular/core';

import { ContactRepository } from './contact.repository';

@NgModule({
  providers: [
    ContactRepository,
  ],
})
export class ContactApiModule {}
