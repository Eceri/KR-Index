import React from 'react'
import {Image }from "../components";
import "./../styles/UniqueTreasure.css";

export const UniqueTreasure = (props) => {
    let utPath = `${props.heroPath}ut${props.skill.id}.png`;
    return <div className="ut">
        <h3>UT {props.skill.id} - {props.skill.ut.name}</h3>
        <div>
            <Image
                src={utPath}
                alt={`Unique Treasure ${props.skill.id} Icon`}
                className={"defaultBorder"}/>
            <p>
            {props.skill.ut.effect}</p>
        </div>
    </div>
};
