import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sortNames } from "./Components/components";

import styled from "styled-components";

const SearchBox = styled.div`
  width: 15rem;
  background-color: white;
  color: black;
  height: 15rem;
  position: absolute;
  top: 3.2rem;
  right: 12.5rem;
  overflow: auto;
  z-index: 2;
`;

const SearchListElement = styled.li`
  list-style-type: none;
  cursor: pointer;

  &:hover {
    background-color: #71b9f5;
  }
`;

export const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [artifacts, setArtifacts] = useState(
    JSON.parse(localStorage.getItem("Artifacts")) || []
  );
  const [search, setSeach] = useState(false);

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

  const artifactNamesfilter = (names, query) => {
    const artifactNames = names.map(artifact => artifact.name);
    return artifactNames.filter(v =>
      v.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <nav>
      <React.Fragment>
        <Link to={"/"} className={"navLink"}>
          <img
            src={require("./Assets/iconTest.png")}
            alt={"nagatoro.jpg"}
            style={{ width: 24, border: "none" }}
          />
        </Link>
        <Link to={"/heroes"} className="navLink">
          Heroes
          </Link>
        <Link to={"/artifacts"} className={"navLink"}>
          Artifacts
          </Link>
        {/* <Link to={"/etc"} className={"navLink"}>
          Etc.
          </Link> */}
      </React.Fragment>
      <React.Fragment>
        <input
          placeholder="Filter..."
          onChange={e => {
            setSearchQuery(e.currentTarget.value);
            setSeach(true);
          }}
          value={searchQuery}
          style={{ marginLeft: "auto"}}
          // onBlur={() => setSeach(false)}
          onClick={() => setSeach(true)}
        />
        {search && (
          <SearchBox>
            <ul style={{ margin: 0, padding: 0 }}>
              {artifactNamesfilter(artifacts, searchQuery).map(name => (
                <SearchListElement
                  key={name}
                  onClick={() => alert(`Go to Artifact: ${name}`)}
                >
                  {name}
                </SearchListElement>
              ))}
            </ul>
          </SearchBox>
        )}
      </React.Fragment>
    </nav>
  );
};
export default NavBar;
