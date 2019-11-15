import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import "./../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import throttle from "lodash.throttle";
import { Image } from "./../components"
import "./../styles/HeroSkins.css"

export class HeroSkins extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { isMobile: this.handleWindowResize() };
  // }
  // componentDidMount() {
  //   window.addEventListener("resize", () => {
  //     this.setState({
  //       isMobile: this.handleWindowResize()
  //     });
  //   });
  // }
  // handleWindowResize = throttle(() => {
  //   return window.innerWidth < 1000 ? "top" : "left";
  // }, 150);
  render() {
    // let position = this.state.isMobile;
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
              style={{border: "none"}}
              className="skin" />
          </div>
        ))}
      </div>
    );
  }
}
