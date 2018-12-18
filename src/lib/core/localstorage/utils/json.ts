// TODO: do we want to log something if parsing failed or just ignore it silently?
export const parseJSON = (key: string, json: string): any => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return String(json);
  }
};
