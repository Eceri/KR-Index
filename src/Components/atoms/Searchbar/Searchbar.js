import React, { useEffect, useState, useRef, useGlobal } from "reactn";

// Relative imports
import { SearchBox, SearchInput, SearchListElement } from "Styles";
import { sortedSearch, useWindowDimensions, useDebounce } from "Helpers";
import {
  AWSoperation,
  listOrderedArtifacts,
  listHeros,
  listHerosHeadInfos,
} from "Aws";
import Icon_mg from "Assets/icons/magnifying-glass.js";
import { INIT_HEROHEADER } from "Constants";

export const Searchbar = ({ setMobileSearch }) => {
  // State
  const [artifacts, setArtifacts] = useState(
    JSON.parse(localStorage.getItem("Artifacts")) || []
  );
  const [heros, setHeros] = useState([]);
  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [arrayCopy, setArrayCopy] = useState([]);
  const [arraySearch, setArraySearch] = useState([]);
  const [search, setSearch] = useState(false);
  const [selected, setSelected] = useState(0);

  const debouncedSearchTerm = useDebounce(searchQuery, 250);

  // Globals
  const [globalArtifacts, setGlobalArtifacts] = useGlobal("artifacts");

  // Mobile Check
  const { isMobile } = useWindowDimensions();
  const [mobile, setMobile] = useState(isMobile);

  const ref = useRef();
  const inputRef = useRef();

  const handleClick = ({ target }) => {
    if (ref.current.contains(target)) {
      return;
    }
    setSearch(false);
  };

  const handleKey = ({ keyCode }) => {
    if (keyCode === 40) {
      console.log("Down");
      setSelected(selected + 1);
    }
    if (keyCode === 38) {
      console.log("UP");
      setSelected(selected - 1);
    }
    if (keyCode === 13) {
      console.log("Enter");
    }
  };

  useEffect(() => {
    setMobile(isMobile);
    if (!isMobile) {
      setMobileSearch(false);
    }
  }, [isMobile]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    if (isMobile && !search) {
      setMobile(true);
      setMobileSearch(false);
    }
    if (isMobile && search) {
      setMobileSearch(true);
    }
    if (globalArtifacts.length > 1) {
      setArtifacts(globalArtifacts);
    } else if (search && artifacts.length < 1) {
      AWSoperation(listOrderedArtifacts).then((artifacts) => {
        setArtifacts(artifacts);
        setGlobalArtifacts(artifacts);
      });
    }
    AWSoperation(listHerosHeadInfos).then((heros) =>
      setHeros(heros.map((hero) => ({ ...hero, type: "heroe" })))
    );
  }, [search]);

  useEffect(() => {
    if (artifacts.length > 1 && heros.length > 1) {
      const _array = sortedSearch([...heros, ...artifacts], "name");
      setArrayCopy(_array);
      // setArraySearch(_array);
    }
  }, [artifacts, heros]);

  useEffect(() => {
    let key = "name";
    let searchTerm = searchQuery.toLowerCase();
    let _arrayCopy = [...arrayCopy];
    const heroHeader = Object.keys(INIT_HEROHEADER).slice(1);
    const heroHeaderShortcut = heroHeader.map((v) => v[0]);
    const isKeySearch = debouncedSearchTerm.includes(":");

    if (debouncedSearchTerm) {
      if (isKeySearch) {
        const keySearch = debouncedSearchTerm.split(":");
        let _key = keySearch[0];
        const search = keySearch[1].trim();
        let indexShortcut = -1;

        if (heroHeader.includes(_key) || heroHeaderShortcut.includes(_key)) {
          indexShortcut = heroHeaderShortcut.indexOf(_key);
          if (indexShortcut !== -1) {
            key = heroHeader[indexShortcut];
          } else {
            key = _key;
          }
        }
        searchTerm = search.toLowerCase();
        _arrayCopy = arrayCopy.filter((v) => v[key]);
      }
      const _array = sortedSearch(_arrayCopy, key, searchTerm);
      setArraySearch(_array.slice(0, 6));
    }
  }, [debouncedSearchTerm]);

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
                to={`/${type}s/${name}`}
                activeStyle={{ color: "lightgrey", backgroundColor: "#262626" }}
                key={name}
                onClick={() => {
                  setSearch(false);
                  setSearchQuery("");
                }}
                selected={selected === index}
                onMouseOver={() => setSelected(index)}
                tabIndex={index}
              >
                <div>
                  {console.log(name.slice(name.indexOf(searchQuery)))}
                  {name}
                  <span style={{ fontSize: "0.8rem" }}>{` in ${type}s`}</span>
                </div>
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
        placeholder="Find Heroes and Artifacts..."
        onChange={({ currentTarget: { value } }) => {
          setSearchQuery(value);
        }}
        value={searchQuery}
        aria-label="Search"
        aria-required="true"
        onClick={() => setSearch(true)}
      />
    </div>
  );
};
