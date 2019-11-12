import React from "react";
import {Image} from "./../Image";
import genericPerks from "./../../Assets/genericPerks/genericPerks"

export const GenericPerks = () => {
    return <div className={"nonSkillPerks"}>
        {genericPerks.map(perk =>
            <div>
                <p className={"perksHeading"}>
                    <Image src={`genericPerks/${perk.name}.png`}
                           className={"classPerkIcon defaultBorder floatLeft"}/>
                    {perk.name}
                </p>
                <p>{perk.effect}</p>
            </div>
        )}
    </div>
};
