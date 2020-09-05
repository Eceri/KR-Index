import React, { useState, useEffect, getGlobal } from "reactn";
// import "../styles/HeroSkins.css";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/HeroSkins.css";
//Relative Imports
import { AWSoperation, getHeroSkins } from "Helpers";

export const HeroSkins = () => {
  const heroName = getGlobal().heroName;
  const assetsUrl = `/assets/heroes/${heroName.toLowerCase()}/`;

  //Image object for Gallery
  const getImageObject = (imageSrc) => ({
    original: `${assetsUrl}${imageSrc}.png`,
    thumbnail: `${assetsUrl}${imageSrc}.png`,
    description: imageSrc,
    thumbnailClass: "custom-thumbnail",
    originalClass: "custom-image",
  });
  const baseSkin = [getImageObject("Base")];
  const [heroSkins, setHeroSkins] = useState(baseSkin);

  //Handle resize to change ThumnailPosition once is screen < 650px
  let matchMedia = window.matchMedia("(max-width:650px)");
  const getThumbnailPosition = () => (matchMedia.matches ? "bottom" : "left");

  const [thumbnailPosition, setThumbnailPosition] = useState(
    getThumbnailPosition()
  );
  useEffect(() => {
    const handleResize = () => setThumbnailPosition(getThumbnailPosition());

    matchMedia.addListener(handleResize);
  });

  //load skins
  useEffect(() => {
    if (heroName != "") {
      let skins = baseSkin;
      AWSoperation(getHeroSkins, { name: heroName }).then((res) => {
        for (let skin of res.data.getHero.skins) {
          skins.push(getImageObject(skin));
        }
        setHeroSkins(skins);
      });
      
      setLightboxState({
        isOpen: lightboxState.isOpen,
        imgUrl: skins[0].original
      })
    }
  }, [heroName]);

  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    imgUrl: "",
  });

  //open lightbox
  const handleImageOnclick = (event) => {
    setLightboxState({
      isOpen: true,
      imgUrl: lightboxState.imgUrl,
    });
    setTimeout(()=>{
      let lightbox = document.getElementById("lightbox");
      lightbox.scrollTo({
        top: (lightbox.scrollHeight - lightbox.offsetHeight) / 2,
        left: (lightbox.scrollWidth - lightbox.offsetWidth) / 2
      })
    })
  };
  //close Lightbox
  const handleCloseLightboxClick = () => {
    setLightboxState({
      isOpen: false,
      imgUrl: lightboxState.imgUrl,
    });
  };
  //prevent ImageClick closing lightbox
  const handleLightboxImageClick = (event) => {
    event.stopPropagation();
  };

  const handleOnSlide = (event) => {
    setLightboxState({
      isOpen: lightboxState.isOpen,
      imgUrl: heroSkins[event].original,
    });
  };

  return (
    <div id={"skins"}>
      <ImageGallery
        items={heroSkins}
        showPlayButton={false}
        thumbnailPosition={thumbnailPosition}
        showFullscreenButton={false}
        infinite={true}
        showIndex={false}
        disableThumbnailScroll={false}
        showBullets={true}
        slideOnThumbnailOver={false}
        onClick={handleImageOnclick}
        onSlide={handleOnSlide}
      />
      <div
        id="lightbox"
        style={lightboxState.isOpen ? { visibility: "visible" } : { visibility: "hidden" }}
        onClick={handleCloseLightboxClick}
      >
        <span href="#" className="close" onClick={handleCloseLightboxClick} />

        <div id="lightbox-image-wrapper">
          <img
            id="lightbox-image"
            src={lightboxState.imgUrl}
            onClick={handleLightboxImageClick}
          />
        </div>
      </div>
    </div>
  );
};
