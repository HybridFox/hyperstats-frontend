import { path, mergeDeepLeft } from 'ramda';

import { ACTIONS } from './entities.action-types';
import { INITIAL_STATE } from './entities.initial-state';

export const EntitiesReducer = (state = INITIAL_STATE, action) => {

  if (action.type === ACTIONS.NORMALIZE_OVERWRITE) {
    const originalEntities: any = path([action.payload.name], state);
    const payload = path(['payload', 'entities'], action);

    return {
      ...state,
      [action.payload.name]: {
        ...originalEntities,
        ...payload,
      },
    };
  }

  if (action.type === ACTIONS.NORMALIZE_MERGE) {
    const data = path([action.payload.name], state) ?
      mergeDeepLeft(path([action.payload.name], state), path(['payload', 'entities'], action)) :
      path(['payload', 'entities'], action);

    return Object.assign({}, state, {
      [action.payload.name]: data,
    });
  }

  if (action.type === ACTIONS.PATCH) {
    const entities = path([action.payload.entity], state);
    const entity = path([action.payload.id], entities);
    const patchedEntity = Object.assign({}, entity, action.payload.patchData);
    const patchedEntities = Object.assign({}, entities, { [action.payload.id]: patchedEntity });
    return Object.assign({}, state, { [action.payload.entity]: patchedEntities });
  }

  if (action.type === ACTIONS.REMOVE) {
    const entities = path([action.payload.entity], state);

    console.log(entities, state);

    const filteredEntities = Object.assign({}, ...Object.keys(entities).filter((id) => {
        return id !== action.payload.id;
      })
      .map((id) => {
        return { [id]: entities[id] };
      }),
    );

    return Object.assign({}, state, { [action.payload.entity]: filteredEntities });
  }

  return state;
};
