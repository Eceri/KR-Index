import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import "./../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import throttle from "lodash.throttle";

export class Skins extends Component {
  constructor(props) {
    super(props);
    this.state = { isMobile: this.handleWindowResize() };
  }
  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({
        isMobile: this.handleWindowResize()
      });
    });
  }
  handleWindowResize = throttle(() => {
    return window.innerWidth < 1000 ? "top" : "left";
  }, 150);
  render() {
    let position = this.state.isMobile;
    let heroPath = this.props.heroPath;
    let skins = [];
    this.props.skins.map(skin =>
      skins.push({
        original: require(`./../../Assets/${heroPath}${skin}.png`),
        thumbnail: require(`./../../Assets/${heroPath}${skin}.png`),
        description: skin,
        thumbnailTitle: skin
      })
    );
    skins.push({
      original: require(`./../../Assets/${heroPath}Loading Screen.png`),
      thumbnail: require(`./../../Assets/${heroPath}Loading Screen.png`),
      description: "Loading Screen",
      thumbnailTitle: "Loading Screen"
    });
    return (
      <ImageGallery
        items={skins}
        lazyLoad={true}
        showFullscreenButton={false}
        showPlayButton={false}
        thumbnailPosition={position}
        additionalClass={"galleryImage"}
      ></ImageGallery>
    );
  }
}
