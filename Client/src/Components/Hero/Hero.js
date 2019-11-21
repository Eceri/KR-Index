import React from "react";
import "../styles/hero.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../styles/tabStyles.css";
import Helmet from "react-helmet";
import {
  Image,
  HeroGeneral,
  HeroStory,
  HeroSkins,
  HeroVoice
} from "./../components";
import "../styles/heroSkills.css";

export const Hero = props => {
  const heroName = props.match.params.hero;
  const heroPath = `heroes/${heroName}/`;
  let heroInfo = require(`./../../Assets/heroes/${heroName}/${heroName}.json`)

  const title = (
    <Helmet>
      <title>{`${heroName}`}</title>
      <meta name="description" content="Helmet application" />
    </Helmet>
  );
  return <>
    {title}
    <div className="flexBox" id="hero">
      <Image
        src={`${heroPath}portrait.png`}
        id={"portrait"}
      />
      <div>
        <h1>{heroInfo.name}</h1>
        <h2>{heroInfo.title}</h2>
        <div id="heroType" className="flexBox">
          <Image
            src={`classes/${heroInfo.class}.png`}
            id={"heroClassIcon"}
            style={{ border: "none" }}
          />
          <Image src={`${heroInfo.damageType}.png`}
            id={"damageType"}
            style={{ border: "none" }} />
          <p>{heroInfo.position}</p>
        </div>
      </div>
    </div>
    <Tabs>
      <TabList>
        <Tab>General</Tab>
        <Tab>Story</Tab>
        <Tab>Skins</Tab>
        <Tab>Voice</Tab>
      </TabList>
      <TabPanel>
        <HeroGeneral heroPath={heroPath}
          heroInfo={heroInfo} />
      </TabPanel>
      <TabPanel>
        <HeroStory
          heroPath={heroPath}
          name={heroInfo.name}
          backgroundData={heroInfo.background}
          title={heroInfo.title} />
      </TabPanel>
      <TabPanel>
        <HeroSkins heroPath={heroPath}
          skins={heroInfo.skins} />
      </TabPanel>
      <TabPanel>
        <HeroVoice
          heroPath={heroPath}
          voice={heroInfo.voice} />
      </TabPanel>
    </Tabs>
  </>
}

export default Hero;