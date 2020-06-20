import React, { useEffect, useState } from "react";
import { Image, ClassPerks, TierOnePerks, UniqueWeapon } from "../components";
import HeroSkill from "./HeroSkill";
//
import { AWSoperation, getHeroGeneralInfo } from "Helpers";

export const HeroGeneral = (props) => {
  const [heroInfo, setHeroInfo] = useState({});
  let { heroPath, heroName, scroll } = props;

  useEffect(() => {
    AWSoperation(getHeroGeneralInfo, {
      name: heroName,
    })
      .then((res) => setHeroInfo(res.data.getHero))
  }, [heroName]);


  return (
    <>
      <>
        <h2> Unique Weapon </h2> <hr />
        <UniqueWeapon
          heroPath={heroPath}
          uniqueWeapon={heroInfo.uniqueWeapon}
          soulWeapon={heroInfo.soulWeapon}
        />
        <h2 className="subSectionHeadline">Skills</h2>
        <hr />
        <div id={"skills"}>
          <HeroSkill skill={heroInfo.skill1} heroPath={heroPath} />
          <HeroSkill skill={heroInfo.skill2} heroPath={heroPath} />
          <HeroSkill skill={heroInfo.skill3} heroPath={heroPath} />
          <HeroSkill skill={heroInfo.skill4} heroPath={heroPath} />
        </div>
        <h2 className="subSectionHeadline">Transcendence</h2>
        <hr />
        <h2 id="t5-anchor">T5</h2>
        <div className="flexBox transcendance">
          <Image
            src={`${heroPath}light.png`}
            alt={"light"}
            className={"perkIcon"}
          />
          <p>{heroInfo.light}</p>
        </div>
        <div className="flexBox transcendance">
          <Image
            src={`${heroPath}dark.png`}
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
    </>
  );
};
