import { Component } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';

import { FormDataService } from '../../../../services/formdata.service';
import { ReportsActions } from '../../../../store/reports';
import { StepPageAbstract } from '../step-page.abstract';
import { ReportsProcessActions, ReportsProcessSelector } from 'src/app/reports/store/recycling-processes';
import { select$ } from '@angular-redux/store';
import { RecyclingPartnerSelector } from 'src/app/recycling-partners/store';
import { companiesToSelectOptions, processStepsToSelectOptions } from '@helpers/select.helpers';
import { Observable, BehaviorSubject } from 'rxjs';
import { CLASSIFICATIONS } from './classifications.const';

@Component({
  templateUrl: './output-fraction.page.html',
})
export class OutputFractionPageComponent extends StepPageAbstract {
  @select$(RecyclingPartnerSelector.list.result, companiesToSelectOptions) public partners$: Observable<any[]>;
  @select$(ReportsProcessSelector.detail.result, processStepsToSelectOptions) public processSteps$: BehaviorSubject<any>;
  public outputFraction: FormGroup;
  private stepId: number;
  public classifications = CLASSIFICATIONS;

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
    this.watchClassification();
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

  private watchClassification() {
    const formArr = (this.outputFraction.get('data') as FormArray);
      formArr.valueChanges
      .pipe(
        takeUntil(this.componentDestroyed$),
      )
      .subscribe(arr => {
        arr.forEach((element, index) => {
          formArr.at(index).get('virginClassification').valueChanges
            .pipe(
              takeUntil(this.componentDestroyed$),
            )
            .subscribe(input => {
              if (input === this.classifications.INTERMEDIATE) {
                formArr.at(index).get('elementDestinationIndustry').reset();
                formArr.at(index).get('elementDestinationCompany').reset();
              }
              if (input !== this.classifications.INTERMEDIATE) {
                formArr.at(index).get('assignedStep').reset();
              }
            });
        });
      });
  }
}
