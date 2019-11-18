import React from "react";
import {
  Image,
  ClassPerks,
  TierOnePerks,
  UniqueWeapon,
  ClickReveal
} from "../components";
import Skill from "./Skill";

export const HeroGeneral = props => {
  let { heroPath, heroInfo } = props
  return (
    <div id="generalInfo">
      <UniqueWeapon heroPath={heroPath} uw={heroInfo.uw} sw={heroInfo.sw} />
      <p className={"title2 subSectionHeadline"}>Skills</p>
      <hr />
      <div className={"flexBox"} id={"skills"}>
        {heroInfo.skills.map(skill => (
          <Skill skill={skill} heroPath={heroPath} key={skill.id}/>
        ))}
      </div>
      <p className="title2 subSectionHeadline">Transcendence</p>
      <hr />
      <div>
        <p className={"title2"}>T1 - Generic</p>
        <ClickReveal title="t1">
        <TierOnePerks />
        </ClickReveal>
        <hr className="seperator" />
        <p className={"title2"}>T2 - Class-Specific</p>
        <ClassPerks heroClass={heroInfo.class} />
        <hr className="seperator" />
        <p className={"title2"}>T5</p>
        <div className="tPerks">
          <div>
            {console.log(Image())}
            <Image
              src={`${heroPath}light.png`}
              alt={"light"}
              className={"perkIcon"}
            />
            <p>ATK, DEF, HP+15% / {heroInfo.light}</p>
          </div>
          <div>
            <Image
              src={`${heroPath}dark.png`}
              alt={"dark"}
              className={"perkIcon"}
            />
            {heroInfo.dark}
          </div>
        </div>
      </div>
    </div>
  );
};
