import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';

import { Handler } from '@store/handler';
import { EntitiesActions } from '@store/entities';

import { CompaniesRepository } from './repository';
import { ACTIONS } from './action-types';
import { CompanyType } from './types';

@Injectable()
export class CompaniesActions {
    constructor(
        private handler: Handler,
        private entitiesActions: EntitiesActions,
        private usersRepository: CompaniesRepository,
    ) { }

    public fetchByTypes(types: CompanyType[]): Observable<any> {
        this.handler.dispatchStart(ACTIONS.OVERVIEW.FETCH);

        return this.usersRepository.fetchByTypes(types)
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
        this.handler.dispatchStart(ACTIONS.DETAIL.FETCH);

        return this.usersRepository.fetchById(id)
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
