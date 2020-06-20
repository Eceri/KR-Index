import React, { useState, useEffect } from "react";
import { Image } from "./../components";
import "./../styles/HeroSkins.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

//Relative Imports
import { AWSoperation, getHeroSkins } from "Helpers";

export const HeroSkins = (props) => {
  const [heroSkins, setHeroSkins] = useState(["Base"]);
  let { heroPath, heroName } = props;

  useEffect(() => {
    AWSoperation(getHeroSkins, { name: heroName }).then((res) => {
      setHeroSkins(heroSkins.concat(res.data.getHero.skins));
    });
  }, [heroName]);

  const tabSelected = (index, lastIndex) => {
    if (index !== lastIndex) {
      
      return true;
    }
    return false;
  };


  return (
    <>
      <Tabs>
        <TabList style={{ border: "none", flexWrap: "wrap" }}>
          {heroSkins.map((skin) => (
            <Tab key={`Tab-${skin}`}>{skin}</Tab>
          ))}
        </TabList>
        {heroSkins.map((skin) => (
          <TabPanel key={`TabPanel-${skin}`}>
            <Image
              src={`${heroPath}${skin}.png`}
              alt={name}
              style={{ border: "none" }}
              className="skin"
            />
          </TabPanel>
        ))}
      </Tabs>
    </>
  );
};
