import { Component, OnInit } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { select$, select } from '@angular-redux/store';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '@helpers/form.helper';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { BehaviorSubject, Observable } from 'rxjs';

import { ReportsActions } from '../../../../store/reports';
import { mapRecyclingProcessesToOptions } from '../../../../services/select.helpers';
import { Option } from '@ui/form-fields/components/select/select.types';
import { FormDataService } from '../../../../services/formdata.service';
import { StepPageAbstract } from '../step-page.abstract';
import { ReportsProcessActions, ReportsProcessSelector } from '../../../../store/recycling-processes';

@Component({
  templateUrl: './new.page.html',
})
export class NewPageComponent extends StepPageAbstract implements OnInit {
  @select$(ReportsProcessSelector.list.result, mapRecyclingProcessesToOptions) public processOptions$: BehaviorSubject<Option>;

  public showForm: boolean;

  constructor(
    codesService: CodesService,
    reportFormService: FormDataService,
    toastrService: ToastrService,
    reportProcessActions: ReportsProcessActions,
    router: Router,
    activatedRoute: ActivatedRoute,
    reportActions: ReportsActions,
  ) {
    super(
      codesService,
      reportFormService,
      toastrService,
      reportProcessActions,
      router,
      activatedRoute,
      reportActions,
      {
        nextStep: ['../input-fraction'],
        formSection: 'information'
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.formData.formGroup.status === 'DISABLED' ? this.showForm = true : this.showForm = false;
  }

  public nextStep() {
    if (this.formData.reportId && this.formData.reportId !== 'new') {
      return super.nextStep();
    }

    FormHelper.markAsDirty(this.form);

    if (!this.form.valid) {
      return this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string);
    }

    const data = {
      _id: this.formData.reportId,
      data: this.formData.getFormData().getRawValue(),
      meta: {
        state: {
          isPristine: this.formData.getFormMetaData().getRawValue(),
        }
      }
    };

    this.reportActions.createDrafted(data)
      .toPromise()
      .then(response => {
        if (this.options.nextStep) {
          this.router.navigate([`/recycler/reports/${response._id}/${this.options.nextStep}`], { relativeTo: this.activatedRoute });
        }
      })
      .catch(() => this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string));
  }

  public onFormReady() {
    if (this.formData.reportId && this.formData.reportId !== 'new' && this.form.get('recyclingProcess').value) {
      this.form.get('recyclingProcess').disable();
    }
  }
}
