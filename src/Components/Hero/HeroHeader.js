import React, { useGlobal, useEffect } from "reactn";

import { createHelmet } from "Helpers";

import { AWSoperation, getHeroHeadInfo } from "Helpers";

export const HeroHeader = () => {
  const [error, setError] = useGlobal("error");
  const [headInfo, setGlobalHeadInfo] = useGlobal("headInfo");
  const [heroName, setGlobalHeroName] = useGlobal("heroName");

  useEffect(() => {
    try {
      AWSoperation(getHeroHeadInfo, { name: heroName }).then((res) =>
        setGlobalHeadInfo(res.data.getHero)
      );
    } catch (err) {
      setError(err);
    }
  }, [heroName]);

  return (
    <div className="flexBox">
      {createHelmet(heroName, `${heroName} - ${headInfo.title}`)}
      <img src={`/assets/heroes/${heroName.toLowerCase()}/portrait.png`} id={"portrait"} />
      <div>
        <h1>{headInfo.name}</h1>
        <h2>{headInfo.title}</h2>
        <div id="heroType" className="flexBox">
          <img
            src={`/assets/classes/${headInfo.class.toLowerCase()}.png`}
            id={"heroClassIcon"}
            style={{ border: "none" }}
            dataTip={headInfo.class}
          />
          <img
            src={`/assets/${headInfo.damageType}.png`}
            id={"damageType"}
            alt={"dmg type"}
            style={{ border: "none" }}
            dataTip={headInfo.damageType}
          />
          <p>{headInfo.position}</p>
        </div>
      </div>
    </div>
  );
};
