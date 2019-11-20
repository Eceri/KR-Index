import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import Helmet from "react-helmet";

import Artifact from "./Artifact";
import { LOADING_ARTIFACT } from "../../Constants/Components/constants.Artifacts";

// Styled Components --------------------------------------------------------------------------------------------------

const ArtifactContainer = styled.div`
  width: 100%;
  display: inline-block;
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
  top: 3rem;
  position: fixed;
  background-color: #404040;
  width: 50rem;
  height: 17rem;
`;

// Declarations -------------------------------------------------------------------------------------------------------

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
  const [artifactName, setArtifactName] = useState("Abyssal Crown");
  const [artifacts, setArtifacts] = useState(
    JSON.parse(localStorage.getItem("Artifacts")) || LOADING_ARTIFACT
  );
  const [direction, setDirection] = useState("ASC");
  const [searchQuery, setSearchQuery] = useState("");

  // TODO: create process.ENV with
  useEffect(() => {
    JSON.parse(localStorage.getItem("Artifacts")).length < 1 &&
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
  }, []);

  return (
    <div id="content">
      <Helmet>
        <title>{`Artifacts`}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <ClickedArtifact>
        {Artifact(
          artifacts.filter(artifact => artifact.name === artifactName)[0]
        )}
      </ClickedArtifact>
      <div style={{ marginTop: "32%", marginBottom: "1rem" }}>
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
      <ArtifactContainer>
        {sortNames(filterArtifacts(artifacts, searchQuery), direction).map(
          (item, index) => (
            <React.Fragment key={item.name + index}>
              <ArtifactImage
                onClick={() => setArtifactName(item.name)}
                src={require(`../../Assets/artifacts/${item.name}.png`)}
                alt={`Picture of ${item.name}`}
                align="left"
                data-tip
                data-for={item.name}
              />
              <ReactTooltip id={item.name}>{item.name}</ReactTooltip>
            </React.Fragment>
          )
        )}
      </ArtifactContainer>
    </div>
  );
};

export default Artifacts;
