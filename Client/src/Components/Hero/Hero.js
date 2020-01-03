import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Redirect } from "react-router-dom";
import {
  Image,
  HeroGeneral,
  HeroStory,
  HeroSkins,
  HeroVoice
} from "./../components";
import ReactTooltip from "react-tooltip";
import { createHelmet } from "../../helpers/helpers.index";

//import css
import "../styles/hero.css";
import "../styles/tabStyles.css";

export const Hero = props => {
  let heroInfo;
  try {//temporary solution to invalid heroes. Will change once heroes go into the DB.
    heroInfo = require(`./../../Assets/heroes/${props.match.params.hero.toLowerCase()}/${props.match.params.hero.toLowerCase()}.json`);
  } catch (e) {
    return <Redirect to="/heroes/" />
  }
  const heroPath = `heroes/${props.match.params.hero.toLowerCase()}/`;
  window.scrollTo(0, 0);
  return (
    <>
      {createHelmet(heroInfo.name, `${heroInfo.name} - ${heroInfo.title}`)}
      <div className="flexBox" id="hero">
        <Image src={`${heroPath}portrait.png`} id={"portrait"} />
        <div>
          <h1>{heroInfo.name}</h1>
          <h2>{heroInfo.title}</h2>
          <div id="heroType" className="flexBox">
            <Image
              src={`classes/${heroInfo.class}.png`}
              id={"heroClassIcon"}
              style={{ border: "none" }}
              dataTip={heroInfo.class}
            />
            <Image
              src={`${heroInfo.damageType}.png`}
              id={"damageType"}
              alt={"dmg type"}
              style={{ border: "none" }}
              dataTip={heroInfo.damageType}
            />
            <p>{heroInfo.position}</p>
          </div>
        </div>
        <ReactTooltip border={true} />
      </div>
      <Tabs>
        <TabList>
          <Tab>General</Tab>
          <Tab>Story</Tab>
          <Tab>Skins</Tab>
          {/*<Tab>Voice</Tab> */}
        </TabList>
        <TabPanel>
          <HeroGeneral heroPath={heroPath} heroInfo={heroInfo} />
        </TabPanel>
        <TabPanel>
          <HeroStory
            heroPath={heroPath}
            name={heroInfo.name}
            backgroundData={heroInfo.background}
            title={heroInfo.title}
          />
        </TabPanel>
        <TabPanel>
          <HeroSkins heroPath={heroPath} skins={heroInfo.skins} />
        </TabPanel>
        <TabPanel>
          <HeroVoice heroPath={heroPath} voice={heroInfo.voice} />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Hero;
