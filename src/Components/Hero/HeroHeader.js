import React, { useGlobal, useEffect, useState, getGlobal } from "reactn";
import ReactTooltip from "react-tooltip";

import { AWSoperation, getHeroHeadInfo } from "Aws";
import { CustomError } from "Helpers";

export const HeroHeader = () => {
  //states
  const [isLoading, setIsLoading] = useState(true);
  //globals
  const [error, setError] = useGlobal("error");
  const [
    { title, name, damageType, position, class: heroClass },
    setGlobalHeadInfo,
  ] = useGlobal("headInfo");
  const { heroName, headInfos } = getGlobal();

  useEffect(() => {
    if (headInfos.length > 1) {
      setGlobalHeadInfo(headInfos.find((v) => v.name === heroName));
      setIsLoading(false);
    } else if (heroName !== "") {
      AWSoperation(getHeroHeadInfo, { name: heroName })
        .then((hero) => {
          setGlobalHeadInfo(hero);
          setIsLoading(false);
        })
        .catch((err) => {
          setError({
            message: "Hero not found.",
          });
        });
    }
  }, [heroName, headInfos]);

  return isLoading ? (
    <></>
  ) : (
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
            data-tip={heroClass}
          />
          <img
            src={`/assets/${damageType}.png`}
            id={"damageType"}
            alt={"dmg type"}
            style={{ border: "none" }}
            data-tip={damageType}
          />
          <p>{position}</p>
        </div>
      </div>
      <ReactTooltip />
    </div>
  );
};
