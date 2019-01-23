import {
  ProgressState,
  ProgressAction,
  ProgressOptions,
} from '@store/hor/types';

const initialState: ProgressState<any> = {
  loading: false,
  result: null,
  error: null,
  startFetch: null,
  stopFetch: null,
};

export const progressReducer = (options: ProgressOptions, reducer) => {
  return (
    state: ProgressState = initialState,
    action: ProgressAction,
  ) => {
    const [ entityType, type, response ] = action.type.split('/');

    if (options.entityType === entityType) {
      if (response === 'START') {
        return Object.assign({}, state, {
          loading: true,
          error: null,
          startFetch: Date.now(),
        });
      }

      if (response === 'DONE') {
        return Object.assign({}, state, {
          loading: false,
          doneFetch: Date.now(),
        });
      }

      if (response === 'ERROR') {
        return Object.assign({}, state, {
          error: true,
        });
      }

      return Object.assign({}, state, {
        result: reducer(state.result, Object.assign({}, action, {
          type: `${entityType}/${type}`,
        })),
      });
    }

    return state;
  };
};
