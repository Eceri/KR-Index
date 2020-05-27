import React, { useState, useEffect } from "react";
import { Image } from "./../components";
import "./../styles/HeroSkins.css";

//Relative Imports
import { AWSoperation, getHeroSkins } from "Helpers";

export const HeroSkins = (props) => {
  const [heroSkins, setHeroSkins] = useState({});
  let { heroPath, heroName } = props;

  useEffect(() => {
    AWSoperation(getHeroSkins, { name: heroName }).then((res) =>
      setHeroSkins(res.data.getHero.skins)
    );
  }, []);

  const createSkinDiv = (name) => (
    <div className="skin" key={name}>
      {console.log("HeroSkin: ", name)}
      {console.log("Path: ", `${heroPath}${name}.png`)}

      <h2>{name}</h2>
      <Image
        src={`${heroPath}${name}.png`}
        alt={name}
        style={{ border: "none" }}
        className="skin"
      />
    </div>
  );

  console.log(heroSkins);
  return (
    <>
      {createSkinDiv("Base")}
      {Object.keys(heroSkins).length > 1 ? (
        <>{heroSkins.map((skin) => createSkinDiv(skin))}</>
      ) : (
        <></>
      )}
    </>
  );
};
