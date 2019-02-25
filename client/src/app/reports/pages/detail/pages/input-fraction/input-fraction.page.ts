import { Component, OnInit } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { ReportsActions } from '../../../../store/reports';
import { FormDataService } from '../../../../services/formdata.service';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';
import { StepPageAbstract } from '../step-page.abstract';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './input-fraction.page.html',
})
export class InputFractionPageComponent extends StepPageAbstract {
  public activeStepIndex = 0;
  public inputFraction: FormGroup;

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
        prevStep: 'information',
        nextStep: 'additives',
        formSection: 'inputFraction'
      }
    );
  }

  public addElement() {
    this.formData.addInputElement();
  }

  private setActiveStepById(stepId: string) {
    if (!stepId) {
      this.inputFraction = this.form.get('0');

      return setTimeout(() =>
        this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { step: this.inputFraction.get('siteRef').value } })
      );
    }

    const stepIndex = this.form.getRawValue().findIndex((step) => step.siteRef === stepId);

    this.inputFraction = this.form.get(`${stepIndex}`);
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
