import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

import { Handler } from '@store/handler';
import { EntitiesActions } from '@store/entities';

import { ACTIONS } from './action-types';
import { ReportsRepository } from '@api/reports';
import { CompanyRepository } from '@api/company';

@Injectable()
export class RecyclersActions {
    constructor(
        private handler: Handler,
        private entitiesActions: EntitiesActions,
        private reportsRepository: ReportsRepository,
        private companyRepository: CompanyRepository,
    ) { }

    public fetchAllRecyclers(): Observable<any> {
      this.handler.dispatchStart(ACTIONS.OVERVIEW.FETCH);

      return this.reportsRepository.fetchAllCompanies()
        .pipe(
          catchError((error) => {
            this.handler.dispatchError(ACTIONS.OVERVIEW.FETCH, {
              message: error.message,
            });

            return _throw(error);
          }),
          tap((response: any) => {
            this.handler.dispatchSuccess(ACTIONS.OVERVIEW.FETCH, {
              payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.company])
            });
          }),
          finalize(() => {
            this.handler.dispatchDone(ACTIONS.OVERVIEW.FETCH);
          }),
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
}
