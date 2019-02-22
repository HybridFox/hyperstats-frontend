import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';

import { Handler } from '@store/handler';
import { EntitiesActions } from '@store/entities';

import { UsersRepository } from './repository';
import { ACTIONS } from './action-types';
import path from 'ramda/es/path';
import prop from 'ramda/es/prop';
import { CompanyType } from '@api/company';

@Injectable()
export class UsersActions {
    constructor(
        private handler: Handler,
        private entitiesActions: EntitiesActions,
        private usersRepository: UsersRepository,
    ) { }

    public fetchByTypes(types: CompanyType[], admin: boolean): Observable<any> {
        if (!prop('length')(types) && !admin) {
            return of(this.handler.dispatchSuccess(ACTIONS.OVERVIEW.FETCH, {
                payload: [],
                pagination: null
            }));
        }

        this.handler.dispatchStart(ACTIONS.OVERVIEW.FETCH);

        return this.usersRepository.fetchByTypes(types, admin)
            .pipe(
                catchError((error) => {
                    this.handler.dispatchError(ACTIONS.OVERVIEW.FETCH, {
                      message: error.message,
                    });

                    return throwError(error);
                }),
                tap((response) => {
                    this.handler.dispatchSuccess(ACTIONS.OVERVIEW.FETCH, {
                        payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.user]),
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
                        payload: this.entitiesActions.normalize(response, EntitiesActions.schema.user),
                    });
                }),
                finalize(() => {
                    this.handler.dispatchDone(ACTIONS.DETAIL.FETCH);
                })
            );
    }

    public updateUser(user: any): Observable<any> {
        this.handler.dispatchStart(ACTIONS.DETAIL.UPDATE);

        return this.usersRepository.updateUser(user)
            .pipe(
                tap((response) => {
                    this.handler.dispatchSuccess(ACTIONS.DETAIL.UPDATE, {
                        payload: this.entitiesActions.patch('users', response._id, response),
                    });
                })
            );
    }
}
