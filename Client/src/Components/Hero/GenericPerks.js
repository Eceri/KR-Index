import React from "react";
import { Image } from "../Image";
import "../styles/genericPerks.css"

export const GenericPerks = (props) => {
    let perks = props.perks;
    return <div>
        {perks.map(perk =>
            <div className={"genericPerk"}>
                <div><Image src={`genericPerks/${perk.name}.png`}
                    className={"classPerkIcon defaultBorder"} />
                </div>
                <div>
                    <p className={"genericPerkName"}>{perk.name}</p>
                    <p>{perk.effect}</p>
                </div>
            </div>
        )}
    </div>
};
