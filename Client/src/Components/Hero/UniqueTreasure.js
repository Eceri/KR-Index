import React from "react";
import { Image } from "../components";
import "../styles/UniqueTreasure.css";

export const UniqueTreasure = props => {
  let utPath = `${props.heroPath}ut${props.skill.id}.png`;
  return (
    <div className="ut">
      <div>
        <Image
          src={utPath}
          alt={`Unique Treasure ${props.skill.id} Icon`}
        />
        <div>
          <h3>Unique Treasure {props.skill.id} - {props.skill.ut.name}</h3>
          <div>
            
          </div>
        </div>
      </div>
      <p>{props.skill.ut.effect}</p>
    </div>
  );
};
