import React, { useState } from "react";
import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { stars } from "../atoms/Stars/stars";

const ArtifactStory = styled.section`
  padding: 1rem;
`;

const NameAndStars = styled.section`
  margin-top: 0;
  padding-bottom: 1rem;
`;

// const SmallTab = styled(props => <Tab {...props} />)`
//   width: 50%;
//   list-style: none;

// `;

// SmallTab.tabsRole = "Tab";
const Artifact = artifact => {
  const [star, setStar] = useState(0);
  return (
    <>
      {renderTop(artifact, star, setStar)}
      <Tabs key={artifact.name}>
        <TabList>
          <Tab>Effect</Tab>
          <Tab>Story</Tab>
        </TabList>

        <TabPanel>
          <p>{artifact.description[star]}</p>
        </TabPanel>

        <TabPanel>
          <ArtifactStory>{artifact.story}</ArtifactStory>
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
