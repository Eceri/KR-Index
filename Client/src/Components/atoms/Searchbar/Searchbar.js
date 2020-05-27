import React, { useEffect, useState, useRef } from "react";
import { SearchBox, SearchInput, SearchListElement } from "Styles";

// Relative imports
import classes from "Assets/classes/classes.json";
import { sortedSearch } from "Helpers";

const classesSorted = [
  ...classes
    .map((v) =>
      v.heroes.map((h) => ({
        type: "heroes",
        heroClass: v.name,
        name: h,
        meta: {},
      }))
    )
    .flat(1),
];

const searchFilter = (_array) => {
  const resultArray = sortedSearch(
    [
      ...classesSorted,
      ..._array.map((artifact) => ({
        type: "artifacts",
        name: artifact.name,
        meta: {},
      })),
    ],
    "name"
  );

  return resultArray;
};

export const Searchbar = (props) => {
  const { artifacts } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [arrayCopy, setArrayCopy] = useState([]);
  const [arraySearch, setArraySearch] = useState([]);
  const [search, setSearch] = useState(false);
  const [selected, setSelected] = useState(0);

  const ref = useRef();

  const handleClick = (event) => {
    if (ref.current.contains(event.target)) {
      return;
    }
    setSearch(false);
  };

  const handleKey = (event) => {
    const key = event.keyCode;
    if (key === 40) {
      console.log("Down");
      setSelected(selected + 1);
    }
    if (key === 38) {
      console.log("UP");
      setSelected(selected - 1);
    }
    if (key === 13) {
      console.log("Enter");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    const _array = searchFilter(artifacts, "");
    setArrayCopy(_array);
    setArraySearch(_array);
  }, [artifacts]);

  useEffect(() => {
    const _array = arrayCopy.filter((item) =>
      item.name.toLowerCase().includes(searchQuery)
    );
    const posQuery = _array.map((v) =>
      v.name.toLowerCase().indexOf(searchQuery)
    );
    const resultArraySort = _array
      .map((v, i) => ({ ...v, pos: posQuery[i] }))
      .sort((a, b) => a.pos - b.pos);
    setArraySearch(resultArraySort);
  }, [searchQuery]);

  return (
    <div
      ref={ref}
      style={{ height: "3rem", marginLeft: "auto" }}
      onKeyDown={(event) => handleKey(event)}
    >
      {search && (
        <SearchBox>
          <ul style={{ margin: 0, padding: 0, maxHeight: "15rem" }}>
            {arraySearch.map((item, index) => (
              <SearchListElement
                to={`/${item.type}/${item.name}`}
                activeStyle={{ color: "lightgrey" }}
                key={item.name}
                onClick={() => {
                  setSearch(false);
                  setSearchQuery("");
                }}
                selected={selected === index}
                onMouseOver={() => setSelected(index)}
                tabIndex={index}
              >
                {item.name}
              </SearchListElement>
            ))}
          </ul>
        </SearchBox>
      )}
      <SearchInput
        placeholder="Search..."
        onChange={(e) => {
          setSearchQuery(e.currentTarget.value.toLowerCase());
        }}
        value={searchQuery}
        aria-label="Search"
        aria-required="true"
        onClick={() => setSearch(true)}
      />
    </div>
  );
};
