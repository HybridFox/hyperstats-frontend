import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { get } from 'lodash-es';

interface SelectorOptions {
  relations?: string[];
  path: string;
  schema: any;
}

const selectPath = (path: string) => {
  return (state) => {
    return get(state, path);
  };
};

const selectEntity = (entityName: string) => {
  return (state) => {
    return get(state, [ 'entities', entityName ]);
  };
};

export const selectDenormalized = ({ relations = [], path, schema }: SelectorOptions) => {
  relations.push(schema.key);
  const entitySelectors = relations.map((name) => {
    return selectEntity(name);
  });

  return (createSelector as any)(
    selectPath(path),
    ...entitySelectors,
    (result, ...entityData) => {

      const entities = Object.assign({}, ...relations.map((name, index) => {
        return { [name]: entityData[index] };
      }));

      if (!entities || !result) {
        return null;
      }

      return denormalize(result, Array.isArray(result) ? [schema] : schema, entities);
    },
  );
};
