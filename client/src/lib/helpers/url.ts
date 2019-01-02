export const stripTrailingSlash = (str = '') => {
  if (str.substr(-1) !== '/') {
    return str;
  }

  return str.slice(0, -1);
};
