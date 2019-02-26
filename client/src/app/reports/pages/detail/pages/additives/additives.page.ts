import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { StepPageAbstract } from '../step-page.abstract';
import { FormGroup } from '@angular/forms';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';
import { ReportsActions } from 'src/app/reports/store/reports';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './additives.page.html',
})
export class AdditivesPageComponent extends StepPageAbstract {
  public activeStepIndex = 0;
  public additive: FormGroup;

  private stepId: string;

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
        prevStep: 'input-fraction',
        nextStep: 'output-fraction',
        formSection: 'additives'
      }
    );
  }

  private setActiveStepById(stepId: string) {
    if (!stepId) {
      this.additive = this.form.get('0');

      return setTimeout(() =>
        this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { step: this.additive.get('siteRef').value } })
      );
    }

    const stepIndex = this.form.getRawValue().findIndex((step) => step.siteRef === stepId);
    this.additive = this.form.get(`${stepIndex}`);
  }

  public addAdditive() {
    this.formData.addAdditive();
  }

  public onFormReady(): void {
    this.activatedRoute.queryParams.pipe(
      takeUntil(this.componentDestroyed$),
    ).subscribe((query) => {
      this.stepId = query.step;
      this.setActiveStepById(this.stepId);
    });
  }
}
