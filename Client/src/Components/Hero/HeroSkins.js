import React, { Component } from "react";
import { Image } from "./../components"
import "./../styles/HeroSkins.css"

export class HeroSkins extends Component {
  render() {
    let heroPath = this.props.heroPath;
    let skins = [];
    skins.push({
      file: `${heroPath}Loading Screen.png`,
      title: "Loading Screen"
    });
    this.props.skins.map(skin =>
      skins.push({
        file: `${heroPath}${skin}.png`,
        title: skin
      })
    );
    return (
      <div>
        {skins.map(skin => (
          <div className="skin" key={skin.title}>
            <p className="title2">{skin.title}</p>
            <Image src={skin.file}
              alt={skin.title}
              style={{ border: "none" }}
              className="skin" />
          </div>
        ))}
      </div>
    );
  }
}
