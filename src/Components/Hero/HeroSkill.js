import React from "react";
import { Image, UniqueTreasure } from "Components";
import "./../styles/heroSkills.css";

export const HeroSkill = (props) => {
  let { heroPath, skill } = props;
  const manaCost = (n) => {
    let orbs = [];
    for (let i = 0; i < n; ++i) {
      orbs.push(
        <Image
          alt="Mana Orb"
          src={"manaOrb.png"}
          className={"mana"}
          key={`orb${i}`}
        />
      );
    }
    return orbs;
  };
  if (skill == undefined) {
    skill = {
      id: 0,
      skillInfo: [
        {
          skillNumber: "",
          id: 0,
          cost: 0,
          cooldown: 0,
          description: "",
        },
      ],
      books: [""],
      light: "",
      dark: "",
      uniqueTreasure: {
        name: "",
        effect: "",
      },
    };
  }

  return (
    <div className="skill" id={`s${skill.id}-anchor`}>
      {skill.skillInfo.map((skillInfo, index) => (
        <div
          key={skillInfo.skillNumber}
          className={skillInfo.linked && index > 0 && "linkedSkill"}
        >
          <div className="flexBox">
            <Image
              src={`${heroPath}${skillInfo.skillNumber}.png`}
              alt={`Skill ${skillInfo.id} Icon`}
              className={"skillIcon"}
            />
            <div>
              <h2>{skillInfo.name}</h2>
              {manaCost(skillInfo.cost)}
              {skillInfo.cooldown > 0 && (
                <span className={"cooldown"}>{skillInfo.cooldown} Secs</span>
              )}
            </div>
          </div>
          <p className={"description"}>{skillInfo.description}</p>
        </div>
      ))}
      <div className="books">
        {skill.books.map((book) => (
          <p className={"bookEffects"} key={book}>
            <Image
              src={`book${skill.id}.png`}
              alt={"book icon"}
              className="bookImageMargin"
            />
            {book}
          </p>
        ))}
      </div>
      <div className="skillPerks">
        <div className="flexBox">
          <Image
            src={`${heroPath}s${skill.id}l.png`}
            alt="light"
            className={"perkIcon"}
          />
          <p> {skill.light}</p>
        </div>
        <div className="flexBox">
          <Image
            src={`${heroPath}s${skill.id}d.png`}
            alt="dark"
            className={"perkIcon"}
          />
          <p>{skill.dark}</p>
        </div>
      </div>
      <UniqueTreasure heroPath={heroPath} skill={skill} />
      {skill.id < 4 && <hr className="seperator" />}
    </div>
  );
};
export default HeroSkill;
