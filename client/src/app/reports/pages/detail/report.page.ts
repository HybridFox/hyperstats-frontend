import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { FormDataService } from '../../services/formdata.service';
import { Step } from '../../store/reports/types';
import { ReportsProcessActions } from '../../store/recycling-processes';
import { ReportsActions, ReportsSelector } from '../../store/reports';
import { select } from '@angular-redux/store';

@Component({
  templateUrl: './report.page.html',
})
export class ReportPageComponent implements OnInit, OnDestroy {
  @select(ReportsSelector.detail.result) public report$: Observable<any>;

  public form: FormGroup;
  public steps: Step[] = [
    {
      name: 'WIZARD.TITLES.NEW-REPORT',
      route: 'information',
      key: 'information',
    },
    {
      name: 'WIZARD.TITLES.INPUT-FRACTION',
      route: 'input-fraction',
      key: 'inputFraction',
    },
    {
      name: 'WIZARD.TITLES.ADDITIVES',
      route: 'additives',
      key: 'additives',
    },
    {
      name: 'WIZARD.TITLES.OUTPUT-FRACTION',
      route: 'output-fraction',
      key: 'outputFraction',
    },
    {
      name: 'WIZARD.TITLES.RECYCLING-EFFICIENCY',
      route: 'recycling-efficiency',
      key: 'recyclingEfficiency',
    },
    {
      name: 'WIZARD.TITLES.ADDITIONAL-INFORMATION',
      route: 'additional-information',
      key: 'additionalInformation',
    },
    {
      name: 'WIZARD.TITLES.FILE-REPORT',
      route: 'file-report',
      key: ''
    },
  ];

  private  componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

  constructor(
    public reportFormService: FormDataService,
    private reportProcessActions: ReportsProcessActions,
    private reportsActions: ReportsActions,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.fetchReport();
    this.fetchRecyclingProcesses();
    this.watchReport();

    if (this.form) {

      this.form.valueChanges
        .pipe(
          takeUntil(this.componentDestroyed$),
        )
        .subscribe((form) => {
          console.log(form);
          console.log(form.inputFraction);
        });
    }
  }

  public ngOnDestroy() {
    this.reportsActions.clearDetail();
    this.reportProcessActions.clearDetail();
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  private watchReport() {
    this.report$
      .pipe(
        filter((report) => {
          return !!report;
        }),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((report) => {
        this.initForm(report);
      });
  }

  private fetchReport() {
    this.route.params
      .pipe(
        takeUntil(this.componentDestroyed$),
      )
      .subscribe(({ id }) => {
        if (id === 'new') {
          this.initForm();
        } else {
          this.reportsActions.fetchById(id).subscribe();
        }
      });
  }

  private fetchRecyclingProcesses() {
    this.reportProcessActions.fetchAllRecyclingProcesses()
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }

  private initForm(report = null) {
    this.form = this.reportFormService.initForm(report);

    const control = this.form.get('information.recyclingProcess');

    if (control.value) {
      this.reportProcessActions.getById(control.value).toPromise();
    }

    control
      .valueChanges
      .pipe(
        takeUntil(this.componentDestroyed$),
      )
      .subscribe((id) => {
        console.log('FETH');
        this.reportProcessActions.getById(id).toPromise();
      });
  }
}
