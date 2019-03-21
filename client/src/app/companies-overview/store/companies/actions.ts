import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

import { Handler } from '@store/handler';
import { EntitiesActions } from '@store/entities';

import { ACTIONS } from './action-types';
import { ReportsRepository } from '@api/reports';
import { CompanyRepository } from '@api/company';
import { CompanyType } from '@api/company';

@Injectable()
export class CompaniesOverviewActions {
    constructor(
        private handler: Handler,
        private entitiesActions: EntitiesActions,
        private reportsRepository: ReportsRepository,
        private companyRepository: CompanyRepository,
    ) { }

    public fetchAllRecyclers(): Observable<any> {
      this.handler.dispatchStart(ACTIONS.RECYCLERS.OVERVIEW.FETCH);

      return this.reportsRepository.fetchAllCompanies([CompanyType.R])
        .pipe(
          catchError((error) => {
            this.handler.dispatchError(ACTIONS.RECYCLERS.OVERVIEW.FETCH, {
              message: error.message,
            });

            return _throw(error);
          }),
          tap((response: any) => {
            this.handler.dispatchSuccess(ACTIONS.RECYCLERS.OVERVIEW.FETCH, {
              payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.company])
            });
          }),
          finalize(() => {
            this.handler.dispatchDone(ACTIONS.RECYCLERS.OVERVIEW.FETCH);
          }),
        );
    }

    public fetchAllAuthorisationOrg(): Observable<any> {
      this.handler.dispatchStart(ACTIONS.AUTHORISATION_ORG.OVERVIEW.FETCH);

      return this.reportsRepository.fetchAllCompanies([CompanyType.AO])
        .pipe(
          catchError((error) => {
            this.handler.dispatchError(ACTIONS.AUTHORISATION_ORG.OVERVIEW.FETCH, {
              message: error.message,
            });

            return _throw(error);
          }),
          tap((response: any) => {
            this.handler.dispatchSuccess(ACTIONS.AUTHORISATION_ORG.OVERVIEW.FETCH, {
              payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.company])
            });
          }),
          finalize(() => {
            this.handler.dispatchDone(ACTIONS.AUTHORISATION_ORG.OVERVIEW.FETCH);
          }),
        );
    }

    public fetchById(id: string): Observable<any> {
        if (id === 'new') {
            return of(this.handler.dispatchSuccess(ACTIONS.RECYCLERS.DETAIL.FETCH, {
                payload: null
            }));
        }

        this.handler.dispatchStart(ACTIONS.RECYCLERS.DETAIL.FETCH);

        return this.companyRepository.fetchById(id)
            .pipe(
                catchError((error) => {
                    this.handler.dispatchError(ACTIONS.RECYCLERS.DETAIL.FETCH, {
                      message: error.message,
                    });

                    return throwError(error);
                }),
                tap((response) => {
                    this.handler.dispatchSuccess(ACTIONS.RECYCLERS.DETAIL.FETCH, {
                        payload: this.entitiesActions.normalize(response, EntitiesActions.schema.company),
                    });
                }),
                finalize(() => {
                    this.handler.dispatchDone(ACTIONS.RECYCLERS.DETAIL.FETCH);
                })
            );
    }
}
