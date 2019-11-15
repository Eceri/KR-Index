import React, { useState } from "react";
import { Image } from "../components";
import { stars } from "../atoms/Stars/stars";
import "../styles/UniqueTreasure.css";

export const UniqueTreasure = props => {
  const [star, setStars] = useState(0);

  const { heroPath, skill } = props;
  let utPath = `${heroPath}ut${skill.id}.png`;
  return (
    <div className="ut">
      <div>
        <Image
          src={utPath}
          alt={`Unique Treasure ${skill.id} Icon`}
          className={"defaultBorder"}
        />
        <div>
          <h3>
            UT {skill.id} - {skill.ut.name}
          </h3>
          <p>{stars(setStars)}</p>
        </div>
        <p>{skill.ut.effect[star]}</p>
      </div>
    </div>
  );
};
