import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

// Relative imports
import Artifact from "./Artifact";
import { LOADING_ARTIFACT } from "../../Constants/constants.index";
import {
  createHelmet,
  GET_LOCALSTORAGE,
  SET_LOCALSTORAGE,
  AWSoperation,
  listArtifacts,
  sortedSearch,
} from "Helpers";
import { Button } from "../atoms/atoms.index";

// Styled Components
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

// Implementation

const filterArtifacts = (artifacts, query) => {
  return artifacts.filter((v) =>
    v.name.toLowerCase().includes(query.toLowerCase())
  );
};

const scrollToRef = (ref) => window.scrollTo(0, ref.offsetTop);

export const Artifacts = () => {
  const chosenArtifactName = window.location.pathname.split("/")[2];
  const replaceChosenArtifactName =
    chosenArtifactName !== undefined
      ? decodeURIComponent(chosenArtifactName)
      : LOADING_ARTIFACT.name;
  const ARTIFACTS = "Artifacts";
  const [artifactName, setArtifactName] = useState(
    replaceChosenArtifactName || "Abyssal Crown"
  );
  const [artifacts, setArtifacts] = useState(
    JSON.parse(GET_LOCALSTORAGE(ARTIFACTS)) || [LOADING_ARTIFACT]
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
      if (chosenArtifactName !== "") {
        setArtifactName(replaceChosenArtifactName);
      }
    } catch (error) {
      console.log(error);
    }
  }, [replaceChosenArtifactName]);

  useEffect(() => {
    AWSoperation(listArtifacts).then((artifacts) => {
      setArtifacts(sortedSearch(artifacts.data.listArtifacts.items, "name"));
      SET_LOCALSTORAGE(ARTIFACTS, artifacts.data.listArtifacts.items);
    });
  }, []);

  return (
    <div id="content" ref={scrollRef}>
      {createHelmet(artifactName)}
      <ClickedArtifact>{Artifact(artifactName)}</ClickedArtifact>
      <ArtifactContainer>
        <div style={{ marginBottom: "1rem" }}>
          <Button
            onClick={() => setDirection(direction === "ASC" ? "DESC" : "ASC")}
          >
            {direction}
          </Button>
          <FilterBox
            placeholder="Filter..."
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            value={searchQuery}
          />
        </div>
        {filterArtifacts(artifacts, searchQuery).map((item, index) =>
          renderArtifactPictures(item, index, setArtifactName)
        )}
      </ArtifactContainer>
    </div>
  );
};

const picURL = (name) => {
  try {
    return require(`Assets/artifacts/${name}.png`);
  } catch (error) {
    console.error(`Picture for ${name} is missing`);
  }
};
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
      src={picURL(item.name)}
      alt={`Picture of ${item.name}`}
      align="left"
      data-tip
      data-for={item.name}
    />
    <ReactTooltip id={item.name}>
      {item.name}
      {`\n Drop: ${item.drop} \n Release: ${item.release}`}
    </ReactTooltip>
  </React.Fragment>
);

export default Artifacts;
