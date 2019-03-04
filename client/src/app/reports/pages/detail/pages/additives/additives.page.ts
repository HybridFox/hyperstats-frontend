import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray } from '@angular/forms';

import { StepPageAbstract } from '../step-page.abstract';
import { FormGroup } from '@angular/forms';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';
import { ReportsActions } from 'src/app/reports/store/reports';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './additives.page.html',
})
export class AdditivesPageComponent extends StepPageAbstract implements OnInit {
  public activeStepIndex = 0;
  public additive: FormGroup;

  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    public toastrService: ToastrService,
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
        prevStep: ['../../input-fraction'],
        nextStep: ['../../output-fraction'],
        formSection: 'additives'
      }
    );
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  public addAdditive() {
    (this.additive.get('data') as FormArray).push(this.formData.getInputFractionElementFormGroup(null));
  }

  private setActiveStepById(stepId: string) {
    const stepIndex = this.form.getRawValue().findIndex((step) => step.siteRef === stepId);
    if (stepIndex !== -1) {
      this.additive = this.form.get(`${stepIndex}`) as FormGroup;
    } else {
      this.formData.addAdditive(stepId);
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
