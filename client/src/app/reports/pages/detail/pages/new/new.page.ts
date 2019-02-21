import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '@helpers/form.helper';
import { select$ } from '@angular-redux/store';
import { ReportsProcessSelector } from '../../../../store/recycling-processes/selectors';
import { Observable } from 'rxjs';
import { mapRecyclingProcessesToOptions } from '../../../../services/select.helpers';

import { ReportsActions } from '../../../../store/reports';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { zip } from 'rxjs/operators';

@Component({
  templateUrl: './new.page.html',
})
export class NewPageComponent implements OnInit {
  @select$(ReportsProcessSelector.recyclingProcesses, mapRecyclingProcessesToOptions) recyclingProcesses$: Observable<any>;

  public mappedRecyclingProcesses$: Observable<any>;
  public form: any;

  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reportActions: ReportsActions
  ) {}

  public ngOnInit() {
    this.form = this.formData.getFormData().get('information');
  }

  public nextStep() {
    FormHelper.markAsDirty(this.form);

    if (this.form.valid) {

      const data = {
        data: this.formData.getFormData().getRawValue(),
        meta: {
          status: 'SAVED',
        }
      };

      let promise: Promise<any>;
      promise = this.reportActions.createDrafted(data).toPromise();
          promise.then((response) => {
              this.router.navigate([`/recycler/reports/${response._id}/input-fraction`]);
          })
          .catch(() => {});
    } else {
      this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string);
    }
  }
}
