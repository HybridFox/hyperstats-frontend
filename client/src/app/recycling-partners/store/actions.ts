import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

import { EntitiesActions } from '@store/entities';
import { Handler } from '@store/handler';

import { RecyclingPartnerRepository } from '@api/recycling-partner';
import { ACTIONS } from './action-types';

@Injectable()
export class RecyclingPartnerActions {
  constructor(
    private handler: Handler,
    private entitiesActions: EntitiesActions,
    private recyclingPartnerRepository: RecyclingPartnerRepository,
  ) {}

  public fetchAll(): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH_ALL);

    return this.recyclingPartnerRepository.fetchAll()
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH_ALL, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH_ALL, {
            payload: response,//this.entitiesActions.normalize(response, [EntitiesActions.schema.recyclingPartner])
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH_ALL);
        }),
      );
  }
}
