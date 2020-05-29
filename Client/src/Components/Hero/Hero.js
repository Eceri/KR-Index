import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Redirect } from "react-router-dom";
import {
  Image,
  HeroGeneral,
  HeroStory,
  HeroSkins,
  HeroVoice,
} from "./../components";
import ReactTooltip from "react-tooltip";
import { createHelmet } from "../../helpers/helpers.index";

//import css
import "../styles/hero.css";
import "../styles/tabStyles.css";

//Relative Imports
import { AWSoperation, getHeroHeadInfo } from "Helpers";

export const Hero = (props) => {
  const [headInfo, setHeadInfo] = useState({});
  const heroName = props.match.params.hero;
  const heroPath = `heroes/${heroName.toLowerCase()}/`;

  useEffect(() => {
    AWSoperation(getHeroHeadInfo, { name: heroName }).then((res) =>
      setHeadInfo(res.data.getHero)
    );
  }, [heroName]);

  //handling #-Fragments for Tabs
  let hashFragments = window.location.hash.split("-");
  let initalTabIndex = 0;
  let scrollAnchor = hashFragments[1];

  if (hashFragments[0] === "#story") initalTabIndex = 1;
  else if (hashFragments[0] === "#skins") initalTabIndex = 2;
  //else if(hashFragments[0] == "#voice") initalTabIndex = 3
  else scrollAnchor = hashFragments[0];

  const tabSelected = (index, lastIndex) => {
    if (index !== lastIndex) {
      let url;
      if (index === 1) {
        url = "#story";
      } else if (index === 2) {
        url = "#skins";
      } else url = `/heroes/${headInfo.name}`;
      props.history.push(url);
      return true;
    }
    return false;
  };

  //scroll-To, needs to be manually done, due to timing with the page
  useEffect(() => {
    setTimeout(() => {
      if (scrollAnchor !== undefined) {
        let element = document.getElementById(
          `${scrollAnchor.slice(1)}-anchor`
        );
        let scrollToTopPosition = 0;
        if (element !== null) scrollToTopPosition = element.offsetTop - 60;
        window.scrollTo({
          top: scrollToTopPosition,
          left: 0,
          behavior: "smooth",
        });
      }
    });
  }, []);

  return (
    <>
      {Object.keys(headInfo).length > 1 ? (
        <>
          {createHelmet(headInfo.name, `${headInfo.name} - ${headInfo.title}`)}
          <div className="flexBox" id="hero">
            <Image src={`${heroPath}portrait.png`} id={"portrait"} />
            <div>
              <h1>{headInfo.name}</h1>
              <h2>{headInfo.title}</h2>
              <div id="heroType" className="flexBox">
                <Image
                  src={`classes/${headInfo.class.toLowerCase()}.png`}
                  id={"heroClassIcon"}
                  style={{ border: "none" }}
                  dataTip={headInfo.class}
                />
                <Image
                  src={`${headInfo.damageType}.png`}
                  id={"damageType"}
                  alt={"dmg type"}
                  style={{ border: "none" }}
                  dataTip={headInfo.damageType}
                />
                <p>{headInfo.position}</p>
              </div>
            </div>
            <ReactTooltip border={true} />
          </div>
          <Tabs defaultIndex={initalTabIndex} onSelect={tabSelected}>
            <TabList>
              <Tab>General</Tab>
              <Tab>Story</Tab>
              <Tab>Skins</Tab>
              {/* <Tab>Voice</Tab> */}
            </TabList>
            <TabPanel>
              <HeroGeneral heroPath={heroPath} heroName={heroName} />
            </TabPanel>
            <TabPanel>
              <HeroStory
                heroPath={heroPath}
                heroName={heroName}
                heroTitle={headInfo.title}
              />
            </TabPanel>
            <TabPanel>
              <HeroSkins heroPath={heroPath} heroName={heroName} />
            </TabPanel>
            {/* <TabPanel>
              <HeroVoice heroPath={heroPath} voice={heroInfo.voice} />
            </TabPanel> */}
          </Tabs>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Hero;
