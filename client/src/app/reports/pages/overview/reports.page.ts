import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, select$ } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CompanyType } from '@api/company';
import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { UserInterface } from '@store/auth/auth.interface';

import { ReportsActions, ReportsSelector } from '../../store/reports';
import { Report } from '../../store/reports/types';
import { mapRecyclingProcessesToMenuItemsWithAll, mapReportToMenuItemsWithAll } from '../../services/select.helpers';

import { ReportsProcessActions, ReportsProcessSelector } from '../../store/recycling-processes';
import { SORTOPTIONS, SORTOPTIONS_SHARED_REPORTS } from './reports.const';
import pathOr from 'ramda/es/pathOr';

@Component({
  templateUrl: './reports.page.html',
})
export class ReportsPageComponent implements OnInit {
  @select(['auth', 'user', 'result']) private user$: Observable<UserInterface>;
  @select(ReportsSelector.list.result) public reports$: Observable<Report[]>;
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
  public processId: string;
  public recyclerId: string;
  public sortOptions = SORTOPTIONS;

  constructor(
    private reportsActions: ReportsActions,
    private reportsProcessActions: ReportsProcessActions,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user$.subscribe((user) => {
      this.userIsRecycler = (pathOr('', ['company', 'meta', 'type'], user) !== CompanyType.AO
        && pathOr('', ['company', 'meta', 'type'], user) !== CompanyType.CO);
      if (!this.userIsRecycler) {
        this.sortOptions = SORTOPTIONS_SHARED_REPORTS;
      }
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
        this.processId = params.recyclingProcess;
        this. recyclerId = params.recycler;

        this.reportsActions.fetchAll({
          processId: this.processId,
          recyclerId: this.recyclerId,
        }).toPromise();
      });

    this.reportsProcessActions.fetchAllRecyclingProcesses().toPromise();
  }

  public sortBy(event) {
    if (event.srcElement.value) {
      this.reportsActions.fetchAll({
        processId: this.processId,
        recyclerId: this.recyclerId,
        sortBy: event.srcElement.value,
      }).toPromise();
    }
  }
}
