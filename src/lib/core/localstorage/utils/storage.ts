import { isEqual } from 'lodash-es';

import { PathSelector, Selector } from '../localstorage.types';

export const comparator = isEqual;

export const verifyPath = (data?: any, selector?: PathSelector) => {
  if (!data || !selector) {
    return null;
  }

  let curr = data;

  for (let i = 0; i < selector.length; i += 1) {
    if (curr.hasOwnProperty(selector[i])) {
      curr = curr[selector[i]];
      continue;
    }

    return null;
  }

  return curr;
};

export const select = (storage: any, selector: Selector): any => {
  if (!storage) {
    return null;
  }

  if (!selector) {
    return storage;
  }

  if (typeof selector === 'function') {
    return selector(storage);
  }

  if (Array.isArray(selector)) {
    return verifyPath(storage, selector);
  }

  return verifyPath(storage, [selector]);
};

export const keyMatches = (key: string, selector: Selector): Boolean => {
  const keyMatchesSelector = key === selector;
  const keyInSelector = Array.isArray(selector) ? selector.indexOf(key) >= 0 : false;
  const selectorIsFunction = typeof selector === 'function';

  return keyMatchesSelector || keyInSelector || selectorIsFunction;
};

export const updateOrCreatePath = <T = any, U = any>(state?: T, selector?: PathSelector, newValue?: U): T => {
  if (!state || !selector) {
    return null;
  }

  let curr = state;
  let i = 0;

  for (i = 0; i < selector.length; i += 1) {
    if (!curr.hasOwnProperty(selector[i])) {
      curr[selector[i]] = {};
    }

    if (i === selector.length - 1) {
      break;
    }

    curr = curr[selector[i]];
  }

  curr[selector[i]] = newValue;

  return state;
};
