import { Component, OnInit } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { ReportsActions } from '../../../../store/reports';
import { FormDataService } from '../../../../services/formdata.service';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';
import { StepPageAbstract } from '../step-page.abstract';

@Component({
  templateUrl: './input-fraction.page.html',
})
export class InputFractionPageComponent extends StepPageAbstract implements OnInit {
  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    protected toastrService: ToastrService,
    protected reportProcessActions: ReportsProcessActions,
    protected router: Router,
    public route: ActivatedRoute,
    protected reportActions: ReportsActions,
  ) {
    super(
      codesService,
      formData,
      toastrService,
      reportProcessActions,
      router,
      route,
      reportActions,
      {
        prevStep: ['../../information'],
        nextStep: ['../../additives'],
        formSection: 'inputFraction'
      }
    );
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  public onFormReady(): void {
  }
}
