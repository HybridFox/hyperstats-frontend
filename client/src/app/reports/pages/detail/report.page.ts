import { Component, ViewEncapsulation, OnInit, OnDestroy, AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
  templateUrl: './report.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportPageComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
  @select(ReportsSelector.detail.result) public report$: Observable<any>;

  public data: FormGroup;
  public steps: Step[];
  public selectedIndex = 0;
  public currentTitle: string;
  public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

  constructor(
    public formData: FormDataService,
    private recyclingProcessesActions: ReportsProcessActions,
    private reportsActions: ReportsActions,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          const route = (event.url.split('/').slice(-1)[0]).split('?')[0];
          [this.selectedIndex] = this.steps.reduce((acc, step, index) => step.route === route ? [
            index,
            step.name
          ] : acc, []);
          this.setReportTitle();
        }
      });

    this.recyclingProcessesActions.fetchAllRecyclingProcesses()
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();

    this.report$
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((report) => {
        this.data = this.formData.setFormData(report);
      });

    this.route.params
      .pipe(
        takeUntil(this.componentDestroyed$),
      )
      .subscribe(({ id }) => {
        this.reportsActions.fetchById(id).subscribe();
      });

    this.steps = [
      {
        name: 'WIZARD.TITLES.NEW-REPORT',
        route: 'information'
      },
      {
        name: 'WIZARD.TITLES.INPUT-FRACTION',
        route: 'input-fraction'
      },
      {
        name: 'WIZARD.TITLES.ADDITIVES',
        route: 'additives'
      },
      {
        name: 'WIZARD.TITLES.OUTPUT-FRACTION',
        route: 'output-fraction'
      },
      {
        name: 'WIZARD.TITLES.RECYCLING-EFFICIENCY',
        route: 'recycling-efficiency'
      },
      {
        name: 'WIZARD.TITLES.ADDITIONAL-INFORMATION',
        route: 'additional-information'
      },
      {
        name: 'WIZARD.TITLES.FILE-REPORT',
        route: 'file-report'
      },
    ];
  }

  public ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  public ngAfterContentInit(): void {
    this.selectedIndex = this.steps.reduce((acc, step, index) =>
      step.route === (this.router.url.split('/').slice(-1)[0]).split('?')[0] ? index : acc, 0);

    this.setReportTitle();
  }

  private setReportTitle() {
    const reportName = this.data.get('information').get('name').value;
    this.currentTitle = (reportName && reportName !== '') ? reportName : 'WIZARD.TITLES.NEW-REPORT';
  }

  public ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
}
