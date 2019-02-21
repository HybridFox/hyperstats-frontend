import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

import { EntitiesActions } from '@store/entities';
import { Handler } from '@store/handler';

import { ACTIONS } from './action-types';
import { CompanyRepository, CompanyType } from '@api/company';

@Injectable()
export class RecyclingPartnerActions {
  constructor(
    private handler: Handler,
    private entitiesActions: EntitiesActions,
    private companyRepository: CompanyRepository,
  ) {}

  public fetchAll(): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH_ALL);

    return this.companyRepository.fetchByType([CompanyType.RP])
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

  public fetchById(id: string): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH);

    return this.companyRepository.fetchById(id)
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
    return this.companyRepository.create(partner)
      .pipe(
        tap((response: any) => {
          const normalizedPayload = this.entitiesActions.normalize(response, EntitiesActions.schema.recyclingPartner);

          this.handler.dispatch(ACTIONS.ADD_TO_LIST, {
            payload: normalizedPayload,
          });
        })
      );
  }

  public update(partner: any) {
    return this.companyRepository.update(partner._id, partner)
      .pipe(
        tap((response: any) => {
          this.handler.dispatch(ACTIONS.UPDATE, {
            payload: this.entitiesActions.patch('recyclingPartners', response._id, response)
          });
        })
      );
  }

  public delete(id: string) {
    return this.companyRepository.remove(id)
      .pipe(
        tap(() => {
          this.handler.dispatch(ACTIONS.REMOVE_FROM_LIST, {
            payload: this.entitiesActions.remove('recyclingPartners', id),
          });
        })
      );
  }

  public activate(id: string) {
    return this.companyRepository.activate(id)
      .pipe(
        tap((response: any) => {
          this.handler.dispatch(ACTIONS.ACTIVATE, {
            payload: this.entitiesActions.patch('recyclingPartners', id, response),
          });
        })
      );
  }

  public deactivate(id: string) {
    return this.companyRepository.deactivate(id)
      .pipe(
        tap((response: any) => {
          this.handler.dispatch(ACTIONS.DEACTIVATE, {
            payload: this.entitiesActions.patch('recyclingPartners', id, response),
          });
        })
      );
  }
}
