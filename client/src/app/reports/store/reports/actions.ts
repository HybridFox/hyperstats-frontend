import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

import { EntitiesActions } from '@store/entities';
import { Handler } from '@store/handler';

import { ReportsRepository } from '@api/reports';
import { ACTIONS } from './action-types';
import { REPORT_STATE } from '../constants';

@Injectable()
export class ReportsActions {
  constructor(
    private handler: Handler,
    private entitiesActions: EntitiesActions,
    private reportsRepository: ReportsRepository,
  ) {}

  public fetchAll(filters: any): Observable<any> {
    this.handler.dispatchStart(ACTIONS.LIST.FETCH);

    return this.reportsRepository.fetchAll(filters)
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.LIST.FETCH, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.LIST.FETCH, {
            payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.report])
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.LIST.FETCH);
        }),
      );
  }

  public fetchById(id: string): Observable<any> {
    if (!id || id === 'new') {
      this.handler.dispatch(ACTIONS.DETAIL.FETCH, {
        payload: null
      });
      return of();
    }

    this.handler.dispatchStart(ACTIONS.DETAIL.FETCH);

    return this.reportsRepository.fetchById(id)
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.DETAIL.FETCH, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.DETAIL.FETCH, {
            payload: this.entitiesActions.normalize(response, EntitiesActions.schema.report)
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.DETAIL.FETCH);
        }),
      );
  }

  public clearDetail() {
    this.handler.dispatch(ACTIONS.DETAIL.CLEAR);
  }

  public createDrafted(report: any): Observable<any> {
    return this.reportsRepository.create(report)
      .pipe(
        tap((response: any) => {
          this.handler.dispatch(ACTIONS.LIST.ADD_TO_LIST, {
            payload: this.entitiesActions.normalize(response, EntitiesActions.schema.report),
          });
        })
      );
  }

  public createFiled(report: any): Observable<any> {
    return this.reportsRepository.create(report)
      .pipe(
        tap((response: any) => {
          this.handler.dispatch(ACTIONS.LIST.ADD_TO_LIST, {
            payload: this.entitiesActions.normalize({
              ...response,
            }, EntitiesActions.schema.report),
          });
        })
      );
  }

  public draft(report: any): Observable<any> {
    return this.update(report, REPORT_STATE.SAVED);
  }

  public file(report: any): Observable<any> {
    return this.update(report, REPORT_STATE.FILED);
  }

  private update(report, state = REPORT_STATE.SAVED): Observable<any> {
    return this.reportsRepository.update(report._id, {
      ...report,
      meta: {
        ...report.meta,
        status: state
      }
    })
      .pipe(
        tap((response: any) => {
          this.handler.dispatch(ACTIONS.DETAIL.UPDATE, {
            payload: this.entitiesActions.patch('reports', response._id, response),
          });
        })
      );
  }
}
