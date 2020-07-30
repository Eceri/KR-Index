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

  const _arr = [];
  _sortArray.filter((v) => {
    if (v[_key].toLowerCase().includes(_query)) {
      _arr.push({ ...v, pos: v[_key].toLowerCase().indexOf(_query) });
    }
  });

  return _arr.sort((a, b) => a.pos - b.pos);
};
