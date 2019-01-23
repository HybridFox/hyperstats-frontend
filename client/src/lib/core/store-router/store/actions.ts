import { Injectable } from '@angular/core';
import { throwError as _throw } from 'rxjs';

import { Handler } from '@store/handler';

import { ACTIONS } from './action-types';
import { StoreRouterState } from '../types';

@Injectable()
export class StoreRouterActions {
  constructor(
    private handler: Handler,
  ) {}

  public dataChanged(data: any): void {
    this.handler.dispatch(ACTIONS.UPDATE_DATA, {
        payload: data
    });
  }

  public urlChanged(url: string): void {
    this.handler.dispatch(ACTIONS.UPDATE_URL, {
        payload: url
    });
  }
}
