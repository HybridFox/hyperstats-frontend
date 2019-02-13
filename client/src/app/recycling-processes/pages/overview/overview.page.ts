import { Component, OnInit, OnDestroy } from '@angular/core';
import { select$ } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';

import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { RecyclingProcessesActions, RecyclingProcessesSelectors } from '../../store';
import { processToMenuItemObservableHandler } from './select.helpers';

@Component({
  templateUrl: './overview.page.html',
})
export class OverviewPageComponent implements OnInit, OnDestroy {
  @select$(RecyclingProcessesSelectors.list.result, processToMenuItemObservableHandler) public $processMenuItems: Observable<any[]>;

  public menuItems: MenuItem[] = [];

  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private recyclingProcessesActions: RecyclingProcessesActions
  ) {}

  ngOnInit() {
    this.recyclingProcessesActions.fetchAll().toPromise();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
