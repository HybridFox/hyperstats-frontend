import { Component } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';

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

  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    protected toastrService: ToastrService,
    protected reportProcessActions: ReportsProcessActions,
    protected router: Router,
    protected route: ActivatedRoute,
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
        prevStep: ['../../additives'],
        nextStep: ['../../recycling-efficiency'],
        formSection: 'outputFraction'
      }
    );
  }

  public handleFormChanges(changes: any[]) {
    this.totalWeight = changes[0].data.reduce((totalWeight, item) =>
      item.mass !== '' && !isNaN(parseInt(item.mass, 10)) ?
        totalWeight + parseInt(item.mass, 10) :
        totalWeight, 0);
  }

  public addElement() {
    (this.outputFraction.get('data') as FormArray).push(this.formData.getOutputFractionElementFormGroup(null));
  }

  private setActiveStepById(stepId: string) {
    const stepIndex = this.form.getRawValue().findIndex((step) => step.siteRef === stepId);
    if (stepIndex !== -1) {
      this.outputFraction = this.form.get(`${stepIndex}`) as FormGroup;
    } else {
      this.formData.addOutputFraction(stepId);
      this.setActiveStepById(stepId);
    }
  }

  public onFormReady(): void {
    this.route.params
      .pipe(
        takeUntil(this.componentDestroyed$),
      )
      .subscribe((params) => {
        this.setActiveStepById(params.stepId);
      });

    this.formData.getFormData().get('outputFraction').valueChanges.pipe(
      takeUntil(this.componentDestroyed$),
    ).subscribe((value) => {
      this.handleFormChanges(value);
    });
  }
}
