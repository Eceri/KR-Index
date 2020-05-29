/**
 *
 * @param {*} name of Collection as String
 */
export const GET_LOCALSTORAGE = (name) => localStorage.getItem(name);

/**
 *
 * @param {*} name of Collection as String
 * @param {*} item as Objects or Array, what you want to save
 */
export const SET_LOCALSTORAGE = (name, item) =>
  localStorage.setItem(name, JSON.stringify(item));
