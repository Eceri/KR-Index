import React from "react";
import {
  Image,
  ClassPerks,
  TierOnePerks,
  UniqueWeapon
} from "../components";
import HeroSkill from "./HeroSkill";

export const HeroGeneral = props => {
  let { heroPath, heroInfo } = props
  return <>
    <h2> Unique Weapon </h2> <hr />
    <UniqueWeapon heroPath={heroPath} weapon={heroInfo.weapon} />
    <h2 className="subSectionHeadline">Skills</h2>
    <hr />
    <div id={"skills"}>
      <HeroSkill skill={heroInfo.skills[0]} heroPath={heroPath} />
      <HeroSkill skill={heroInfo.skills[1]} heroPath={heroPath} />
      <HeroSkill skill={heroInfo.skills[2]} heroPath={heroPath} />
      <HeroSkill skill={heroInfo.skills[3]} heroPath={heroPath} />
    </div>
    <h2 className="subSectionHeadline" >Transcendence</h2>
    <hr />
    <h2 id="t5-anchor" >T5</h2>
    <div className="flexBox transcendance" >
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
    <h2  id="t2-anchor">T2 - Class-Specific</h2>
    <ClassPerks heroClass={heroInfo.class} />
    </>
};
