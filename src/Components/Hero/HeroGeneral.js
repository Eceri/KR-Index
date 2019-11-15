import React from "react";
import {
  Image,
  ClassPerks,
  TierOnePerks,
  GenericPerks,
  UniqueWeapon as UW
} from "../components";
import Skill from "./Skill";

export const HeroGeneral = props => {
  const heroPath = props.heroPath;
  const heroInfo = props.heroInfo;
  return (
    <div id="generalInfo">
      <UW heroPath={heroPath} uw={heroInfo.uw} sw={heroInfo.sw} />
      <p className={"title2 subSectionHeadline"}>Skills</p>
      <hr />
      <div className={"flexBox"} id={"skills"}>
        {heroInfo.skills.map(skill => (
          <Skill skill={skill} heroPath={heroPath} />
        ))}
      </div>
      <p className="title2 subSectionHeadline">Transcendence</p>
      <hr />
      <div>
        <p className={"title2"}>T1 - Generic</p>
        <TierOnePerks />
        <hr className="seperator" />
        <p className={"title2"}>T2 - Class-Specific</p>
        <ClassPerks heroClass={heroInfo.class} />
        <hr className="seperator" />
        <p className={"title2"}>T5</p>
        <div className="tPerks">
          <div>
            <Image
              src={`${heroPath}light.png`}
              alt={"light"}
              className={"defaultBorder perkIcon floatLeft"}
            />
            <p>ATK, DEF, HP+15% / {heroInfo.light}</p>
          </div>
          <div>
            <Image
              src={`${heroPath}dark.png`}
              alt={"dark"}
              className={"defaultBorder perkIcon floatLeft"}
            />
            {heroInfo.dark}
          </div>
        </div>
      </div>
    </div>
  );
};
