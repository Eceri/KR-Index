import React from 'react'
import {Image} from "../components";
import "./../styles/uw.css"
export const UniqueWeapon = (props) => {
    return  <section>
        <p className={"title2"}>Unique Weapon</p>
        <hr/>
        <div id={"uw"}>
                <Image src={`${props.heroPath}uw.png`}
                       alt={"UW Icon"}
                       className={"defaultBorder uwIcon"}/>
            <div>
                <p className={"title2"}>{props.uw.name}</p>
                <p>{props.uw.effect}</p>
            </div>
        </div>
        <div id={"sw"}> 
            
        </div>
    </section>
};
