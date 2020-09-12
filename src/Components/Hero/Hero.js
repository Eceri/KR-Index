import React, { useEffect, useState, useGlobal } from "reactn";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

// Relative Imports
import { HeroGeneral, HeroStory, HeroSkins, HeroHeader } from "Components";
import { createHelmet } from "Helpers";
import "../styles/hero.css";
import "../styles/tabStyles.css";

export const Hero = (props) => {
  const [error, setError] = useGlobal("error");
  const [heroName, setGlobalHeroName] = useGlobal("heroName");
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    let correctName = props.match.params.hero
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setGlobalHeroName(correctName);
    return () => setGlobalHeroName("");
  }, [props.match.params.hero]);

  //Change method for React-Tabs
  const tabSelected = (index, lastIndex) => {
    if (index == lastIndex) return false;

    setTabIndex(index);
    let url;
    if (index === 1) {
      url = `#story`;
    } else if (index === 2) {
      url = `#skins`;
    } else url = `/heroes/${heroName}`;
    props.history.push(url);
  };

  //handling #-Fragments for Tabs
  useEffect(() => {
    let hashFragment = window.location.hash;
    let anchorIndex = 1;
    switch (hashFragment) {
      case "#story":
        setTabIndex(1);
        break;
      case "#skins":
        setTabIndex(2);
        break;
      default:
        anchorIndex = 0;
        setTabIndex(0);
        break;
    }
  }, [window.location.hash]);

  //create helmet for title
  const helmet = createHelmet(
    heroName,
    `Details - ${heroName}`,
    `/heroes/${heroName.toLowerCase()}/portrait.png`
  );
  return (
    <>
      <HeroHeader />
      {helmet}
      <Tabs selectedIndex={tabIndex} onSelect={tabSelected}>
        <TabList>
          <Tab>General</Tab>
          <Tab>Story</Tab>
          <Tab>Skins</Tab>
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
    </>
  );
};

export default Hero;
