import React, { useState } from "react";
import { Image } from "../components";
import { stars } from "../atoms/Stars/stars";
import "../styles/UniqueTreasure.css";

export const UniqueTreasure = props => {
  const [star, setStars] = useState(0);
  const { heroPath, skill } = props;
  let utPath = `${heroPath}ut${skill.id}.png`;

  if(skill == undefined){
    skill = {
      effect: ["","","","","",""],
      name: ""
    }
  }

  return (
    <div className="ut">
      <div className="flexBox">
        <Image src={utPath} alt={`Unique Treasure ${skill.id}`} />
        <div>
          <h3>{skill.uniqueTreasure.name}</h3>
          {stars(setStars, star)}
        </div>
      </div>
      <p>{skill.uniqueTreasure.effect[star]}</p>
    </div>
  );
};
