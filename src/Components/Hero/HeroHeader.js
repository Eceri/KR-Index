import React, { useGlobal, getGlobal, useState, useEffect } from "reactn";
import ReactTooltip from "react-tooltip";

import { createHelmet } from "Helpers";

import { AWSoperation, getHeroHeadInfo } from "Helpers";

export const HeroHeader = (props) => {
  const [error, setError] = useGlobal("error");

  const { heroPath } = props;
  let heroName;
  if (getGlobal().heroName == undefined) heroName = props.heroName;
  else heroName = getGlobal().heroName;
  
  const [headInfo, setHeadInfo] = useState({
    name: "",
    title: "",
    class: "",
    damageType: "",
    position: "",
  });
  useEffect(() => {
    try {
      AWSoperation(getHeroHeadInfo, { name: heroName }).then((res) =>
        setHeadInfo(res.data.getHero)
      );
    } catch (error) {
      setError(error);
    }
  }, [heroName]);

  return (
    <div className="flexBox">
    {createHelmet(heroName, `${heroName} - ${headInfo.title}`)}
      <img src={`${heroPath}portrait.png`} id={"portrait"} />
      <div>
        <h1>{headInfo.name}</h1>
        <h2>{headInfo.title}</h2>
        <div id="heroType" className="flexBox">
          <img
            src={`classes/${headInfo.class.toLowerCase()}.png`}
            id={"heroClassIcon"}
            style={{ border: "none" }}
            dataTip={headInfo.class}
          />
          <img
            src={`${headInfo.damageType}.png`}
            id={"damageType"}
            alt={"dmg type"}
            style={{ border: "none" }}
            dataTip={headInfo.damageType}
          />
          <p>{headInfo.position}</p>
        </div>
      </div>
      <ReactTooltip border={true} />
    </div>
  );
};
