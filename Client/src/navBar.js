import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { sortNames } from "./Components/components";
import styled from "styled-components";

const SearchBox = styled.div`
  width: 15rem;
  background-color: white;
  color: black;
  height: 15rem;
  position: relative;
  overflow: auto;
  z-index: 2;
  left: 26.65rem;
  top: 3rem;
`;

const SearchListElement = styled.li`
  list-style-type: none;
  cursor: pointer;

  &:hover {
    background-color: #71b9f5;
  }
`;

let heroesClasses = {
  Knight: [
    "Phillop",
    "Clause",
    "Demia",
    "Morrah",
    "Jane",
    "Ricardo",
    "Aselica",
    "Neraxis",
    "Sonia",
    "Glenwys",
    "Loman",
    "Dosarta"
  ],
  Warrior: [
    "Kasel",
    "Gau",
    "Naila",
    "Theo",
    "Viska",
    "Priscilla",
    "Seria",
    "Scarlet",
    "Kirze",
    "Chase",
    "Bernheim",
    "Nicky"
  ],
  Assassin: [
    "Roi",
    "Epis",
    "Reina",
    "Fluss",
    "Tanya",
    "Ezekiel",
    "Erze",
    "Laudia",
    "Mirianne",
    "Nia",
    "Gladi"
  ],
  Archer: [
    "Selene",
    "Dimael",
    "Luna",
    "Arch",
    "Yanne",
    "Zafir",
    "Yuria",
    "Requina",
    "Shamilla"
  ],
  Mechanic: [
    "Lakrak",
    "Miruru",
    "Rodina",
    "Annette",
    "Mitra",
    "Oddy",
    "Crow",
    "Chrisha",
    "Kara",
    "Cecilia",
    "Hanus",
    "Pansirone"
  ],
  Wizard: [
    "Cleo",
    "Maria",
    "Lorraine",
    "Pavel",
    "Aisha",
    "Lewisia",
    "Nyx",
    "Ophelia",
    "Lilia",
    "Artemia",
    "Esker",
    "Dakaris",
    "Veronica",
    "Cain"
  ],
  Priest: [
    "Frey",
    "Kaulah",
    "Rephy",
    "Baudouin",
    "Leo",
    "Laias",
    "Cassandra",
    "Mediana",
    "Lavril",
    "Lucias",
    "Shea",
    "May",
    "Juno",
    "Rehartna"
  ]
};

const searchFilter = (names, query) => {
  const heroeNames = Object.values(heroesClasses).flat();
  const artifactNames = names.map(artifact => artifact.name);
  const artifactResults = artifactNames.filter(v =>
    v.toLowerCase().includes(query.toLowerCase())
  );
  const heroeResults = heroeNames.filter(v =>
    v.toLowerCase().includes(query.toLowerCase())
  );
  return [...artifactResults, ...heroeResults].sort();
};

export const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [artifacts, setArtifacts] = useState(
    JSON.parse(localStorage.getItem("Artifacts")) || []
  );
  const [search, setSeach] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("Artifacts") === null) {
      fetch(`https://krc-api.herokuapp.com/api/artifacts/`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setArtifacts(sortNames(data, "ASC"));
          localStorage.setItem(
            "Artifacts",
            JSON.stringify(sortNames(data, "ASC"))
          );
        });
    }
  }, []);

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) setSeach(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <nav>
      <Link to={"/"} className={"navLink"}>
        <img
          src={"/favicon.png"}
          alt={"favicon.png"}
          style={{ width: 24, border: "none" }}
        />
      </Link>
      <Link to={"/heroes/"} className="navLink">
        Heroes
      </Link>
      <Link to={"/artifacts"} className={"navLink"}>
        Artifacts
      </Link>
      {/* <Link to={"/etc"} className={"navLink"}>
          Etc.
          </Link> */}
      {renderSearch(
        search,
        ref,
        artifacts,
        searchQuery,
        setSearchQuery,
        setSeach
      )}
    </nav>
  );
};

const renderSearch = (
  search,
  ref,
  artifacts,
  searchQuery,
  setSearchQuery,
  setSeach
) => (
  <React.Fragment>
    {renderSearchBox(search, artifacts, ref, searchQuery)}
    <input
      placeholder="Filter..."
      onChange={e => {
        setSearchQuery(e.currentTarget.value);
        setSeach(true);
      }}
      value={searchQuery}
      style={{ marginLeft: "auto", width: "15rem" }}
      onClick={() => setSeach(true)}
      ref={ref}
    />
  </React.Fragment>
);

const renderSearchBox = (search, artifacts, ref, searchQuery) =>
  search && (
    <SearchBox ref={ref}>
      <ul style={{ margin: 0, padding: 0 }}>
        {searchFilter(artifacts, searchQuery).map(name => (
          <SearchListElement
            key={name}
            onClick={() => window.open(`/artifacts/${name}`, "_self")}
          >
            {name}
          </SearchListElement>
        ))}
      </ul>
    </SearchBox>
  );

export default NavBar;
