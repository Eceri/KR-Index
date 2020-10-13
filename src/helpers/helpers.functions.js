export const groupElementsBy = (items, keyFn) => {
  let result = [];
  items.forEach((item) => {
    let key  = keyFn(item);
    result[key] ?  result[key].push(item) : ( result[key] = [item]);
  });
  return result;
};