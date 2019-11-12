import React from 'react'
import { Image } from "../components";
import "./../styles/weapon.css"
export const UniqueWeapon = (props) => {
    return <section >
        <p className={"title2"} > Unique Weapon </p> <hr />
        <div id={"uw"} >
            <Image src={`${props.heroPath}uw.png`}
                alt={"UW Icon"}
                className={"defaultBorder uwIcon"}/>
                <div>
                    <p className={"title2"}> {props.uw.name} 
            </p>
                    <p> {props.uw.effect} </p>
                </div> 
            </div>

        {props.sw ?
            <div id={"sw"} >
                    <p className={"title2"} > Soul Weapon </p>
                <div>
                    <Image src={`${props.heroPath}sw.png`}
                        alt="soul weapon"
                        className={"defaultBorder swIcon"}/> 
                    <p className="swActivaton">Activation: {props.sw.activation}</p>
                    <p className="swCD">Cooldown: {props.sw.cd} secs</p>
                    <p className="swCharges">Charges: {props.sw.charges}</p>
                </div>
                <div id="swDescription">
                    <p> {props.sw.advancement0} </p>
                    <p class="swAdvancement">
                        <h3 > Advancement 1 </h3>
                        {props.sw.advancement1}
                    </p> 
                    <p class="swAdvancement" >
                        <h3 > Advancement 2 </h3>
                        {props.sw.advancement2}
                    </p>
                </div> 
            </div>: < div > N / A </div>
        } </section>
}