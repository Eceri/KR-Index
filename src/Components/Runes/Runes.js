import React, { useState, useEffect } from "react";

import { Button, Rune } from "Atoms";
import { RunesPage } from "Styles";
import velkazarRunes from "./velkazarRunes.json";

const velk = velkazarRunes.sort((a, b) => {
  if (a.displayName < b.displayName) return -1;
  if (a.displayName > b.displayName) return 1;
  return 0;
});

export const Runes = () => {
  const [runes, setRunes] = useState(velk);
  const [filteredRunes, setFilteredRunes] = useState(velk);
  const [query, setQuery] = useState({});

  let testArr = [];
  velk.forEach(({ stats }) => {
    testArr.push(...Object.keys(stats));
  });

  testArr = [...new Set(testArr.sort())];
  useEffect(() => {
    let newArr = [];
    if (Object.keys(query).length < 1) {
      setFilteredRunes(runes);
      return;
    }

    Object.keys(query).forEach((q) => {
      if (newArr.length < 2) {
        newArr = runes.filter((rune) => rune.stats[q]);
      } else {
        newArr = newArr.filter((rune) => rune.stats[q]);
      }
    });

    setFilteredRunes(newArr);
  }, [query]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "10rem" }}>
        <Button onClick={() => setQuery({})}>Clear</Button>
        {testArr.map((t) => (
          <div key={t}>
            <label>
              <input
                type="checkbox"
                id={t}
                name={t}
                value={t}
                checked={query[t] !== undefined && true}
                disabled={!query[t] && Object.keys(query).length === 2}
                onChange={({ target: { value, checked } }) => {
                  let newQuery = { ...query };
                  if (checked) newQuery = { ...query, [value]: checked };
                  else delete newQuery[value];
                  setQuery(newQuery);
                }}
              />
              {t}
            </label>
          </div>
        ))}
      </div>
      <RunesPage>
        {filteredRunes.slice(0, 7).map((rune) => Rune(rune))}
      </RunesPage>
    </div>
  );
};
