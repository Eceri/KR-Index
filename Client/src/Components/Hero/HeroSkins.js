import React from "react";
import { Image } from "./../components"
import "./../styles/HeroSkins.css"

export const HeroSkins = props => {
  let { heroPath, skins } = props
  let heroSkins = [];
  heroSkins.push({
    file: `${heroPath}Base.png`,
    title: "Base"
  });
  skins.map(skin =>
    heroSkins.push({
      file: `${heroPath}${skin}.png`,
      title: skin
    })
  );
  return <>
    {heroSkins.map(skin => (
      <div className="skin" key={skin.title}>
        <h2>{skin.title}</h2>
        <Image src={skin.file}
          alt={skin.title}
          style={{ border: "none" }}
          className="skin" />
      </div>
    ))}
  </>
}
