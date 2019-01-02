import { Action } from 'redux';

export interface ProgressAction extends Action {
  type: string;
}

export interface ProgressState<T = any> {
  loading: boolean;
  error: any;
  result: T;
  startFetch: number;
  stopFetch: number;
}

export type ProgressReducer<T = any> = (state: T, action: Action) => T;

export interface ProgressOptions {
  entityType: string;
}
