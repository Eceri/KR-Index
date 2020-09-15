import React, { useState, getGlobal } from "reactn";
import { Stars } from "Atoms";
import "../styles/UniqueTreasure.css";

export const UniqueTreasure = props => {
  const [star, setStars] = useState(0);
  const { skill } = props;
  const heroName = getGlobal().heroName;
  if(skill == undefined){
    skill = {
      effect: ["","","","","",""],
      name: ""
    }
  }

  return (
    <div className="ut">
      <div className="flexBox">
        <img src={`/assets/heroes/${heroName.toLowerCase()}/ut${skill.id}.png`} alt={`Unique Treasure ${skill.id}`} />
        <div>
          <h3>{skill.uniqueTreasure.name}</h3>
          {Stars(setStars, star)}
        </div>
      </div>
      <p>{skill.uniqueTreasure.effect[star]}</p>
    </div>
  );
};
