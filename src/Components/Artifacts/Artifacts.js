import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

// Relative imports
import { Artifact, Image } from "Components";
import { LOADING_ARTIFACT } from "Constants";
import {
  createHelmet,
  GET_LOCALSTORAGE,
  SET_LOCALSTORAGE,
  AWSoperation,
  sortedSearch,
  listOrderedArtifacts,
  picURL,
} from "Helpers";
import { Filterbox } from "Styles";

// Styled Components
const ArtifactContainer = styled.div`
  position: relative;
  padding-left: 1.5rem;

  @media only screen and (max-width: 650px) {
    padding-left: 0.2rem;
  }
`;

const ArtifactImage = styled.img`
  margin-right: 1rem;
  margin-bottom: 1rem;
  width: 6rem;

  &:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 650px) {
    margin-right: 0.75rem;
    margin-bottom: 0.75rem;
    width: 4.2rem;
  }
`;

const ClickedArtifact = styled.section`
  padding: 1rem;
  padding-left: 0;
  padding-right: 0;
  background-color: #404040;
  height: 17rem;
`;

// Implementation

const scrollToRef = (ref) => window.scrollTo(0, ref.offsetTop);
let token = null;
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
    JSON.parse(GET_LOCALSTORAGE(ARTIFACTS)) || []
  );
  const [copyArtifacts, setCopyArtifacts] = useState(artifacts);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef(null);
  const executeScroll = () => scrollToRef(scrollRef);
  const [fetch, setFetch] = useState(true);
  const [fetchControl, setFetchControl] = useState(true);

  useEffect(() => {
    executeScroll();
  }, [artifactName]);

  useEffect(() => {
    try {
      if (chosenArtifactName !== "") {
        setArtifactName(replaceChosenArtifactName);
      }
    } catch (error) {
      console.error(error);
    }
  }, [replaceChosenArtifactName]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;

    setFetch(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setCopyArtifacts(artifacts);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery !== "") {
      setArtifacts(sortedSearch(artifacts, "name", searchQuery));
    } else {
      setArtifacts(copyArtifacts);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (fetch && fetchControl) {
      try {
        AWSoperation(listOrderedArtifacts, {
          limit: 35,
          nextToken: token,
        }).then((artifact) => {
          const { items, nextToken } = artifact.data.artifactsByOrder;
          let joinArtifacts = artifacts.concat(items);
          token = nextToken;
          setArtifacts(joinArtifacts);
          if (token === null) {
            // SET_LOCALSTORAGE(ARTIFACTS, joinArtifacts);
            setFetchControl(false);
          }
        });
        setFetch(false);
      } catch (error) {
        history.pushState(error, "Error", "/404");
      }
    }
  }, [fetch]);

  return (
    <div id="content" ref={scrollRef}>
      {createHelmet(artifactName)}
      <ClickedArtifact>{Artifact(artifactName)}</ClickedArtifact>
      <ArtifactContainer>
        <div style={{ marginBottom: "1rem" }}>
          <Filterbox
            placeholder="Filter..."
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            value={searchQuery}
          />
        </div>
        {artifacts.map((item, index) =>
          renderArtifactPictures(item, index, setArtifactName)
        )}
      </ArtifactContainer>
    </div>
  );
};

const renderArtifactPictures = (item, index, setArtifactName) => (
  <React.Fragment key={item.name + index}>
    <Image
      onClick={() => {
        setArtifactName(item.name);
        window.history.pushState(
          `artifact/${item.name}`,
          item.name,
          `/artifacts/${encodeURIComponent(item.name)}`
        );
      }}
      src={picURL("artifacts", item.name)}
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
