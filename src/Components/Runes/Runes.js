import React, { useState, useEffect } from "react";
import { useDrag } from "react-use-gesture";

import { Button, Rune } from "Atoms";
import { RunesPage, RunesPageContainer, StatFilter } from "Styles";
import { useWindowDimensions } from "Helpers";
import velkazarRunes from "./velkazarRunes.json";

const velk = velkazarRunes.sort((a, b) => {
  if (a.displayName < b.displayName) return -1;
  if (a.displayName > b.displayName) return 1;
  return 0;
});

export const Runes = () => {
  // Mobile Check
  const { isMobile } = useWindowDimensions();
  // const [mobile, setMobile] = useState(isMobile);

  const [runes, setRunes] = useState(velk);
  const [filteredRunes, setFilteredRunes] = useState(velk);
  const [query, setQuery] = useState({});
  const [showStats, setShowStats] = useState(false);

  const bindSwipe = useDrag(({ vxvy: [vx], last }) => {
    if (!isMobile) {
      return null;
    }
    if (last && vx < 0.3) {
      // Swipe Left
      setShowStats(false);
    } else if (last && vx > 0.3) {
      // Swipe Right
      setShowStats(true);
    }
  });

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
    <RunesPageContainer {...bindSwipe()}>
      <StatFilter showStats={showStats}>
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
      </StatFilter>
      <RunesPage>{filteredRunes.map((rune) => Rune(rune))}</RunesPage>
    </RunesPageContainer>
  );
};
