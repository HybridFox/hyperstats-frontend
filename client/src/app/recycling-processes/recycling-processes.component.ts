import { Component, OnInit } from '@angular/core';
import { RecyclingProcessesActions, RecyclingProcessesSelectors } from './store';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recycling-processes',
  templateUrl: './recycling-processes.component.html',
})
export class RecyclingProcessesComponent implements OnInit {
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
      .subscribe((processes) => {
        if (!Array.isArray(processes)) {
          return;
        }

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
