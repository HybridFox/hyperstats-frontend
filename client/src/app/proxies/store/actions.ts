import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';

import { Handler } from '@store/handler';
import { ProxiesRepository } from '@api/proxies';

import { ACTIONS } from './action-types';
import { ProxyBody } from './types';

@Injectable()
export class ProxiesActions {
  constructor(
    private handler: Handler,
    private proxiesRepository: ProxiesRepository,
  ) {}

  public fetchAll(): Observable<any> {
    this.handler.dispatchStart(ACTIONS.FETCH_ALL);

    return this.proxiesRepository.fetchAll()
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.FETCH_ALL, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.FETCH_ALL, {
            payload: response
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.FETCH_ALL);
        }),
      );
  }

  public put(body: ProxyBody): Observable<any> {
    return this.proxiesRepository.put(body);
  }

  public delete(body: ProxyBody): Observable<any> {
    return this.proxiesRepository.delete(body);
  }
}
