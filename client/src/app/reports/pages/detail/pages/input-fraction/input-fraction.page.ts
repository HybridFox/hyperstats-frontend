import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { FormHelper } from '@helpers/form.helper';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { ReportsActions } from '../../../../store/reports';

@Component({
  templateUrl: './input-fraction.page.html',
})
export class InputFractionPageComponent implements OnInit {
  public form: any;
  private reportId: string;

  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reportActions: ReportsActions
  ) {}

  public ngOnInit() {
    this.form = this.formData.getFormData().get('inputFraction');
    this.reportId = this.activatedRoute.snapshot.parent.params.id;
  }

  public addElement() {
    this.formData.addInputElement();
  }

  public previousStep() {
    this.router.navigate(['../information'], {relativeTo: this.activatedRoute});
  }

  public nextStep() {
    FormHelper.markAsDirty(this.form);

    if (this.form.valid) {
      const data = {
        _id: this.reportId,
        data: this.formData.getFormData().getRawValue(),
      };

      let promise: Promise<any>;
      promise = this.reportActions.draft(data).toPromise();
          promise.then(() => {
            this.router.navigate(['../additives'], {relativeTo: this.activatedRoute});
          })
          .catch(() => {});
    } else {
      this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string);
    }
  }
}
