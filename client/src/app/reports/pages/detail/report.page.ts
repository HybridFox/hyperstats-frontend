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
  public selectedIndex = 0;

  private  componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

  constructor(
    public reportFormService: FormDataService,
    private recyclingProcessesActions: ReportsProcessActions,
    private reportsActions: ReportsActions,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.fetchReport();
    this.setSelectedStep();
    this.fetchRecyclingProcesses();
    this.initForm();
  }

  public ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  private setSelectedStep() {
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
        }
      });
  }

  private initForm() {
    this.report$
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((report) => {
        this.form = this.reportFormService.initForm(report);
      });
  }

  private fetchReport() {
    this.route.params
      .pipe(
        takeUntil(this.componentDestroyed$),
      )
      .subscribe(({ id }) => {
        this.reportsActions.fetchById(id).subscribe();
      });
  }

  private fetchRecyclingProcesses() {
    this.recyclingProcessesActions.fetchAllRecyclingProcesses()
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }
}
