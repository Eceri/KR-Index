import React, { getGlobal } from "reactn";
import { UniqueTreasure } from "Components";
import "./../styles/heroSkills.css";

export const HeroSkill = (props) => {
  let { skill } = props;
  const heroName = getGlobal().heroName;
  let assetsUrl = `/assets/heroes/${heroName.toLowerCase()}/`;
  const manaCost = (n) => {
    let orbs = [];
    for (let i = 0; i < n; ++i) {
      orbs.push(
        <img
          alt="Mana Orb"
          src={"/assets/manaOrb.png"}
          className={"mana"}
          key={`orb${i}`}
        />
      );
    }
    return orbs;
  };

  return skill == undefined ? (
    <p />
  ) : (
    <div className="skill" id={`s${skill.id}-anchor`}>
      {skill.skillInfo.map((skillInfo, index) => (
        <div
          key={skillInfo.skillNumber}
          className={skillInfo.linked && index > 0 && "linkedSkill"}
        >
          <div className="flexBox">
            <img
              src={`${assetsUrl}${skillInfo.skillNumber}.png`}
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
            <img
              src={`/assets/book${skill.id}.png`}
              alt={"book icon"}
              className="bookImageMargin"
            />
            {book}
          </p>
        ))}
      </div>
      <div className="skillPerks">
        <div className="flexBox">
          <img
            src={`${assetsUrl}s${skill.id}l.png`}
            alt="light"
            className={"perkIcon"}
          />
          <p> {skill.light}</p>
        </div>
        <div className="flexBox">
          <img
            src={`${assetsUrl}s${skill.id}d.png`}
            alt="dark"
            className={"perkIcon"}
          />
          <p>{skill.dark}</p>
        </div>
      </div>
      <UniqueTreasure skill={skill} />
      {skill.id < 4 && <hr className="seperator" />}
    </div>
  );
};
export default HeroSkill;
