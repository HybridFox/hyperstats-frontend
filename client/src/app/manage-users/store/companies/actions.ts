import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';

import { Handler } from '@store/handler';
import { EntitiesActions } from '@store/entities';

import { ACTIONS } from './action-types';
import { CompanyRepository, CompanyType } from '@api/company';

@Injectable()
export class UserCompanyActions {
    constructor(
        private handler: Handler,
        private entitiesActions: EntitiesActions,
        private userCompanyRepository: CompanyRepository,
    ) { }

    public fetchUserCompanies(): Observable<any> {
        this.handler.dispatchStart(ACTIONS.FETCH);

        return this.userCompanyRepository.fetchByType([CompanyType.R, CompanyType.CO, CompanyType.AO])
            .pipe(
                catchError((error) => {
                    this.handler.dispatchError(ACTIONS.FETCH, {
                      message: error.message,
                    });

                    return throwError(error);
                }),
                tap((response) => {
                    this.handler.dispatchSuccess(ACTIONS.FETCH, {
                        payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.company]),
                        pagination: null,
                    });
                }),
                finalize(() => {
                    this.handler.dispatchDone(ACTIONS.FETCH);
                })
            );
    }
}
