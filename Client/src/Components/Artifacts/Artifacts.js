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

const Scrollable = styled.div`
  // overflow: auto;
  // height: 62vh;
`;
// Declarations -------------------------------------------------------------------------------------------------------

const loadingArtifact = {
  name: "Burning Brazier of Elf",
  description: [
    "Upon attacking an enemy, there is a 10% chance to recover 1 MP.",
    "Upon attacking an enemy, there is a 12% chance to recover 1 MP.",
    "Upon attacking an enemy, there is a 14% chance to recover 1 MP.",
    "Upon attacking an enemy, there is a 17% chance to recover 1 MP.",
    "Upon attacking an enemy, there is a 20% chance to recover 1 MP.",
    "Upon attacking an enemy, there is a 25% chance to recover 1 MP."
  ],
  story:
    "A mysterious brazier crafted by ancient Elves to honor the mother nature. It is the pinnacle of their magic, capable of producing an infinite amount of mana.",
  picture: 1
};

export const Artifacts = () => {
  const [artifactNumber, setArtifactNumber] = useState(0);
  const [artifacts, setArtifacts] = useState();

  // TODO: create process.ENV with
  useEffect(() => {
    fetch(`https://krc-api.herokuapp.com/api/artifacts/`)
      .then(res => {
        return res.json();
      })
      .then(data => setArtifacts(data.sort((a, b) => a.name > b.name)));
  }, []);

  return (
    <div id="content">
      <Helmet>
        <title>{`Artifacts`}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {Artifact(
        artifacts === undefined ? loadingArtifact : artifacts[artifactNumber]
      )}
      <ArtifactContainer>
        <Scrollable>
          {artifacts &&
            artifacts.map((item, index) => (
              <React.Fragment key={item.name + index}>
                <ArtifactImage
                  onClick={() => setArtifactNumber(index)}
                  src={require(`../../Assets/artifacts/${item.name}.png`)}
                  alt={`Picture of ${item.name}`}
                  align="left"
                  data-tip
                  data-for={item.name}
                />
                <ReactTooltip id={item.name}>{item.name}</ReactTooltip>
              </React.Fragment>
            ))}
        </Scrollable>
      </ArtifactContainer>
    </div>
  );
};

export default Artifacts;
