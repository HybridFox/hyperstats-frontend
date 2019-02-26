import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ToastrService } from 'ngx-toastr';
import { ReportsActions } from '../../../../store/reports';
import { StepPageAbstract } from '../step-page.abstract';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
  templateUrl: './file.page.html',
})

export class FilePageComponent extends StepPageAbstract {
  public form: any;

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
        prevStep: ['../additional-information'],
      }
    );
  }

  public onFormReady() {}

  public save() {
    const data = {
      _id: this.formData.reportId,
      data: this.form.getRawValue(),
    };

    let promise: Promise<any>;
    promise = this.reportActions.draft(data).toPromise();
      promise.then(() => {
        this.router.navigate(['/', 'recycler', 'reports']);
      })
      .catch(() => this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string));
  }

  public file() {
    const data = {
      _id: this.formData.reportId,
      data: this.form.getRawValue(),
    };

    this.reportActions.file(data)
      .toPromise()
      .then(() => {
        this.router.navigate((['/', 'recycler', 'reports']));
      })
      .catch(() => this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string));
  }
}
