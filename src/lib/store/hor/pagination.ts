const PAGINATION_DEFAULT_STATE = {
  pagination: null,
};

export const paginationReducer = (options, reducer) => (
  state = PAGINATION_DEFAULT_STATE,
  action,
) => {
  const [ entity ] = action.type.split('/');

  if (options.entityType === entity) {
    if (action.pagination) {
      return {
        ...reducer(state, action),
        pagination: action.pagination,
      };
    }

    return reducer(state, action);
  }

  return state;
};
