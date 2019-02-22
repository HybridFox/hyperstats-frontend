import { select, select$ } from '@angular-redux/store';
import { ToastrService } from 'ngx-toastr';
import { Subject, BehaviorSubject } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';
import { FormHelper } from '@helpers/form.helper';
import { Router, ActivatedRoute } from '@angular/router';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { filter, takeUntil } from 'rxjs/operators';
import path from 'ramda/es/path';

import { CodesService } from 'src/app/core/services/codes/codes.service';
import { FormDataService } from 'src/app/reports/services/formdata.service';
import { ReportsProcessActions, ReportsProcessSelector } from 'src/app/reports/store/recycling-processes';
import { ReportsActions, ReportsSelector } from 'src/app/reports/store/reports';
import { mapToSiteMenuItems, mapRecyclingProcessesToOptions } from 'src/app/reports/services/select.helpers';
import { Option } from '@ui/form-fields/components/select/select.types';
import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';

export interface StepPageOptions {
  formSection?: string;
  prevStep?: string;
  currentStep?: string;
  nextStep?: string;
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
  @select(ReportsSelector.detail.result) public report$: BehaviorSubject<any>;
  @select(ReportsProcessSelector.detail.result) public selectedProcess$: BehaviorSubject<any>;
  @select$(ReportsProcessSelector.detail.result, mapToSiteMenuItems) public siteMenuItems$: BehaviorSubject<MenuItem>;
  @select$(ReportsProcessSelector.list.result, mapRecyclingProcessesToOptions) public processOptions$: BehaviorSubject<Option>;

  public form: any;

  protected reportId: string;
  protected componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  public abstract onFormReady(): void;

  public ngOnInit() {
    this.reportId = this.activatedRoute.snapshot.parent.params.id;

    if (this.reportId === 'new') {
      this.form = this.formData.getFormData().get(this.options.formSection);

      return this.onFormReady();
    }

    this.report$
      .pipe(
        takeUntil(this.componentDestroyed$),
        filter((report) => !!report)
      )
      .subscribe((report) => {
        const recyclingProcessId = path(['data', 'information', 'recyclingProcess'])(report) as string;

        if (recyclingProcessId) {
          this.reportProcessActions.getById(recyclingProcessId).toPromise();
        }

        setTimeout(() => {
          this.form = this.options.formSection ?
          this.formData.getFormData().get(this.options.formSection) :
          this.formData.getFormData();

          this.onFormReady();
        });
      });
  }

  public ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  public addElement() {
    this.formData.addInputElement();
  }

  public previousStep() {
    if (!this.options.prevStep) {
      return;
    }

    this.router.navigate([`../${this.options.prevStep}`], { relativeTo: this.activatedRoute });
  }

  public nextStep() {
    FormHelper.markAsDirty(this.form);

    if (!this.form.valid) {
      return this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string);
    }

    const data = {
      _id: this.reportId,
      data: this.formData.getFormData().getRawValue()
    };

    this.reportActions.draft(data)
        .toPromise()
        .then(() => {
          if (this.options.nextStep) {
            this.router.navigate([`../${this.options.nextStep}`], { relativeTo: this.activatedRoute });
          }
        })
        .catch(() => this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string));
  }
}
