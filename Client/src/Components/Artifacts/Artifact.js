import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { stars } from "../atoms/Stars/stars";
import { LOADING_ARTIFACT } from "../../Constants/constants.index";

const ArtifactStory = styled.section`
  padding: 1rem;
`;

const NameAndStars = styled.section`
  margin-top: 0;
  padding-bottom: 1rem;
`;

const Artifact = artifact => {
  const [star, setStar] = useState(0);
  return (
    <React.Fragment key={artifact.name}>
      {renderTop(artifact, star, setStar)}
      <p>{artifact.description[star]}</p>

      <ArtifactStory>{artifact.story}</ArtifactStory>
    </React.Fragment>
  );
};

const renderTop = (artifact, star, setStar) => (
  <div>
    <img
      src={require(`../../Assets/artifacts/${artifact.name}.png`)}
      alt="Pic"
      align="left"
      style={{ marginRight: "1rem", width: "96px" }}
    />
    <NameAndStars>
      <h1>{artifact.name}</h1>
      {stars(setStar, star)}
    </NameAndStars>
  </div>
);

export default Artifact;
