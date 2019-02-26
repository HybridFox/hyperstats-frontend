import { Component, OnInit } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray } from '@angular/forms';

import { ReportsActions } from '../../../../store/reports';
import { FormDataService } from '../../../../services/formdata.service';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';
import { StepPageAbstract } from '../step-page.abstract';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './input-fraction.page.html',
})
export class InputFractionPageComponent extends StepPageAbstract implements OnInit {
  public inputFraction: FormGroup;

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
        prevStep: ['../../information'],
        nextStep: ['../../additives'],
        formSection: 'inputFraction'
      }
    );
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  public addElement() {
    (this.inputFraction.get('data.elements') as FormArray).push(this.formData.getInputFractionElementFormGroup(null));
  }

  private setActiveStepById(stepId: string) {
    const stepIndex = this.form.getRawValue().findIndex((step) => step.siteRef === stepId);
    if (stepIndex !== -1) {
      this.inputFraction = this.form.get(`${stepIndex}`) as FormGroup;
    } else {
      this.formData.addInputFraction(stepId);
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
  }
}
