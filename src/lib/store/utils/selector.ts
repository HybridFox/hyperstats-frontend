import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { path } from 'ramda';

interface SelectorOptions {
  relations?: string[];
  selector: string;
  schema: any;
}

const selectPath = (selection: string) => {
  return (state) => {
    return path(selection.split('.'), state);
  };
};

const selectEntity = (entityName: string) => {
  return (state) => {
    return path([ 'entities', entityName ], state);
  };
};

export const selectDenormalized = ({ relations = [], selector, schema }: SelectorOptions) => {
  relations.push(schema.key);
  const entitySelectors = relations.map((name) => {
    return selectEntity(name);
  });

  return (createSelector as any)(
    selectPath(selector),
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
