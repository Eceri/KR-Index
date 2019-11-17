import React, { useState } from "react";
import { Image } from "../components";
import "../styles/UniqueWeapon.css";
import { stars } from "../atoms/Stars/stars";

export const UniqueWeapon = props => {
  const [star, setStars] = useState(0);
  let { heroPath, uw, sw } = props
  return (
    <div>
      <p className={"title2"}> Unique Weapon </p> <hr />
      <div id="uw">
        <div className="flexBox" id="uwHeader">
          <Image
            src={`${heroPath}uw.png`}
            alt="UW Icon"
            className={"uwIcon"} />
          <div>
            <p className="title2"> {uw.name} </p>
            {stars(setStars, star)}
          </div>
        </div>
        <p className="weaponDescription"> {uw.effect[star]} </p>
      </div>
      <div id={"sw"}>
        <p className={"title2"}> Soul </p>
        {sw ? (
          <div className="flexBox">
            <Image
              src={`${heroPath}sw.png`}
              alt="soul weapon"
              className={"swIcon"}
            />
            <table>
              <tbody>
                <tr>
                  <td>Activation:</td>
                  <td>{sw.activation}</td>
                </tr>
                <tr>
                  <td>Cooldown:</td>
                  <td>{sw.cd}</td>
                </tr>
                <tr>
                  <td>Charges:</td>
                  <td>{sw.charges}</td>
                </tr>
              </tbody>
            </table>
            <div className="weaponDescription">
              <p> {sw.advancement0} </p>
              <div className="swAdvancement">
                <h3> Advancement 1 </h3>
                {sw.advancement1}
              </div>
              <div className="swAdvancement">
                <h3> Advancement 2 </h3>
                {sw.advancement2}
              </div>
            </div>
          </div>
        ) : <div> N / A </div>
        }
      </div>
    </div>
  );
};
