import React from "react";
import classes from "../../Assets/classes/classes";
import { GenericPerks } from "../components";

export const ClassPerks = (props) => {
  let currentClass = props.heroClass;
  if (currentClass == undefined) currentClass = "knight";
  let perks = classes.find(
    (heroClass) => heroClass.name.toLowerCase() === currentClass.toLowerCase()
  ).classTranscendencePerks;
  return <GenericPerks perks={perks} tier={2} />;
};
