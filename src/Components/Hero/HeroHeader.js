import React, { useGlobal, useEffect } from "reactn";
import ReactTooltip from "react-tooltip";

import { createHelmet } from "Helpers";
import { AWSoperation, getHeroHeadInfo } from "Aws";

export const HeroHeader = () => {
  const [error, setError] = useGlobal("error");
  const [
    { title, name, damageType, position, class: heroClass },
    setGlobalHeadInfo,
  ] = useGlobal("headInfo");
  const [heroName, setGlobalHeroName] = useGlobal("heroName");

  useEffect(() => {
    if (heroName != "") {
      try {
        AWSoperation(getHeroHeadInfo, { name: heroName }).then((hero) =>
          setGlobalHeadInfo(hero)
        );
      } catch (err) {
        setError(err);
      }
    }
  }, [heroName]);

  return (
    <div className="flexBox">
      <img
        src={`/assets/heroes/${heroName.toLowerCase()}/portrait.png`}
        id={"portrait"}
      />
      <div>
        <h1>{name}</h1>
        <h2>{title}</h2>
        <div id="heroType" className="flexBox">
          <img
            src={`/assets/classes/${heroClass.toLowerCase()}.png`}
            id={"heroClassIcon"}
            style={{ border: "none" }}
            datatip={heroClass}
          />
          <img
            src={`/assets/${damageType}.png`}
            id={"damageType"}
            alt={"dmg type"}
            style={{ border: "none" }}
            datatip={damageType}
          />
          <p>{position}</p>
        </div>
      </div>
      <ReactTooltip />
    </div>
  );
};
