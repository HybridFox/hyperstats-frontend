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
    this.handler.dispatchStart(ACTIONS.FETCH);

    return this.reportsRepository.fetchAll()
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH, {
            payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.user])
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH);
        }),
      );
  }
}
