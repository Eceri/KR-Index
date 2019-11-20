import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import Helmet from "react-helmet";

import Artifact from "./Artifact";
import {LOADING_ARTIFACT} from "../../Constants/Components/constants.Artifacts"

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


export const Artifacts = () => {
  const [artifactNumber, setArtifactNumber] = useState(0);
  const [artifacts, setArtifacts] = useState(LOADING_ARTIFACT);

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
        artifacts[artifactNumber]
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
