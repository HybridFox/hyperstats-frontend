import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { FormHelper } from '@helpers/form.helper';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { OutputFraction } from '../../../../store/reports/types';
import { ReportsActions } from '../../../../store/reports';

@Component({
  templateUrl: './output-fraction.page.html',
})
export class OutputFractionPageComponent implements OnInit {
  public form: any;
  private reportId: string;
  public totalWeight = 0;

  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reportActions: ReportsActions
  ) { }

  public ngOnInit() {
    this.form = this.formData.getFormData().get('outputFraction');
    this.reportId = this.activatedRoute.snapshot.parent.params.id;

    this.form.valueChanges.pipe(
      takeUntil(this.componentDestroyed$),
    ).subscribe((value) => {
      this.handleFormChanges(value);
    });
  }

  public handleFormChanges(changes: OutputFraction[]) {
    this.totalWeight = changes.reduce((totalWeight, item) =>
      item.mass !== '' && !isNaN(parseInt(item.mass, 10)) ?
        totalWeight + parseInt(item.mass, 10) :
        totalWeight, 0);
  }

  public addOutputFraction() {
    this.formData.addOutputElement();
  }

  public previousStep() {
    this.router.navigate(['../additives'], { relativeTo: this.activatedRoute });
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
            this.router.navigate(['../recycling-efficiency'], { relativeTo: this.activatedRoute });
          })
          .catch(() => {});
    } else {
      this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string);
    }
  }
}
