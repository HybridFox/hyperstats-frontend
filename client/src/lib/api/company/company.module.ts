import { NgModule } from '@angular/core';

import { CompanyRepository } from './company.repository';

@NgModule({
  providers: [
    CompanyRepository,
  ],
})
export class CompanyApiModule {}
