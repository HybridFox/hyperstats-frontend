import { Component } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { FormDataService } from '../../../../services/formdata.service';
import { ReportsActions } from '../../../../store/reports';
import { StepPageAbstract } from '../step-page.abstract';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';

@Component({
  templateUrl: './additional-information.page.html',
})
export class AdditionalInformationPageComponent extends StepPageAbstract {
  constructor(
    codesService: CodesService,
    formData: FormDataService,
    toastrService: ToastrService,
    reportProcessActions: ReportsProcessActions,
    router: Router,
    activatedRoute: ActivatedRoute,
    reportActions: ReportsActions,
  ) {
    super(
      codesService,
      formData,
      toastrService,
      reportProcessActions,
      router,
      activatedRoute,
      reportActions,
      {
        prevStep: 'recycling-efficiency',
        nextStep: 'file-report',
        formSection: 'additionalInformation'
      }
    );
  }

  public onFormReady() {}
}
