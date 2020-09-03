import React, { useEffect, useState, useGlobal } from "reactn";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// Relative Imports
import {
  HeroGeneral,
  HeroStory,
  HeroSkins,
  HeroVoice,
  HeroHeader,
} from "Components";
import ReactTooltip from "react-tooltip";
import { createHelmet } from "Helpers";
import "../styles/hero.css";
import "../styles/tabStyles.css";

export const Hero = (props) => {
  const [error, setError] = useGlobal("error");
  const [heroName, setGlobalHeroName] = useGlobal("heroName");

  let correctName;
  useEffect(() => {
    correctName = props.match.params.hero
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setGlobalHeroName(correctName);
  }, [correctName]);

  //handling #-Fragments for Tabs
  let hashFragments = window.location.hash.split("-");
  let initalTabIndex;
  let scrollAnchor = hashFragments[1];
  switch (hashFragments[0]) {
    case "#story":
      initalTabIndex = 1;
      break;
    case "#skins":
      initalTabIndex = 2;
      break;
    default:
      initalTabIndex = 0;
      scrollAnchor = hashFragments[0];
      break;
  }
  //Change method for React-Tabs
  const tabSelected = (index, lastIndex) => {
    if (index !== lastIndex) {
      let url;
      if (index === 1) {
        url = "#story";
      } else if (index === 2) {
        url = "#skins";
      } else url = `/heroes/${heroName}`;
      props.history.push(url);

      return true;
    }
    return false;
  };

  // scroll-To, needs to be manually done, due to timing with the page
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
  }, [scrollAnchor]);

  return (
    <>
      <HeroHeader />
      {createHelmet(heroName, `Details - ${heroName}`, `/heroes/${heroName.toLowerCase()}/portrait.png`)}
      <Tabs defaultIndex={initalTabIndex} onSelect={tabSelected}>
        <TabList>
          <Tab>General</Tab>
          <Tab>Story</Tab>
          <Tab>Skins</Tab>
          {/* <Tab>Voice</Tab> */}
        </TabList>
        <TabPanel>
          <HeroGeneral />
        </TabPanel>
        <TabPanel>
          <HeroStory />
        </TabPanel>
        <TabPanel>
          <HeroSkins />
        </TabPanel>
      </Tabs>
      <ReactTooltip />
    </>
  );
};

export default Hero;
