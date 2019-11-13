import React from 'react'
import { Image } from "../components";
import "./../styles/UniqueWeapon.css"
export const UniqueWeapon = (props) => {
    return <section >
        <p className={"title2"} > Unique Weapon </p> <hr />
        <div id="uw">
            <div className="flexBox" id="uwHeader">
                <Image src={`${props.heroPath}uw.png`}
                    alt="UW Icon"
                    className={"defaultBorder uwIcon"} />
                <p className="title2"> {props.uw.name} </p>
            </div>
            <p className="weaponDescription"> {props.uw.effect} </p>
        </div>

        <div id={"sw"} >
            <p className={"title2"} > Soul </p>
            {props.sw ?

                <div className="flexBox">
                    <Image src={`${props.heroPath}sw.png`}
                        alt="soul weapon"
                        className={"defaultBorder swIcon"} />
                    <table>
                        <tr>
                            <td>Activation:</td>
                            <td>{props.sw.activation}</td>
                        </tr>
                        <tr>
                            <td>Cooldown:</td>
                            <td>{props.sw.cd}</td>
                        </tr>
                        <tr>
                            <td>Charges:</td>
                            <td>{props.sw.charges}</td>
                        </tr>
                    </table>
                    <div className="weaponDescription">
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
                </div>
                : < div > N / A </div>
            }
        </div>
    </section>
}