import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

import { EntitiesActions } from '@store/entities';
import { Handler } from '@store/handler';

import { ReportsRepository } from '@repository/reports';
import { ACTIONS } from './action-types';

@Injectable()
export class TasksActions {
  constructor(
    private handler: Handler,
    private entitiesActions: EntitiesActions,
    private reportsRepository: ReportsRepository,
  ) {}

  public fetchAll(page: number, itemsPerPage: number, sort: any, filters: any[]): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH);

    return this.reportsRepository.fetchAll(page, itemsPerPage, sort, filters)
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH, {
            payload: this.entitiesActions.normalize(response.results, [EntitiesActions.schema.reports]),
            pagination: response.pagination,
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH);
        }),
      );
  }
}
