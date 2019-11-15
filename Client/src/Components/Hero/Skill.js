import React from "react";
import ReactToolTip from "react-tooltip";
import { Image, UniqueTreasure as UT } from "../components";
import chainLink from "./../../Assets/chain_link.svg";

const Skill = props => {
  const manaCost = function(n) {
    let orbs = [];
    for (let i = 0; i < n; ++i) {
      orbs.push(
        <Image alt="Mana Orb" src={"manaOrb.png"} className={"mana"} />
      );
    }
    return orbs;
  };
  return (
    <section className="skill" key={props.skill.id}>
      <div>
        {props.skill.skillInfo.map((skillInfo, index) => (
          <div className="skillBaseInfo" key={skillInfo.skillNumber}>
            {props.skill.linked && index > 0 && (
              <div>
                <img
                  src={chainLink} //TODO maybe adjust to match others.
                  alt={"chain-link"}
                  className={"chainlink skillImageMargin"}
                  data-tip="This skill is linked to a previous cast."
                  style={{border: "none"}}
                />
              </div>
            )}
            <div>
              <div className={"skillHeadline"}>
                <Image
                  src={`${props.heroPath}${skillInfo.skillNumber}.png`}
                  alt={`Skill ${skillInfo.id} Icon`}
                  className={"skillIcon"}
                />
                <div className={"skillHeader"}>
                  <p className="skillName">{skillInfo.name}</p>
                  {manaCost(skillInfo.cost)}
                  {skillInfo.cooldown > 0 && (
                    <span className={"cooldown"}>
                      {skillInfo.cooldown} Secs
                    </span>
                  )}
                </div>
              </div>
              <p className={"skillDescription"}>{skillInfo.effect}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="books">
        <div>
          {props.skill.books.map(book => (
            <p className={"bookEffects"}>
              <Image
                src={`book${props.skill.id}.png`}
                alt={"book icon"}
                className={"skillImageMargin"}
              />
              {book}
            </p>
          ))}
        </div>
      </div>
      <div className="skillPerks">
        <div>
          <Image
            src={`${props.heroPath}s${props.skill.id}l.png`}
            className={"perkIcon"}
          />
          <p> {props.skill.light}</p>
        </div>
        <div>
          <Image
            src={`${props.heroPath}s${props.skill.id}d.png`}
            className={"perkIcon"}
          />
          <p>{props.skill.dark}</p>
        </div>
      </div>
      <UT heroPath={props.heroPath} skill={props.skill} />
      {props.skill.id < 4 && <hr className="seperator" />}
      <ReactToolTip multiline={true} border={true} className={"tooltip"} />
    </section>
  );
};
export default Skill;
