import React, { useEffect, useState, useRef, useGlobal } from "reactn";
import { useHistory } from "react-router-dom";

// Relative imports
import { SearchBox, SearchInput, SearchListElement } from "Styles";
import { sortedSearch, useWindowDimensions, useDebounce } from "Helpers";
import { AWSoperation, listOrderedArtifacts, listHerosHeadInfos } from "Aws";
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
  const [globalHeroHeaders, setGlobalHeroHeaders] = useGlobal("headInfos");

  // Mobile Check
  const { isMobile } = useWindowDimensions();
  const [mobile, setMobile] = useState(isMobile);

  const ref = useRef();
  const inputRef = useRef();

  // History
  const history = useHistory();

  const handleClick = ({ target }) => {
    if (ref.current.contains(target)) {
      return;
    }
    setSearch(false);
  };

  const handleKey = ({ keyCode }) => {
    if (keyCode === 40) {
      // Down
      setSelected(selected + 1);
    }
    if (keyCode === 38) {
      // Up
      setSelected(selected - 1);
    }
    if (keyCode === 13) {
      // Enter
      const { type, name } = arraySearch[selected];
      const firstPart = `/${type.toLowerCase()}${
        type.slice(-1) === "o" ? "es" : "s"
      }`;
      const secondPart = `/${name}`;
      history.push({ pathname: `${firstPart}${secondPart}` });
      setSearch(false);
      setSearchQuery("");
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
    if (globalHeroHeaders.length > 1) {
      setHeros(globalHeroHeaders);
    } else if (search && heros.length < 1) {
      AWSoperation(listHerosHeadInfos).then((heros) => {
        const result = heros.map((hero) => ({ ...hero, type: "Hero" }));
        setHeros(result);
        setGlobalHeroHeaders(result);
      });
    }
  }, [search]);

  useEffect(() => {
    if (artifacts.length > 1 && heros.length > 1) {
      const _array = sortedSearch([...heros, ...artifacts], "name");
      setArrayCopy(_array);
    }
  }, [artifacts, heros]);

  useEffect(() => {
    let key = "name";
    let searchTerm = searchQuery.toLowerCase();
    let _arrayCopy = [...arrayCopy];
    const heroHeader = Object.keys(INIT_HEROHEADER).slice(1);
    const heroHeaderShortcut = heroHeader.map((v) => v[0]);
    const isKeySearch = debouncedSearchTerm.includes(":");

    if (debouncedSearchTerm === "") {
      setArraySearch([]);
    }

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

  const suggestedText = (name) => {
    const index = name.toLowerCase().indexOf(searchQuery);
    const { length } = searchQuery;
    const beforeBold = name.slice(0, index);
    const afterBold = name.slice(index + length);
    const bold = (
      <span
        style={{
          textDecoration: "underline",
        }}
      >
        {name.slice(index, index + length)}
      </span>
    );
    return (
      <>
        {beforeBold}
        {bold}
        {afterBold}
      </>
    );
  };

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
                to={`/${type.toLowerCase()}${
                  type.slice(-1) === "o" ? "es" : "s"
                }/${name}`}
                activeStyle={{ color: "darkblue" }}
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
                  {suggestedText(name)}
                  <span style={{ fontSize: "0.8rem" }}>{` in ${type}`}</span>
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
          setSearch(true);
        }}
        value={searchQuery}
        aria-label="Search"
        aria-required="true"
        onClick={() => setSearch(true)}
      />
    </div>
  );
};
