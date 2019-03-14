import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, select$ } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CompanyType } from '@api/company';
import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { ReportsActions, ReportsSelector } from '../../store/reports';
import { mapRecyclingProcessesToMenuItemsWithAll, mapReportToMenuItemsWithAll } from '../../services/select.helpers';
import { ReportsProcessActions, ReportsProcessSelector } from '../../store/recycling-processes';

@Component({
  templateUrl: './reports.page.html',
})
export class ReportsPageComponent implements OnInit {
  @select(['auth', 'user', 'result']) private user$: Observable<any>;
  @select(ReportsSelector.list.result) public reports$: Observable<any>;
  @select(ReportsSelector.list.loading) public reportsLoading$: Observable<boolean>;

  @select$(
    ReportsProcessSelector.list.result,
    mapRecyclingProcessesToMenuItemsWithAll
  ) public processesMenuItems$: Observable<MenuItem>;
  @select$(
    ReportsSelector.companies.result,
    mapReportToMenuItemsWithAll
  ) public recyclerMenuItems$: Observable<MenuItem>;

  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  public reportsActive = false;
  public userIsRecycler = true;

  constructor(
    private reportsActions: ReportsActions,
    private reportsProcessActions: ReportsProcessActions,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user$.subscribe((user) => {
      this.userIsRecycler = (user.company.meta.type !== CompanyType.AO && user.company.meta.type !== CompanyType.CO);
    });

    this.reports$.subscribe((reports) => {
      if (reports && reports.length > 0) {
        this.reportsActive = true;
      }
    });

    this.reportsActions.fetchAllCompanies().toPromise();

    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(params => {
        this.reportsActions.fetchAll({
          processId: params.recyclingProcess,
          recyclerId: params.recycler,
        }).toPromise();
      });

    this.reportsProcessActions.fetchAllRecyclingProcesses().toPromise();
  }
}
