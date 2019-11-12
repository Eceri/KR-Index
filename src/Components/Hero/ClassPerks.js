import React from "react";
import "../styles/nonSkillPerks.css"
import {Image} from "./../components";
import classes from "../../Assets/classes/classes";

export const ClassPerks = (props) => {
    let perks = classes.find(heroClass => heroClass.name === props.heroClass).classTranscendencePerks;
    return <div className={"nonSkillPerks"}>
            {perks.map(perk =><div>
                <p className={"perksHeading"}><Image src={`classPerks/${perk.name}.png`} className={"classPerkIcon defaultBorder floatLeft"}/>{perk.name}</p>
                <p>{perk.effect}</p>
            </div>)}
        </div>
}
