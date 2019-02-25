import { Component } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { FormDataService } from '../../../../services/formdata.service';
import { OutputFraction } from '../../../../store/reports/types';
import { ReportsActions } from '../../../../store/reports';
import { StepPageAbstract } from '../step-page.abstract';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';

@Component({
  templateUrl: './output-fraction.page.html',
})
export class OutputFractionPageComponent extends StepPageAbstract {
  public activeStepIndex = 0;
  public outputFraction: FormGroup;
  public totalWeight = 0;

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
        prevStep: 'additives',
        nextStep: 'recycling-efficiency',
        formSection: 'outputFraction'
      }
    );
  }

  public handleFormChanges(changes: OutputFraction[]) {
    this.totalWeight = changes.reduce((totalWeight, item) =>
      item.mass !== '' && !isNaN(parseInt(item.mass, 10)) ?
        totalWeight + parseInt(item.mass, 10) :
        totalWeight, 0);
  }

  public addOutputFraction() {
    this.formData.addOutputElement();
  }

  public onFormReady(): void {
    this.activatedRoute.queryParams.pipe(
      takeUntil(this.componentDestroyed$),
    ).subscribe((query) => {
      this.stepId = query.step;
      this.setActiveStepById(this.stepId);
    });
  }

  private setActiveStepById(stepId: string) {
    if (!stepId) {
      this.outputFraction = this.form.get('0');

      return setTimeout(() =>
        this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { step: this.outputFraction.get('siteRef').value } })
      );
    }

    const stepIndex = this.form.getRawValue().findIndex((step) => step.siteRef === stepId);

    this.outputFraction = this.form.get(`${stepIndex}`);
    console.log(this.form);

  }
}
