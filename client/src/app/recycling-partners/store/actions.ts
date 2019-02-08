import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

import { EntitiesActions } from '@store/entities';
import { Handler } from '@store/handler';

import { RecyclingPartnerRepository } from './repository';
import { ACTIONS } from './action-types';

@Injectable()
export class RecyclingPartnerActions {
  constructor(
    private handler: Handler,
    private entitiesActions: EntitiesActions,
    private recyclingPartnerRepository: RecyclingPartnerRepository,
  ) {
    console.log('init');
  }

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
            payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.recyclingPartner])
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH_ALL);
        }),
      );
  }

  public fetchDetail(id: string): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH);

    return this.recyclingPartnerRepository.fetchDetail(id)
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH, {
            payload: this.entitiesActions.normalize(response, EntitiesActions.schema.recyclingPartner)
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH);
        }),
      );
  }

  public create(partner: any) {
    return this.recyclingPartnerRepository.create(partner)
      .pipe(
        tap((response: any) => {
          const normalizedPayload = this.entitiesActions.normalize(response, EntitiesActions.schema.recyclingPartner);

          this.handler.dispatch(ACTIONS.ADD_TO_LIST, {
            payload: normalizedPayload,
          });
        })
      );
  }

  public update(id: string, partner: any) {
    return this.recyclingPartnerRepository.update(id, partner)
      .pipe(
        tap((response: any) => {
          this.handler.dispatch(ACTIONS.UPDATE, {
            payload: this.entitiesActions.patch('recyclingPartners', response._id, response)
          });
        })
      );
  }

  public delete(id: string) {
    return this.recyclingPartnerRepository.remove(id)
      .pipe(
        tap(() => {
          this.handler.dispatch(ACTIONS.REMOVE_FROM_LIST, {
            payload: this.entitiesActions.remove('recyclingPartners', id),
          });
        })
      );
  }
}
