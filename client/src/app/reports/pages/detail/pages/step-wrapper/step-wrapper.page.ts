import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { select$, select } from '@angular-redux/store';
import { map, filter } from 'rxjs/operators';

import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { ReportsProcessSelector } from 'src/app/reports/store/recycling-processes';
import { mapToSiteMenuItems } from 'src/app/reports/services/select.helpers';

@Component({
  templateUrl: './step-wrapper.page.html',
})
export class StepWrapperPageComponent implements OnInit {
  @select$(ReportsProcessSelector.detail.result, mapToSiteMenuItems) public siteMenuItems$: BehaviorSubject<MenuItem[]>;
  @select(ReportsProcessSelector.detail.result) public process$: BehaviorSubject<any>;
  public title$;

  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  public ngOnInit() {
    if (!this.route.firstChild) {
      this.siteMenuItems$
        .pipe(
          takeUntil(this.componentDestroyed$)
        )
        .subscribe((links) => {
          if (links.length > 0) {
            this.router.navigate(links[0].link, { relativeTo: this.route });
          }
        });
    }

    setTimeout(() => {
      this.title$ = combineLatest(
        this.process$,
        this.route.firstChild ? this.route.firstChild.params : null
      )
      .pipe(
        map(([process, params]) => {
          if (!process) {
            return;
          }
          return process.data.steps.find((step) => {
            return step.uuid === params.stepId;
          });
        }),
        map((step) => {
          if (!step) {
            return;
          }
          return step.description || 'WIZARD.NEW-REPORT.LABELS.RECYCLING-PROCESS';
        }),
      );
    }, 1);
  }
}
