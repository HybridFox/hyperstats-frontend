import { Component, ViewEncapsulation, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FormDataService } from '../../services/formdata.service';
import { Step } from '../../store/reports/types';
import { ReportProcessActions } from '../../store/recycling-processes';

@Component({
  selector: 'app-new-report',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './report.component.html',
})
export class ReportPageComponent implements OnInit, OnDestroy, AfterContentInit {
  public data: FormGroup;
  public steps: Step[];
  public selectedIndex = 0;
  public currentTitle: string;
  public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

  constructor(
    public formData: FormDataService,
    private recyclingProcessesActions: ReportProcessActions,
    private router: Router
  ) {}

  public ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          const route = event.url.split('/').slice(-1)[0];
          [this.selectedIndex, this.currentTitle] = this.steps.reduce((acc, step, index) => step.route === route ? [
            index,
            step.name
          ] : acc, []);
        }
      });

    this.recyclingProcessesActions.fetchAllRecyclingProcesses()
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();

    this.data = this.formData.getFormData();
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
    this.selectedIndex = this.steps.reduce((acc, step, index) => step.route === this.router.url.split('/').slice(-1)[0] ? index : acc, 0);
    this.currentTitle = this.steps.reduce((acc, step) =>
      step.route === this.router.url.split('/').slice(-1)[0] ? step.name : acc, '');
  }
}
