import React from "react";
import GenericPerksData from "../../Assets/genericPerks/genericPerks";
import { GenericPerks } from "../components";

export const TierOnePerks = (props) => {
  return <GenericPerks perks={GenericPerksData} tier={1} />;
};
