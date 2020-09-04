import React, { useState, useEffect, getGlobal } from "reactn";
// import "../styles/HeroSkins.css";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/ImageGallery.css";
//Relative Imports
import { AWSoperation, getHeroSkins } from "Helpers";

export const HeroSkins = () => {
  const heroName = getGlobal().heroName;
  const assetsUrl = `/assets/heroes/${heroName.toLowerCase()}/`;
  const getImageObject = (imageSrc) => ({
    original: `${assetsUrl}${imageSrc}.png`,
    thumbnail: `${assetsUrl}${imageSrc}.png`,
    description: imageSrc,
    thumbnailClass: "custom-thumbnail",
    originalClass: "custom-image",
  });
  const defaultSkins = [getImageObject("Base")];
  const [heroSkins, setHeroSkins] = useState(defaultSkins);

  useEffect(() => {
    if (heroName != "") {
      let skins = defaultSkins;
      AWSoperation(getHeroSkins, { name: heroName }).then((res) => {
        for (let skin of res.data.getHero.skins) {
          skins.push(getImageObject(skin));
        }
        setHeroSkins(skins);
      });
    }
  }, [heroName]);

  return (
    <ImageGallery
      items={heroSkins}
      showPlayButton={false}
      thumbnailPosition={
        window.matchMedia("(max-width:650px)").matches ? "bottom" : "left"
      }
      showFullscreenButton={false}
      infinite={true}
      showIndex={false}
      disableThumbnailScroll={true}
      showBullets={true}
      slideOnThumbnailOver={false}
    />
  );
};
