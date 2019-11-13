import React from "react";
import classes from "../../Assets/classes/classes";
import {GenericPerks} from "../components"

export const ClassPerks = (props) => {
    let perks = classes.find(heroClass => heroClass.name === props.heroClass).classTranscendencePerks;
    return <GenericPerks perks={perks} />
}
