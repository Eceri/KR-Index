import React, { useEffect, useState, getGlobal } from "reactn";
import { ClassPerks, TierOnePerks, UniqueWeapon, HeroSkill } from "Components";
//aws
import { AWSoperation, getHeroGeneralInfo } from "Helpers";

export const HeroGeneral = (props) => {
  const [heroInfo, setHeroInfo] = useState({});
  const heroName = getGlobal().heroName;
  const assetsUrl = `/assets/heroes/${heroName.toLowerCase()}/`;
  useEffect(() => {
    AWSoperation(getHeroGeneralInfo, {
      name: heroName,
    }).then((res) => setHeroInfo(res.data.getHero));
  }, [heroName]);
  return (
    <>
      <h2> Unique Weapon </h2> <hr />
      <UniqueWeapon
        uniqueWeapon={heroInfo.uniqueWeapon}
        soulWeapon={heroInfo.soulWeapon}
      />
      <h2 className="subSectionHeadline">Skills</h2>
      <hr />
      <div id={"skills"}>
        <HeroSkill skill={heroInfo.skill1} />
        <HeroSkill skill={heroInfo.skill2} />
        <HeroSkill skill={heroInfo.skill3} />
        <HeroSkill skill={heroInfo.skill4} />
      </div>
      <h2 className="subSectionHeadline">Transcendence</h2>
      <hr />
      <h2 id="t5-anchor">T5</h2>
      <div className="flexBox transcendance">
        <img
          src={`${assetsUrl}light.png`}
          alt={"light"}
          className={"perkIcon"}
        />
        <p>{heroInfo.light}</p>
      </div>
      <div className="flexBox transcendance">
        <img
          src={`${assetsUrl}dark.png`}
          alt={"dark"}
          className={"perkIcon"}
        />
        <p>{heroInfo.dark}</p>
      </div>
      <hr className="seperator" />
      <h2 id="t1-anchor">T1 - Generic</h2>
      <TierOnePerks />
      <hr className="seperator" />
      <h2 id="t2-anchor">T2 - Class-Specific</h2>
      <ClassPerks heroClass={heroInfo.class} />
    </>
  );
};
