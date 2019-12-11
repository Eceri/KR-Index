import React, { useState } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { stars } from "../atoms/Stars/stars";

const ArtifactText = styled.section`
  height: 7rem;
  overflow: auto;
  width: 100%;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
  }
  &::-webkit-scrollbar-thumb {
    background: #303030;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: white;
  }
`;

const NameAndStars = styled.section`
  margin-top: 0;
`;

const SmallTab = styled(props => <Tab {...props} />)`
  width: 6rem;
  list-style: none;
  padding: 0.3rem;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

SmallTab.tabsRole = "Tab";

const Artifact = artifact => {
  const [star, setStar] = useState(0);

  return (
    <>
      {renderTop(artifact, star, setStar)}
      <Tabs key={artifact.name}>
        <TabList>
          <SmallTab>Effect</SmallTab>
          <SmallTab>Story</SmallTab>
        </TabList>

        <TabPanel>
          <ArtifactText>{artifact.description[star]}</ArtifactText>
        </TabPanel>

        <TabPanel>
          <ArtifactText>{artifact.story}</ArtifactText>
        </TabPanel>
      </Tabs>
    </>
  );
};

const renderTop = (artifact, star, setStar) => (
  <div>
    <img
      src={require(`../../Assets/artifacts/${artifact.name}.png`)}
      alt="Pic"
      align="left"
      style={{ marginRight: "1rem", width: "96px", marginBottom: "2rem" }}
    />
    <NameAndStars>
      <h1>{artifact.name}</h1>
      {stars(setStar, star)}
    </NameAndStars>
  </div>
);

export default Artifact;
