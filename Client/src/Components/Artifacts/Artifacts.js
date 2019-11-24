import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

// Relative imports ---------------------------------------------------------------------------------------------------
import Artifact from "./Artifact";
import {
  LOADING_ARTIFACT,
  API_URL,
  ARTIFACT_URL
} from "../../Constants/constants.index";
import {
  createHelmet,
  GET_LOCALSTORAGE,
  SET_LOCALSTORAGE
} from "../../helpers/helpers.index";

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

export const Artifacts = () => {
  const chosenArtifactName = window.location.pathname.split("/")[2];
  const replaceChosenArtifactName =
    chosenArtifactName !== undefined && chosenArtifactName.replace(/%20/g, " ");
  const ARTIFACTS = "Artifacts";
  const [artifactName, setArtifactName] = useState(replaceChosenArtifactName);
  const [artifacts, setArtifacts] = useState(
    JSON.parse(GET_LOCALSTORAGE(ARTIFACTS)) || LOADING_ARTIFACT
  );
  const [direction, setDirection] = useState("ASC");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      setArtifactName(replaceChosenArtifactName);
    } catch (error) {}
  }, []);

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

  const getFirstArtifactMatches = name =>
    artifacts.filter(artifact => artifact.name === name)[0];

  return (
    <div id="content">
      {createHelmet()}
      <ClickedArtifact>
        {Artifact(
          getFirstArtifactMatches(artifactName) === undefined
            ? LOADING_ARTIFACT[0]
            : getFirstArtifactMatches(artifactName)
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
