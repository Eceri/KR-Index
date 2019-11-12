import React from 'react'
import { Image } from "../components";
import "./../styles/uw.css"
export const UniqueWeapon = (props) => {
    return <section >
        <p className={"title2"} > Unique Weapon </p> <hr />
        <div id={"uw"} >
            <Image src={`${props.heroPath}uw.png`}
                alt={"UW Icon"}
                className={"defaultBorder uwIcon"}
            /> <div>
                <p className={"title2"} > {props.uw.name} </p> <p> {props.uw.effect} </p> </div> </div>


        <p className={"title2"} > Soul Weapon </p>
        {props.sw ?
            <div id={"sw"} >
                <Image src={`${props.heroPath}sw.png`}
                    alt="soul weapon"
                    className={"defaultBorder wIcon"}/> 
                    <p> {props.sw.a0} </p> <p class="swAdvancement" >
                    <h3 > Advancement 1 </h3> {props.sw.a1}
                </p> <p class="swAdvancement" >
                    <h3 > Advancement 2 </h3> {props.sw.a2}
                </p> </div> : < div > N / A </div>
        } </section>
}