import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

import { EntitiesActions } from '@store/entities';
import { Handler } from '@store/handler';

import { RecyclingProcessesRepository } from './repository';
import { ACTIONS } from './action-types';

@Injectable()
export class RecyclingProcessesActions {
  constructor(
    private _handler: Handler,
    private _entitiesActions: EntitiesActions,
    private _recyclingProcessesRepository: RecyclingProcessesRepository,
  ) {}

  public fetchAll(): Observable<any> {
    this._handler.dispatchStart(ACTIONS.FETCH_ALL);

    return this._recyclingProcessesRepository.fetchAll()
      .pipe(
        catchError((error) => {
          this._handler.dispatchError(ACTIONS.FETCH_ALL, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this._handler.dispatchSuccess(ACTIONS.FETCH_ALL, {
            payload: this._entitiesActions.normalize(response, [EntitiesActions.schema.recyclingProcess])
          });
        }),
        finalize(() => {
          this._handler.dispatchDone(ACTIONS.FETCH_ALL);
        }),
      );
  }

  public fetchById(id: string) {
    this._handler.dispatchStart(ACTIONS.FETCH);

    return this._recyclingProcessesRepository.fetch(id)
      .pipe(
        catchError((error) => {
          this._handler.dispatchError(ACTIONS.FETCH, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this._handler.dispatchSuccess(ACTIONS.FETCH, {
            payload: this._entitiesActions.normalize(response, EntitiesActions.schema.recyclingProcess)
          });
        }),
        finalize(() => {
          this._handler.dispatchDone(ACTIONS.FETCH);
        }),
      );
  }

  public create(process: any) {
    return this._recyclingProcessesRepository.create(process)
      .pipe(
        tap((response: any) => {
          const normalizedPayload = this._entitiesActions.normalize(response, EntitiesActions.schema.recyclingProcess);

          this._handler.dispatch(ACTIONS.ADD_TO_LIST, {
            payload: normalizedPayload,
          });
        })
      );
  }

  public update(process: any) {
    return this._recyclingProcessesRepository.update(process)
      .pipe(
        tap((response: any) => {
          this._handler.dispatch(ACTIONS.UPDATE, {
            payload: this._entitiesActions.patch('recyclingProcesses', response._id, response)
          });
        })
      );
  }

  public delete(id: string) {
    return this._recyclingProcessesRepository.remove(id)
      .pipe(
        tap(() => {
          const normalizedPayload = this._entitiesActions.remove('recyclingProcesses', id);

          this._handler.dispatch(ACTIONS.REMOVE_FROM_LIST, {
            payload: normalizedPayload,
          });
        })
      );
  }
}
