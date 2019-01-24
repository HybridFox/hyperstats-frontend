import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

import { EntitiesActions } from '@store/entities';
import { Handler } from '@store/handler';

import { ReportsRepository } from '@api/reports';
import { ACTIONS } from './action-types';

@Injectable()
export class RecyclingProcessesActions {
  constructor(
    private handler: Handler,
    private entitiesActions: EntitiesActions,
    private reportsRepository: ReportsRepository,
  ) {}

  public fetchAll(): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH_ALL);

    return this.reportsRepository.fetchAll()
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH_ALL, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH_ALL, {
            payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.recyclingProcess])
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH_ALL);
        }),
      );
  }
}
