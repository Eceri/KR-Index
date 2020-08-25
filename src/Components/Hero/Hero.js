import React, { useEffect, useState, useGlobal } from "reactn";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// Relative Imports
import {
  Image,
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

  const correctName = props.match.params.hero;
  useEffect(() => {
    correctName
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setGlobalHeroName(correctName);
  }, [correctName]);

  const heroPath = `heroes/${props.match.params.hero.toLowerCase()}/`;

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
    // case "#voice":
    //   initalTabIndex = 3;
    //   break;
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

  //scroll-To, needs to be manually done, due to timing with the page
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (scrollAnchor !== undefined) {
  //       let element = document.getElementById(
  //         `${scrollAnchor.slice(1)}-anchor`
  //       );
  //       let scrollToTopPosition = 0;
  //       if (element !== null) scrollToTopPosition = element.offsetTop - 60;
  //       console.log("anchor: " + element.offsetTop);
  //       window.scrollTo({
  //         top: scrollToTopPosition,
  //         left: 0,
  //         behavior: "smooth",
  //       });
  //     }
  //   });
  // }, [scrollAnchor]);

  return (
    <>
      <>
        {/* {createHelmet(headInfo.name, `${headInfo.name} - ${headInfo.title}`)} */}
        {/* {createHelmet(headInfo.name, `${headInfo.name} - ${headInfo.title}`)} */}
        <HeroHeader heroPath={heroPath} />
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
              // heroTitle={headInfo.title}
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
    </>
  );
};

export default Hero;
