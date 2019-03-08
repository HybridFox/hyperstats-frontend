import { Component } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';

import { FormDataService } from '../../../../services/formdata.service';
import { ReportsActions } from '../../../../store/reports';
import { StepPageAbstract } from '../step-page.abstract';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';

@Component({
  templateUrl: './output-fraction.page.html',
})
export class OutputFractionPageComponent extends StepPageAbstract {
  public outputFraction: FormGroup;
  private stepId: number;

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

  public addElement() {
    (this.outputFraction.get('data') as FormArray).push(this.formData.getOutputFractionElementFormGroup(null));
  }

  public removeElement(fraction: any, elementNumber: number) {
    (fraction.parent as FormArray).removeAt(elementNumber);
  }

  private setActiveStepById(stepId: string) {
    this.stepId = this.form.getRawValue().findIndex((step) => step.siteRef === stepId);
    if (this.stepId !== -1) {
      this.outputFraction = this.form.get(`${this.stepId}`) as FormGroup;
    } else {
      this.formData.addOutputFraction(stepId);
      this.setActiveStepById(stepId);
    }
  }

  public onFormReady(): void {
    this.formData.getFormMetaData().get(this.options.formSection).setValue(false);

    this.route.params
      .pipe(
        takeUntil(this.componentDestroyed$),
      )
      .subscribe((params) => {
        this.setActiveStepById(params.stepId);
      });
  }
}
