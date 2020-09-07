import React, { useEffect, useState, useRef, useGlobal } from "reactn";

// Relative imports
import classes from "Assets/classes/classes.json";
import { SearchBox, SearchInput, SearchListElement } from "Styles";
import {
  AWSoperation,
  listOrderedArtifacts,
  sortedSearch,
  useWindowDimensions,
} from "Helpers";
import Icon_mg from "Assets/icons/magnifying-glass.js";

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

export const Searchbar = () => {
  // State
  const [artifacts, setArtifacts] = useState(
    JSON.parse(localStorage.getItem("Artifacts")) || []
  );
  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [arrayCopy, setArrayCopy] = useState([]);
  const [arraySearch, setArraySearch] = useState([]);
  const [search, setSearch] = useState(false);
  const [selected, setSelected] = useState(0);

  // Globals
  const [globalArtifacts, setGlobalArtifacts] = useGlobal("artifacts");

  // Mobile Check
  const { isMobile } = useWindowDimensions();
  const [mobile, setMobile] = useState(true);

  const ref = useRef();
  const inputRef = useRef();

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
    if (isMobile && !search) {
      setMobile(true);
    }
    if (globalArtifacts.length > 1) {
      setArtifacts(globalArtifacts);
    } else if (search && artifacts.length < 1) {
      AWSoperation(listOrderedArtifacts).then((artifacts) => {
        setArtifacts(artifacts);
        setGlobalArtifacts(artifacts);
      });
    }
  }, [search]);

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

  useEffect(() => {
    if (!mobile) {
      inputRef.current.focus();
    }
  }, [mobile]);

  return (
    <div
      ref={ref}
      style={{ height: "3rem", marginLeft: "auto" }}
      onKeyDown={(event) => handleKey(event)}
    >
      {search && (
        <SearchBox>
          <ul style={{ margin: 0, padding: 0, maxHeight: "15rem" }}>
            {arraySearch.map(({ type, name }, index) => (
              <SearchListElement
                to={`/${type}/${name}`}
                activeStyle={{ color: "lightgrey" }}
                key={name}
                onClick={() => {
                  setSearch(false);
                  setSearchQuery("");
                }}
                selected={selected === index}
                onMouseOver={() => setSelected(index)}
                tabIndex={index}
              >
                {name}
              </SearchListElement>
            ))}
          </ul>
        </SearchBox>
      )}
      {isMobile && mobile && (
        <Icon_mg
          alt="Searchicon"
          style={{
            border: "1px solid transparent",
            height: "1.5rem",
            fill: "white",
            margin: "0.5rem",
            marginTop: "0.7rem",
          }}
          onClick={() => {
            setMobile(false);
            setSearch(true);
          }}
        />
      )}
      <SearchInput
        ref={inputRef}
        isMobile={mobile}
        placeholder="Search..."
        onChange={({ currentTarget: { value } }) => {
          setSearchQuery(value.toLowerCase());
        }}
        value={searchQuery}
        aria-label="Search"
        aria-required="true"
        onClick={() => setSearch(true)}
      />
    </div>
  );
};
