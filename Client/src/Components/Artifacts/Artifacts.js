import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import Helmet from "react-helmet";

import Artifact from "./Artifact";
import {
  LOADING_ARTIFACT,
  API_URL,
  ARTIFACT_URL
} from "../../Constants/constants.index";

// Styled Components --------------------------------------------------------------------------------------------------

const ArtifactContainer = styled.div`
  width: 100%;
`;

const ArtifactImage = styled.img`
  margin-right: 1rem;
  margin-bottom: 1rem;
  width: 96px;

  &:hover {
    cursor: pointer;
  }
`;

const ClickedArtifact = styled.section`
  padding: 1rem;
  top: 3rem;
  position: fixed;
  background-color: #404040;
  width: 53.8rem;
  height: 14rem;
`;

// Implementation -----------------------------------------------------------------------------------------------------

// TODO: Refactore into own file
// FIXME: Make me generic!!!
export const sortNames = (data, direction) => {
  if (direction === "ASC") {
    return data.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }
  if (direction === "DESC") {
    return data.reverse();
  }
};

const filterArtifacts = (artifacts, query) => {
  return artifacts.filter(v =>
    v.name.toLowerCase().includes(query.toLowerCase())
  );
};

// FIXME: Refactore into own File with getter and setter
const GET_LOCALSTORAGE = name => localStorage.getItem(name);
const SET_LOCALSTORAGE = (name, item) => localStorage.setItem(name, item);

export const Artifacts = () => {
  const ARTIFACTS = "Artifacts";
  const [artifactName, setArtifactName] = useState("Abyssal Crown");
  const [artifacts, setArtifacts] = useState(
    JSON.parse(GET_LOCALSTORAGE(ARTIFACTS)) || LOADING_ARTIFACT
  );
  const [direction, setDirection] = useState("ASC");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const chosenArtifactName = window.location.pathname
        .split("/")[2]
        .replace(/%20/g, " ");
      setArtifactName(chosenArtifactName);
    } catch (error) {}
  }, []);

  // TODO: create process.ENV with
  useEffect(() => {
    if (GET_LOCALSTORAGE(ARTIFACTS) === null) {
      fetch(`${API_URL}${ARTIFACT_URL}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setArtifacts(sortNames(data, "ASC"));
          SET_LOCALSTORAGE(ARTIFACTS, JSON.stringify(sortNames(data, "ASC")));
        });
    }
  }, []);

  return (
    <div id="content">
      <Helmet>
        <title>{`Artifacts`}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <ClickedArtifact>
        {/* FIXME: I am ugly REFACTORE ME!!! */}
        {Artifact(
          artifacts.filter(artifact => artifact.name === artifactName)[0] ===
            undefined
            ? LOADING_ARTIFACT[0]
            : artifacts.filter(artifact => artifact.name === artifactName)[0]
        )}
      </ClickedArtifact>
      <div style={{ marginTop: "17rem", marginBottom: "1rem" }}>
        <button
          onClick={() => setDirection(direction === "ASC" ? "DESC" : "ASC")}
        >
          {direction}
        </button>
        <input
          placeholder="Filter..."
          onChange={e => setSearchQuery(e.currentTarget.value)}
          value={searchQuery}
        />
      </div>
      {renderArtifactContainer(
        artifacts,
        searchQuery,
        direction,
        setArtifactName
      )}
    </div>
  );
};

const renderArtifactContainer = (
  artifacts,
  searchQuery,
  direction,
  setArtifactName
) => (
  <ArtifactContainer>
    {sortNames(
      filterArtifacts(artifacts, searchQuery),
      direction
    ).map((item, index) =>
      renderArtifactPictures(item, index, setArtifactName)
    )}
  </ArtifactContainer>
);

const renderArtifactPictures = (item, index, setArtifactName) => (
  <React.Fragment key={item.name + index}>
    <ArtifactImage
      onClick={() => {
        setArtifactName(item.name);
        window.history.pushState(
          `artifact/${item.name}`,
          item.name,
          `/artifacts/${item.name}`
        );
      }}
      src={require(`../../Assets/artifacts/${item.name}.png`)}
      alt={`Picture of ${item.name}`}
      align="left"
      data-tip
      data-for={item.name}
    />
    <ReactTooltip id={item.name}>{item.name}</ReactTooltip>
  </React.Fragment>
);

export default Artifacts;
