import React, { useState } from "react";
import { Image } from "../components";
import "../styles/UniqueWeapon.css";
import { stars } from "../atoms/Stars/stars";

export const UniqueWeapon = props => {
  const [star, setStars] = useState(0);
  let { heroPath, uniqueWeapon, soulWeapon } = props
  
  return (
    <div>
      <div className="flexBox" id="uw-anchor">
        <Image
          src={`${heroPath}uw.png`}
          alt="UW Icon"
          className={"uwIcon"} />
        <div>
          <h2> {uniqueWeapon.name} </h2>
          {stars(setStars, star)}
        </div>
      </div>
      <p className="description"> {uniqueWeapon.effect[star]} </p>
      <div id={"sw-anchor"}>
        <h2> Soul </h2>
        {soulWeapon ? (
          <>
            <div className="flexBox">
              <Image
                src={`${heroPath}sw.png`}
                alt="soul weapon"
                className="swIcon"
              />
              <div id="soulBasic">
                <p>{soulWeapon.activation}</p>
                <p>{soulWeapon.cd} secs cooldown</p>
                <p>{soulWeapon.charges} charges</p>
              </div>
            </div>
            <p className="description"> {soulWeapon.advancement0} </p>
            <div className="swAdvancement">
              <h3> Advancement 1 </h3>
              {soulWeapon.advancement1}
            </div>
            <div className="swAdvancement">
              <h3> Advancement 2 </h3>
              {soulWeapon.advancement2}
            </div>
          </>)
          : <> Not released yet </>
        }
      </div>
    </div>
  );
};
