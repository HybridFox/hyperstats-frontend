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
    private handler: Handler,
    private entitiesActions: EntitiesActions,
    private recyclingProcessesRepository: RecyclingProcessesRepository,
  ) {}

  public fetchAll(): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH_ALL);

    return this.recyclingProcessesRepository.fetchAll()
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH_ALL, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH_ALL, {
            payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.recyclingProcess])
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH_ALL);
        }),
      );
  }

  public fetchById(id: string) {
    this.handler.dispatchStart(ACTIONS.FETCH);

    return this.recyclingProcessesRepository.fetchById(id)
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH, {
            payload: this.entitiesActions.normalize(response, EntitiesActions.schema.recyclingProcess)
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH);
        }),
      );
  }

  public create(process: any) {
    return this.recyclingProcessesRepository.create(process)
      .pipe(
        tap((response: any) => {
          const normalizedPayload = this.entitiesActions.normalize(response, EntitiesActions.schema.recyclingProcess);

          this.handler.dispatch(ACTIONS.ADD_TO_LIST, {
            payload: normalizedPayload,
          });
        })
      );
  }

  public update(process: any) {
    return this.recyclingProcessesRepository.update(process)
      .pipe(
        tap((response: any) => {
          this.handler.dispatch(ACTIONS.UPDATE, {
            payload: this.entitiesActions.patch('recyclingProcesses', response._id, response)
          });
        })
      );
  }

  public delete(id: string) {
    return this.recyclingProcessesRepository.remove(id)
      .pipe(
        tap(() => {
          const normalizedPayload = this.entitiesActions.remove('recyclingProcesses', id);

          this.handler.dispatch(ACTIONS.REMOVE_FROM_LIST, {
            payload: normalizedPayload,
          });
        })
      );
  }
}
