import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class Handler {
  public START = 'START';
  public SUCCESS = 'SUCCESS';
  public ERROR = 'ERROR';
  public DONE = 'DONE';

  constructor(
    public ngRedux: NgRedux<any>,
  ) {}

  public dispatch(action, payload?) {
    this.ngRedux.dispatch({
      type: action,
      ...payload,
    });
  }

  public dispatchStart(action, payload?) {
    this.dispatch(`${action}@${this.START}`, payload);
  }

  public dispatchSuccess(action, payload?) {
    this.dispatch(`${action}@${this.SUCCESS}`, payload);
  }

  public dispatchError(action, payload?) {
    this.dispatch(`${action}@${this.ERROR}`, payload);
  }

  public dispatchDone(action, payload?) {
    this.dispatch(`${action}@${this.DONE}`, payload);
  }
}
