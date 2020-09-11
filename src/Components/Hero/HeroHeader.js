import React, { useGlobal, useEffect, useState } from "reactn";
import ReactTooltip from "react-tooltip";

import { AWSoperation, getHeroHeadInfo } from "Aws";
import { Spinner } from "Styles";
import { CustomError } from "Helpers";

export const HeroHeader = () => {
  const [error, setError] = useGlobal("error");
  const [
    { title, name, damageType, position, class: heroClass },
    setGlobalHeadInfo,
  ] = useGlobal("headInfo");
  const [heroName, setGlobalHeroName] = useGlobal("heroName");
  const [isLoading, setIsLoading] = useState(true);
  const [globalHeadInfos, setGlobalHeadInfos] = useGlobal("headInfos");

  useEffect(() => {
    if (globalHeadInfos.length > 1) {
      setGlobalHeadInfo(globalHeadInfos.find((v) => v.name === heroName));
      setIsLoading(false);
    } else if (heroName !== "") {
      AWSoperation(getHeroHeadInfo, { name: heroName })
        .then((hero) => {
          setGlobalHeadInfo(hero);
          setIsLoading(false);
        })
        .catch((err) => setError(CustomError("Bad Hero", true, "/heroes")));
    }
  }, [heroName]);

  return isLoading ? (
    <Spinner></Spinner>
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
