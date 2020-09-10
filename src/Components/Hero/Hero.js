import React, { useEffect, useState, useGlobal, Suspense } from "reactn";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Spinner } from "Styles";

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
  const [tabIndex, setTabIndex] = useState(0);
  const [scrollAnchor, setScrollAnchor] = useState();

  useEffect(() => {
    let correctName = props.match.params.hero
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setGlobalHeroName(correctName);
    return () => {
      setGlobalHeroName("");
    };
  }, [props.match.params.hero]);

  //Change method for React-Tabs
  const tabSelected = (index, lastIndex) => {
    console.log("tab Selected Called");
    if (index !== lastIndex) {
      setTabIndex(index);
      let url;
      if (index === 1) {
        url = `#story`;
      } else if (index === 2) {
        url = `#skins`;
      } else url = `/heroes/${heroName}`;
      props.history.push(url);
      return true;
    }
    return false;
  };
  // scroll-To, needs to be manually done, due to timing with the page

  //handling #-Fragments for Tabs
  useEffect(() => {
    let hashFragments = window.location.hash.split("-");
    setScrollAnchor(hashFragments[1]);
    switch (hashFragments[0]) {
      case "#story":
        setTabIndex(1);
        break;
      case "#skins":
        setTabIndex(2);
        break;
      default:
        setTabIndex(0);
        setScrollAnchor(hashFragments[0]);
        break;
    }
    console.log(
      "hash changed",
      window.location.hash,
      "scroll anchor",
      scrollAnchor
    );
  }, [window.location.hash]);

  //scroll to a component.
  useEffect(() => {
    console.log("scrollAnchor changed", scrollAnchor);
    if (scrollAnchor !== undefined && scrollAnchor !== null) {
      let element = document.getElementById(`${scrollAnchor.slice(1)}-anchor`);
      let scrollToTopPosition = 0;
      if (element !== null) {
        scrollToTopPosition = element.offsetTop - 60;
      }
      window.scrollTo({
        top: scrollToTopPosition,
        left: 0,
        behavior: "smooth",
      });
      console.log("scrolled");
    }
  }, [scrollAnchor]);

  return (
    <>
      <HeroHeader />
      {createHelmet(
        heroName,
        `Details - ${heroName}`,
        `/heroes/${heroName.toLowerCase()}/portrait.png`
      )}
      <Tabs selectedIndex={tabIndex} onSelect={tabSelected}>
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
