import React, { useState, useEffect, useRef, useGlobal } from "reactn";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { useLocation } from "react-router-dom";

// Relative imports
import { Artifact } from "Components";
import { LOADING_ARTIFACT } from "Constants";
import {
  createHelmet,
  GET_LOCALSTORAGE,
  SET_LOCALSTORAGE,
  AWSoperation,
  sortedSearch,
  listOrderedArtifacts,
  useWindowDimensions,
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
const ARTIFACTS = "Artifacts";
export const Artifacts = () => {
  // Location
  const { pathname } = useLocation();
  const chosenArtifactName = pathname.split("/")[2];
  const replaceChosenArtifactName =
    chosenArtifactName !== undefined
      ? decodeURIComponent(chosenArtifactName)
      : LOADING_ARTIFACT.name;

  // State
  const [artifactName, setArtifactName] = useState(
    replaceChosenArtifactName || LOADING_ARTIFACT.name
  );
  const [artifacts, setArtifacts] = useState(
    JSON.parse(GET_LOCALSTORAGE(ARTIFACTS)) || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [fetch, setFetch] = useState(true);
  const [fetchControl, setFetchControl] = useState(true);

  const { height } = useWindowDimensions();
  // Scroll
  const scrollRef = useRef(null);
  const executeScroll = () => scrollToRef(scrollRef);

  // Globals
  const [globalArtifacts, setGlobalArtifacts] = useGlobal("artifacts");

  useEffect(() => {
    executeScroll();
  }, [artifactName]);

  // const handleScroll = () => {
  //   if (
  //     height + document.documentElement.scrollTop !==
  //     document.documentElement.offsetHeight
  //   )
  //     return;

  //   setFetch(true);
  // };

  useEffect(() => {
    AWSoperation(listOrderedArtifacts).then((artifacts) => {
      setArtifacts(artifacts);
      setGlobalArtifacts(artifacts);
    });
    // window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    try {
      if (chosenArtifactName !== "") {
        setArtifactName(replaceChosenArtifactName);
      }
    } catch (error) {
      console.error(error);
    }
  }, [replaceChosenArtifactName]);

  useEffect(() => {
    if (searchQuery !== "") {
      setArtifacts(sortedSearch(globalArtifacts, "name", searchQuery));
    } else {
      setArtifacts(globalArtifacts);
    }
  }, [searchQuery]);

  // useEffect(() => {

  //   if (fetch && fetchControl) {
  //     try {
  //       AWSoperation(listOrderedArtifacts, {
  //         limit: 35,
  //         nextToken: token,
  //       }).then(({ items, nextToken }) => {
  //         let joinArtifacts = artifacts.concat(items);
  //         token = nextToken;
  //         setArtifacts(joinArtifacts);
  //         setCopyArtifacts(joinArtifacts);
  //         if (token === null) {
  //           // SET_LOCALSTORAGE(ARTIFACTS, joinArtifacts);
  //           setFetchControl(false);
  //         }
  //       });
  //       setFetch(false);
  //     } catch (error) {
  //       history.pushState(error, "Error", "/404");
  //     }
  //   }
  // }, [fetch]);

  return (
    <div id="content" ref={scrollRef}>
      {createHelmet(
        artifactName,
        `Artifact - ${artifactName}`,
        `artifacts/${artifactName}`
      )}
      <ClickedArtifact>{Artifact(artifactName)}</ClickedArtifact>
      <ArtifactContainer>
        <div style={{ marginBottom: "1rem" }}>
          <Filterbox
            placeholder="Filter..."
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            value={searchQuery}
            onClick={() => setFetch(true)}
          />
        </div>
        {artifacts.map((item, index) =>
          renderArtifactPictures(item, index, setArtifactName)
        )}
      </ArtifactContainer>
    </div>
  );
};

const renderArtifactPictures = (
  { name, drop, release },
  index,
  setArtifactName
) => (
  <React.Fragment key={name + index}>
    <ArtifactImage
      onClick={() => {
        setArtifactName(name);
        window.history.pushState(
          `artifact/${name}`,
          name,
          `/artifacts/${encodeURIComponent(name)}`
        );
      }}
      src={`/assets/artifacts/${name}.png`}
      alt={`Picture of ${name}`}
      align="left"
      data-tip
      data-for={name}
    />
    <ReactTooltip id={name}>
      {name}
      {`\n Drop: ${drop} \n Release: ${release}`}
    </ReactTooltip>
  </React.Fragment>
);

export default Artifacts;
