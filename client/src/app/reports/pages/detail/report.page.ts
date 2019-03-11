import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil, filter, tap, map, switchMap } from 'rxjs/operators';
import { pathOr } from 'ramda';

import { FormDataService } from '../../services/formdata.service';
import { Step, Report } from '../../store/reports/types';
import { RecyclingProcess, ProcessStep } from '../../store/recycling-processes/types';
import { ReportsProcessActions, ReportsProcessSelector } from '../../store/recycling-processes';
import { ReportsActions, ReportsSelector } from '../../store/reports';
import { select } from '@angular-redux/store';

@Component({
  templateUrl: './report.page.html',
})
export class ReportPageComponent implements OnInit, OnDestroy {
  @select(ReportsSelector.detail.result) public report$: Observable<Report>;
  @select(ReportsProcessSelector.detail.result) public process$: BehaviorSubject<RecyclingProcess>;

  public form: FormGroup;
  public currentId = 'new';

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

  private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

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
        this.currentId = id;
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

    if (!this.form && pathOr('SAVED', ['meta', 'status'], report) === 'FILED') {
      this.form.disable();
    }

    control
      .valueChanges
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap((id: string) => {
          this.reportProcessActions.getById(id).toPromise();
        }),
        switchMap(() => {
          return this.process$;
        }),
        filter((process: RecyclingProcess) => {
          return !!process;
        }),
        map((process: RecyclingProcess) => {
          return process.data.steps;
        }),
        filter((steps: ProcessStep[]) => {
          return steps.length > 0;
        }),
      )
      .subscribe((steps) => {
        if (this.currentId === 'new') {
          this.reportFormService.clearInputFractions();
          this.reportFormService.clearOutputFractions();
          this.reportFormService.clearAdditives();

          steps.forEach((step) => {
            this.reportFormService.addInputFraction(step.uuid);
            this.reportFormService.addOutputFraction(step.uuid);
            this.reportFormService.addAdditive(step.uuid);
          });
        }
      });
  }
}
