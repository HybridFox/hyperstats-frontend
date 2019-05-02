import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

import { Handler } from '@store/handler';
import { CoreRepository } from './repository';

import { ACTIONS } from './action-types';

@Injectable()
export class CoreActions {
  constructor(
    private handler: Handler,
    private coreRepository: CoreRepository,
  ) { }

  public fetchAllGroups(sparse = true): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH_GROUPS);

    return this.coreRepository.fetchAllGroups(sparse)
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH_GROUPS, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH_GROUPS, {
            payload: response
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH_GROUPS);
        }),
      );
  }

  public fetchDashboardMonitor(monitorId: string, sparse = true): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH_DASHBOARDMONITOR);

    return this.coreRepository.fetchMonitor(monitorId, sparse, null)
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH_DASHBOARDMONITOR, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH_DASHBOARDMONITOR, {
            payload: response
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH_DASHBOARDMONITOR);
        }),
      );
  }

  public fetchMonitor(monitorId: string, dateRange: any): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH_MONITOR);

    return this.coreRepository.fetchMonitor(monitorId, false, dateRange)
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH_MONITOR, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH_MONITOR, {
            payload: response
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH_MONITOR);
        }),
      );
  }
}
