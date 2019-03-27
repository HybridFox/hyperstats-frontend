import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

import { Handler } from '@store/handler';

import { ACTIONS } from './action-types';
import { AuditTrailRepository } from '@api/audit-trail';

@Injectable()
export class AuditTrailActions {
  constructor(
    private handler: Handler,
    private auditTrailRepository: AuditTrailRepository,
  ) {}

  public fetchAll(): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH_ALL);

    return this.auditTrailRepository.fetchAll()
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH_ALL, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH_ALL, {
            payload: response
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH_ALL);
        }),
      );
  }
}