import { Component, OnInit } from '@angular/core';
import { select$ } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';

import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { RecyclingProcessesActions, RecyclingProcessesSelectors } from '../../store';
import { ReportsActions } from '../../../reports/store/reports';
import { processToMenuItemObservableHandler } from './select.helpers';

@Component({
  templateUrl: './overview.page.html',
})
export class OverviewPageComponent implements OnInit {
  @select$(RecyclingProcessesSelectors.list.result, processToMenuItemObservableHandler) public $processMenuItems: Observable<any[]>;

  public menuItems: MenuItem[] = [];

  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private recyclingProcessesActions: RecyclingProcessesActions,
    private reportActions: ReportsActions,
  ) { }

  ngOnInit() {
    this.recyclingProcessesActions.fetchAll().toPromise();
    this.reportActions.fetchAll({}).toPromise();
  }

  ngOnDesroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
