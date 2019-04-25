import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { combineReducers } from 'redux';
import { set, lensProp } from 'ramda';

import { reducers } from '@store/reducers';

@Injectable()
export class StoreService {
  public asyncReducers = {};

  constructor(
    private ngRedux: NgRedux<any>,
  ) {}

  public createReducer(asyncReducers) {
    return combineReducers({
      ...reducers,
      ...asyncReducers,
    });
  }

  public injectAsyncReducer(name, reducer) {
    const lens = lensProp(name.toString());
    this.asyncReducers = set(lens, reducer, this.asyncReducers);
    this.ngRedux.replaceReducer(this.createReducer(this.asyncReducers));
  }
}
