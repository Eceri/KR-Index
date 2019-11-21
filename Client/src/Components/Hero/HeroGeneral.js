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
    <UniqueWeapon heroPath={heroPath} uw={heroInfo.uw} sw={heroInfo.sw} />
    <h2 className="subSectionHeadline">Skills</h2>
    <hr />
    <div id={"skills"}>
      {heroInfo.skills.map(skill => (
        <HeroSkill skill={skill} heroPath={heroPath} key={skill.id} />
      ))}
    </div>
    <h2 className="subSectionHeadline">Transcendence</h2>
    <hr />
    <h2>T5</h2>
    <div className="flexBox transcendance">
      <Image
        src={`${heroPath}light.png`}
        alt={"light"}
        className={"perkIcon"}
      />
      <p>ATK, DEF, HP+15% / {heroInfo.light} </p>
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
    <h2>T1 - Generic</h2>
    <TierOnePerks />
    <hr className="seperator" />
    <h2>T2 - Class-Specific</h2>
    <ClassPerks heroClass={heroInfo.class} />
    </>
};
