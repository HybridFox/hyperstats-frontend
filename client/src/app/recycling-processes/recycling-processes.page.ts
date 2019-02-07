import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { RecyclingProcessesActions, RecyclingProcessesSelectors } from './store';

@Component({
  templateUrl: './recycling-processes.page.html',
})
export class RecyclingProcessesPageComponent implements OnInit {
  @select(RecyclingProcessesSelectors.list.result) $processes: Observable<any[]>;

  public menuItems: MenuItem[] = [];

  private _componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private recyclingProcessesActions: RecyclingProcessesActions
  ) {}

  ngOnInit() {
    this.recyclingProcessesActions.fetchAll().toPromise();

    this.$processes
      .pipe(takeUntil(this._componentDestroyed$))
      .pipe(filter((processes) => Array.isArray(processes)))
      .subscribe((processes) => {
        this.menuItems = processes.reduce((acc, process) => process ? acc.concat({
          label: process.data.name,
          link: process._id
        } as MenuItem) : acc, []);
      });
  }

  ngOnDesroy() {
    this._componentDestroyed$.next(true);
    this._componentDestroyed$.complete();
  }
}
