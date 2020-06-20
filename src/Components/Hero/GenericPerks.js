import React from "react";
import { Image } from "../components";
import "../styles/genericPerks.css";

export const GenericPerks = props => {
  let perks = props.perks;
  if(perks == undefined) {
    perks = [
      {name: "", effect: ""},
      {name: "", effect: ""},
      {name: "", effect: ""},
      {name: "", effect: ""},
      {name: "", effect: ""},
      {name: "", effect: ""}
    ]
  }
  return <div>
    {perks.map(perk => (
      <div className={"genericPerk"} key={perk.name}>
        <Image
          src={`genericPerks/${perk.name}.png`}
          className={"genericPerkIcon"}
        />
        <div>
          <h3 className={"genericPerkName"}>{perk.name}</h3>
          <p>{perk.effect}</p>
        </div>
      </div>
    ))}
  </div>
};
export default GenericPerks