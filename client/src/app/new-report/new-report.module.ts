import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewReportComponent } from './new-report.component';

import { SharedModule } from '@shared/shared.module';

import { NewReportRoutingModule } from './new-report-routing.module';

import { StoreService } from '@store/store.service';
import { newReportReducer } from './store/reducers';
import { ReportsServices } from './store';

import { ReportsApiModule } from '@api/reports';
import { FormFieldsModule } from '@ui/form-fields';

import { Pages } from './pages';
import { FormDataService } from './services/formdata.service';
import { RecyclingProcessesRepository } from '@api/recycling-processes';

@NgModule({
  imports: [
    CommonModule,
    NewReportRoutingModule,
    SharedModule,
    ReportsApiModule,
    FormFieldsModule,
  ],
  providers: [
    ReportsServices,
    FormDataService,
    RecyclingProcessesRepository
  ],
  declarations: [
    Pages,
    NewReportComponent
  ],
})
export class NewReportModule {
  constructor(
    private storeService: StoreService,
  ) {
    this.storeService.injectAsyncReducer('newReport', newReportReducer);
  }
}
