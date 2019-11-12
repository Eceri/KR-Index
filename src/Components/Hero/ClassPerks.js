import React from "react";
import {ClickReveal} from "../ClickReveal";
import "../styles/nonSkillPerks.css"
export const NonSkillPerks = (props) => {
    let perks = props.perks;
    return <div className={"nonSkillPerks"}>
            {perks.map(perk =><div>
                {console.log(perk)}
                <p className={"perksHeading"}>{perk.name}</p> <p>{perk.effect}</p>
            </div>)}
        </div>
}
