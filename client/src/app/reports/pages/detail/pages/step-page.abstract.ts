import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';
import { FormHelper } from '@helpers/form.helper';
import { Router, ActivatedRoute } from '@angular/router';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

import { CodesService } from 'src/app/core/services/codes/codes.service';
import { FormDataService } from 'src/app/reports/services/formdata.service';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';
import { ReportsActions } from 'src/app/reports/store/reports';

export interface StepPageOptions {
  formSection?: string;
  prevStep?: string[];
  currentStep?: string;
  nextStep?: string[];
}

export abstract class StepPageAbstract implements OnInit, OnDestroy {
  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    protected toastrService: ToastrService,
    protected reportProcessActions: ReportsProcessActions,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected reportActions: ReportsActions,
    protected options: StepPageOptions
  ) {}

  public form: FormGroup;

  protected componentDestroyed$: Subject<boolean> = new Subject<boolean>(); // keep this --> used in child components

  public abstract onFormReady(): void;

  public ngOnInit() {
    this.form = this.formData.getFormData().get(this.options.formSection) as FormGroup;
    this.onFormReady();
  }

  public ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  public previousStep() {
    if (!this.options.prevStep) {
      return;
    }

    this.router.navigate(this.options.prevStep, { relativeTo: this.activatedRoute });
  }

  public nextStep() {
    FormHelper.markAsDirty(this.form);

    console.log(this.form);

    if (!this.form.valid) {
      return this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string);
    }

    const data = {
      _id: this.formData.reportId,
      data: this.formData.getFormData().value,
    };

    this.reportActions.draft(data)
        .toPromise()
        .then(() => {
          if (this.options.nextStep) {
            this.router.navigate(this.options.nextStep, { relativeTo: this.activatedRoute });
          }
        })
        .catch(() => this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string));
  }
}
