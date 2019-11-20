import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import Helmet from "react-helmet";

import Artifact from "./Artifact";

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
  position: fixed;
  background-color: black;
`;

// Declarations -------------------------------------------------------------------------------------------------------

const loadingArtifact = [
  {
    description: [
      "30 sec after the battle starts, increases ATK of the ally with the highest ATK by 30%. This effect cannot be dispelled, and it does not stack with other effects for allies.",
      "30 sec after the battle starts, increases ATK of the ally with the highest ATK by 36%. This effect cannot be dispelled, and it does not stack with other effects for allies.",
      "30 sec after the battle starts, increases ATK of the ally with the highest ATK by 43%. This effect cannot be dispelled, and it does not stack with other effects for allies.",
      "30 sec after the battle starts, increases ATK of the ally with the highest ATK by 52%. This effect cannot be dispelled, and it does not stack with other effects for allies.",
      "30 sec after the battle starts, increases ATK of the ally with the highest ATK by 63%. This effect cannot be dispelled, and it does not stack with other effects for allies.",
      "30 sec after the battle starts, increases ATK of the ally with the highest ATK by 75%. This effect cannot be dispelled, and it does not stack with other effects for allies."
    ],
    name: "Abyssal Crown",
    story:
      "Hair accessory of Abyssal Goddess Xanadus. The serpent-shaped crown gives off a deadly scent."
  }
];

const sortNames = (data, direction) => {
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
  const [artifacts, setArtifacts] = useState(loadingArtifact);
  const [direction, setDirection] = useState("ASC");
  const [searchQuery, setSearchQuery] = useState("");

  // TODO: create process.ENV with
  useEffect(() => {
    fetch(`https://krc-api.herokuapp.com/api/artifacts/`)
      .then(res => {
        return res.json();
      })
      .then(data => setArtifacts(sortNames(data, direction)));
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
      <button
        onClick={() => setDirection(direction === "ASC" ? "DESC" : "ASC")}
        style={{ marginTop: "30%" }}
      >
        {direction}
      </button>
      <input
        placeholder="Filter..."
        onChange={e => setSearchQuery(e.currentTarget.value)}
        value={searchQuery}
      />
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
