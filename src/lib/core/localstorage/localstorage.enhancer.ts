import { NgRedux, PathSelector } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { isEqual } from 'lodash-es';

import { isNotNil } from '@helpers/rxjs-filters';

import { Utils } from './utils';
import { LocalstorageService } from './localstorage.service';
import { Selector, PropertySelector } from './localstorage.types';

@Injectable()
export class LocalstorageReduxPlugin {
  private subscribers: Map<Selector, Subscription> = new Map<Selector, Subscription>();

  constructor(
    private ngRedux: NgRedux<any>,
    private localstorageService: LocalstorageService,
  ) { }

  public subscribe(selectors?: Array<Selector>): void {
    this.ngRedux.select()
      .pipe(
        isNotNil,
        first(),
      )
      .subscribe(store => {
        if (!selectors) {
          this.subscribeSelector('reduxState');
          return;
        }

        selectors.forEach(selector => this.subscribeSelector(selector));
      });
  }

  public selectFromStorage(selectors?: Array<Selector>): any {
    if (!selectors || !selectors.length) {
      return this.localstorageService.getItem('reduxState');
    }

    return selectors.reduce((acc, selector) => {
      const storedData = Utils.select(this.localstorageService.snapshot, selector);
      const pathSelector: PathSelector = Array.isArray(selector) ? selector : [selector as PropertySelector];

      Utils.updateOrCreatePath(acc, pathSelector, storedData);

      return acc;
    }, {});
  }

  private subscribeSelector(selector: Selector): void {
    if (!selector) {
      return;
    }

    const subscriber = this.subscribers.get(selector);

    if (subscriber) {
      subscriber.unsubscribe();
    }

    this.subscribers.set(selector, this.ngRedux.subscribe(() => {
      const selectorKey = Array.isArray(selector) ? selector.join('.') : String(selector);
      const stored = this.localstorageService.getItem(selectorKey);
      const newValues = selector === 'reduxState' ? this.ngRedux.getState() :
        Utils.select(this.ngRedux.getState(), selector);

      if (isEqual(stored, newValues)) {
        return;
      }

      this.localstorageService.setItem(selectorKey, newValues);
    }) as any);
  }
}
