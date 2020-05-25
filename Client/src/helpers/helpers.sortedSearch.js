export const sortedSearch = (_array, _key, _query = "") => {
  const _sortArray = _array.sort((a, b) => {
    if (a[_key] < b[_key]) {
      return -1;
    }
    if (a[_key] > b[_key]) {
      return 1;
    }
    return 0;
  });

  const _arrayFilter = _sortArray.filter((v) =>
    v[_key].toLowerCase().includes(_query)
  );
  const posQuery = _arrayFilter.map((v) =>
    v[_key].toLowerCase().indexOf(_query)
  );
  const _arraySort = _arrayFilter
    .map((v, i) => ({ ...v, pos: posQuery[i] }))
    .sort((a, b) => a.pos - b.pos);
  return _arraySort;
};
