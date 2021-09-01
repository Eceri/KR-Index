import React from "react";
import ReactTooltip from "react-tooltip";

import { RuneContainer } from "Styles";

export const Rune = ({ displayName, stats, imagePath }) => (
  <RuneContainer key={imagePath}>
    <div style={{ display: "flex" }}>
      <img src={`/assets/runes/${imagePath}`} data-tip data-for={displayName} />
      {/* <p>{displayName}</p> */}
    </div>
    <div>
      {Object.keys(stats).map((stat) => (
        <p key={stat + stats[stat]}>{`${stat}: ${stats[stat]}`}</p>
      ))}
    </div>
    <ReactTooltip id={displayName}>{displayName}</ReactTooltip>
  </RuneContainer>
);
