import { get } from 'lodash-es';
import * as deepExtend from 'deep-extend';

import { ACTIONS } from './entities.action-types';
import { INITIAL_STATE } from './entities.initial-state';

export const EntitiesReducer = (state = INITIAL_STATE, action) => {

  if (action.type === ACTIONS.NORMALIZE_OVERWRITE) {
    const originalEntities: any = get(state, action.payload.name);
    const payload = get(action, 'payload.entities');

    switch (action.payload.name) {

      case 'users':

        // Do not update the current user
        if (originalEntities) {
          Object.keys(originalEntities).forEach(id => {
            if (originalEntities[id].userInfo) {
              delete payload[id];
            }
          });
        }

        return {
          ...state,
          [action.payload.name]: {
            ...originalEntities,
            ...payload,
          },
        };

      default:
        return {
          ...state,
          [action.payload.name]: {
            ...originalEntities,
            ...payload,
          },
        };
    }
  }

  if (action.type === ACTIONS.NORMALIZE_MERGE) {
    const data = get(state, action.payload.name) ? deepExtend(get(state, action.payload.name), get(action, 'payload.entities')) : get(action, 'payload.entities'); // tslint:disable-line
    return Object.assign({}, state, {
      [action.payload.name]: data,
    });
  }

  if (action.type === ACTIONS.PATCH) {
    const entities = get(state, action.payload.entity);
    const entity = get(entities, action.payload.id);
    const patchedEntity = Object.assign({}, entity, action.payload.patchData);
    const patchedEntities = Object.assign({}, entities, { [action.payload.id]: patchedEntity });
    return Object.assign({}, state, { [action.payload.entity]: patchedEntities });
  }

  if (action.type === ACTIONS.REMOVE) {
    const entities = get(state, action.payload.entity);

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
