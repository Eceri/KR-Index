import React, { useState, useEffect, useRef } from "react";
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
import { Button } from "../atoms/atoms.index";

// Styled Components --------------------------------------------------------------------------------------------------

const ArtifactContainer = styled.div`
  position: relative;
  padding-left: 1.5rem;
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
  padding-left: 0;
  background-color: #404040;
  height: 17rem;
`;

const FilterBox = styled.input`
  background-color: #303030;
  padding: 0.3rem;
  color: white;
  &::placeholder {
    color: white;
  }
  border: 1px solid transparent;

  &:focus {
    box-shadow: -1px -1px 9px white;
    outline: none;
  }

  &:hover {
    box-shadow: -1px -1px 9px #303030;
  }
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

const scrollToRef = ref => window.scrollTo(0, ref.offsetTop);

export const Artifacts = () => {
  const chosenArtifactName = window.location.pathname.split("/")[2];
  const replaceChosenArtifactName =
    chosenArtifactName !== undefined && decodeURIComponent(chosenArtifactName);
  const ARTIFACTS = "Artifacts";
  const [artifactName, setArtifactName] = useState(replaceChosenArtifactName);
  const [artifacts, setArtifacts] = useState(
    JSON.parse(GET_LOCALSTORAGE(ARTIFACTS)) || LOADING_ARTIFACT
  );
  const [direction, setDirection] = useState("ASC");
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef(null);
  const executeScroll = () => scrollToRef(scrollRef);

  useEffect(() => {
    executeScroll();
  }, [artifactName]);

  useEffect(() => {
    try {
      setArtifactName(replaceChosenArtifactName);
    } catch (error) {}
  }, [replaceChosenArtifactName]);

  useEffect(() => {
    fetch(`${API_URL}${ARTIFACT_URL}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setArtifacts(sortNames(data, "ASC"));
        SET_LOCALSTORAGE(ARTIFACTS, JSON.stringify(sortNames(data, "ASC")));
      });
  }, []);

  const getFirstArtifactMatches = name =>
    artifacts.filter(artifact => artifact.name === name)[0];

  return (
    <div id="content" ref={scrollRef}>
      {createHelmet(artifactName)}
      <ClickedArtifact>
        {Artifact(
          getFirstArtifactMatches(artifactName) === undefined
            ? LOADING_ARTIFACT[0]
            : getFirstArtifactMatches(artifactName)
        )}
      </ClickedArtifact>
      {renderArtifactContainer(
        artifacts,
        searchQuery,
        direction,
        setArtifactName,
        setDirection,
        setSearchQuery
      )}
    </div>
  );
};

const renderArtifactContainer = (
  artifacts,
  searchQuery,
  direction,
  setArtifactName,
  setDirection,
  setSearchQuery
) => (
  <ArtifactContainer>
    <div style={{ marginBottom: "1rem" }}>
      <Button
        onClick={() => setDirection(direction === "ASC" ? "DESC" : "ASC")}
      >
        {direction}
      </Button>
      <FilterBox
        placeholder="Filter..."
        onChange={e => setSearchQuery(e.currentTarget.value)}
        value={searchQuery}
      />
    </div>
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
          `/artifacts/${encodeURIComponent(item.name)}`
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
