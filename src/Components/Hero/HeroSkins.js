import React, { useState, useEffect, getGlobal } from "reactn";
import "../styles/HeroSkins.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

//Relative Imports
import { AWSoperation, getHeroSkins } from "Helpers";

export const HeroSkins = () => {
  const [heroSkins, setHeroSkins] = useState(["Base"]);
  const heroName = getGlobal().heroName;
  const assetsUrl = `/assets/heroes/${heroName.toLowerCase()}/`;

  useEffect(() => {
    AWSoperation(getHeroSkins, { name: heroName }).then((res) => {
      setHeroSkins(["Base"].concat(res.data.getHero.skins));
    });
  }, [heroName]);
  
  return (
    <Tabs>
      <TabList style={{ border: "none", flexWrap: "wrap" }}>
        {heroSkins.map((skin) => (
          <Tab key={`Tab-${skin}`}>{skin}</Tab>
        ))}
      </TabList>
      {heroSkins.map((skin) => (
        <TabPanel key={`TabPanel-${skin}`}>
          <img
            src={`${assetsUrl}${skin}.png`}
            alt={name}
            style={{ border: "none" }}
            className="skin"
          />
        </TabPanel>
      ))}
    </Tabs>
  );
};
