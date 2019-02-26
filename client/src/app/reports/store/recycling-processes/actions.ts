import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

import { EntitiesActions } from '@store/entities';
import { Handler } from '@store/handler';

import { RecyclingProcessesRepository } from '@api/recycling-processes';
import { ACTIONS } from './action-types';
import { NgRedux } from '@angular-redux/store';
import path from 'ramda/es/path';
import { detailPath } from './detail/selectors';

@Injectable()
export class ReportsProcessActions {
  constructor(
    private ngRedux: NgRedux<any>,
    private handler: Handler,
    private entitiesActions: EntitiesActions,
    private recyclingProcessesRepository: RecyclingProcessesRepository,
  ) {}

  public fetchAllRecyclingProcesses(): Observable<any> {
    this.handler.dispatchStart(ACTIONS.LIST.FETCH);

    return this.recyclingProcessesRepository.fetchAll()
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.LIST.FETCH, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.LIST.FETCH, {
            payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.recyclingProcess])
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.LIST.FETCH);
        }),
      );
  }

  public getById(id: string): Observable<any> {
    const currStoreId = path(detailPath, this.ngRedux.getState());

    if (currStoreId === id) {
      return of();
    }

    this.handler.dispatchStart(ACTIONS.DETAIL.FETCH);

    return this.recyclingProcessesRepository.fetchById(id)
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.DETAIL.FETCH, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.DETAIL.FETCH, {
            payload: this.entitiesActions.normalize(response, EntitiesActions.schema.recyclingProcess)
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
}
