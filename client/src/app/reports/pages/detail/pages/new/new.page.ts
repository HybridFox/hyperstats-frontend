import { Component, OnInit } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '@helpers/form.helper';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { select } from '@angular-redux/store';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FormDataService } from '../../../../services/formdata.service';
import { ReportsActions } from '../../../../store/reports';
import { StepPageAbstract } from '../step-page.abstract';
import { ReportsProcessActions, ReportsProcessSelector } from 'src/app/reports/store/recycling-processes';

@Component({
  templateUrl: './new.page.html',
})
export class NewPageComponent extends StepPageAbstract implements OnInit {
  @select(ReportsProcessSelector.list.result) private processes$: BehaviorSubject<any>;

  private processes: any;

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
        nextStep: 'input-fraction',
        formSection: 'information'
    });
  }

  ngOnInit() {
    super.ngOnInit();

    this.reportProcessActions.fetchAllRecyclingProcesses().toPromise();

    this.processes$
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((p) => this.processes = p);

    if (this.reportId && this.reportId !== 'new') {
      this.form.get('recyclingProcess').disable();
    }
  }

  public nextStep() {
    if (this.reportId && this.reportId !== 'new') {
      return super.nextStep();
    }

    FormHelper.markAsDirty(this.form);

    if (!this.form.valid) {
      return this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string);
    }

    const reportProcessId = this.form.get('recyclingProcess').value;
    const process = (this.processes || []).find((p) => p._id === reportProcessId);

    // this.formData.prepareProcessSteps(process);

    const data = {
      _id: this.reportId,
      data: this.formData.getFormData().getRawValue()
    };

    this.reportActions.createDrafted(data)
      .toPromise()
      .then(response => {
        if (this.options.nextStep) {
          this.router.navigate([`/recycler/reports/${response._id}/${this.options.nextStep}`]);
        }
      })
      .catch(() => this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string));
  }

  public onFormReady() {}
}
