import React, { useState } from "react";
import { Image } from "../components";
import "../styles/UniqueWeapon.css";
import { stars } from "../atoms/Stars/stars";

export const UniqueWeapon = props => {
  const [star, setStars] = useState(0);
  let { heroPath, weapon } = props
  let uw = weapon.uniqueWeapon
  let sw = weapon.soulWeapon
  return (
    <div>
      <div className="flexBox" id="uw">
        <Image
          src={`${heroPath}uw.png`}
          alt="UW Icon"
          className={"uwIcon"} />
        <div>
          <h2> {uw.name} </h2>
          {stars(setStars, star)}
        </div>
      </div>
      <p className="description"> {uw.effect[star]} </p>
      <div id={"sw"}>
        <h2> Soul </h2>
        {sw ? (
          <>
            <div className="flexBox">
              <Image
                src={`${heroPath}sw.png`}
                alt="soul weapon"
                className="swIcon"
              />
              <div id="soulBasic">
                <p>{sw.activation}</p>
                <p>{sw.cd} secs cooldown</p>
                <p>{sw.charges} charges</p>
              </div>
            </div>
            <p className="description"> {sw.advancement0} </p>
            <div className="swAdvancement">
              <h3> Advancement 1 </h3>
              {sw.advancement1}
            </div>
            <div className="swAdvancement">
              <h3> Advancement 2 </h3>
              {sw.advancement2}
            </div>
          </>)
          : <> Not released yet </>
        }
      </div>
    </div>
  );
};
