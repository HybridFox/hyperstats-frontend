import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';

import { Handler } from '@store/handler';
import { EntitiesActions } from '@store/entities';

import { ACTIONS } from './action-types';
import { CompanyType, CompanyRepository } from '@api/company';

@Injectable()
export class CompaniesActions {
    constructor(
        private handler: Handler,
        private entitiesActions: EntitiesActions,
        private companyRepository: CompanyRepository,
    ) { }

    public fetchByType(types: CompanyType[]): Observable<any> {
        if (!Array.isArray(types) || !types.length) {
            return of(this.handler.dispatchSuccess(ACTIONS.OVERVIEW.FETCH, {
                payload: [],
                pagination: null
            }));
        }

        this.handler.dispatchStart(ACTIONS.OVERVIEW.FETCH);

        return this.companyRepository.fetchByType(types)
            .pipe(
                catchError((error) => {
                    this.handler.dispatchError(ACTIONS.OVERVIEW.FETCH, {
                      message: error.message,
                    });

                    return throwError(error);
                }),
                tap((response) => {
                    this.handler.dispatchSuccess(ACTIONS.OVERVIEW.FETCH, {
                        payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.company]),
                        pagination: null,
                    });
                }),
                finalize(() => {
                    this.handler.dispatchDone(ACTIONS.OVERVIEW.FETCH);
                })
            );
    }

    public fetchById(id: string): Observable<any> {
        if (id === 'new') {
            return of(this.handler.dispatchSuccess(ACTIONS.DETAIL.FETCH, {
                payload: null
            }));
        }

        this.handler.dispatchStart(ACTIONS.DETAIL.FETCH);

        return this.companyRepository.fetchById(id)
            .pipe(
                catchError((error) => {
                    this.handler.dispatchError(ACTIONS.DETAIL.FETCH, {
                      message: error.message,
                    });

                    return throwError(error);
                }),
                tap((response) => {
                    this.handler.dispatchSuccess(ACTIONS.DETAIL.FETCH, {
                        payload: this.entitiesActions.normalize(response, EntitiesActions.schema.company),
                    });
                }),
                finalize(() => {
                    this.handler.dispatchDone(ACTIONS.DETAIL.FETCH);
                })
            );
    }

    public create(partner: any) {
        return this.companyRepository.create(partner)
          .pipe(
            tap((response: any) => {
              const normalizedPayload = this.entitiesActions.normalize(response, EntitiesActions.schema.recyclingPartner);

              this.handler.dispatch(ACTIONS.OVERVIEW.ADD_TO_LIST, {
                payload: normalizedPayload,
              });
            })
          );
      }

      public update(id: string, partner: any) {
        return this.companyRepository.update(id, partner)
          .pipe(
            tap((response: any) => {
              this.handler.dispatch(ACTIONS.DETAIL.UPDATE, {
                payload: this.entitiesActions.patch('companies', response._id, response)
              });
            })
          );
      }

      public delete(id: string) {
        return this.companyRepository.remove(id)
          .pipe(
            tap(() => {
              this.handler.dispatch(ACTIONS.OVERVIEW.REMOVE_FROM_LIST, {
                payload: this.entitiesActions.remove('companies', id),
              });
            })
          );
      }

      public activate(id: string) {
        return this.companyRepository.activate(id)
          .pipe(
            tap((response: any) => {
              this.handler.dispatch(ACTIONS.DETAIL.ACTIVATE, {
                payload: this.entitiesActions.patch('companies', id, response),
              });
            })
          );
      }

      public deactivate(id: string) {
        return this.companyRepository.deactivate(id)
          .pipe(
            tap((response: any) => {
              this.handler.dispatch(ACTIONS.DETAIL.DEACTIVATE, {
                payload: this.entitiesActions.patch('companies', id, response),
              });
            })
          );
      }
}
