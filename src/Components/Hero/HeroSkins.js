import React, { useState, useEffect, getGlobal } from "reactn";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

//Relative Imports
import { AWSoperation, getHeroSkins } from "Helpers";

//styled components
const SkinsWrapper = styled.div`
  .custom-thumbnail {
    width: 100%;
    max-width: 100px;
  }
  .custom-thumbnail img,
  .custom-image img {
    border: none;
  }
  .image-gallery-thumbnails-wrapper ::-webkit-scrollbar {
    height: 5px;
    width: 5px;
    color: white;
  }
  .image-gallery-thumbnails-wrapper ::-webkit-scrollbar-thumb {
    background-color: gray;
  }
  .image-gallery-thumbnails-wrapper ::-webkit-scrollbar-thumb:hover {
    background-color: dimgrey;
  }
  .image-gallery-thumbnails-wrapper ::-webkit-scrollbar-track {
    background-color: #262626;
  }
  .image-gallery-thumbnails {
    scrollbar-width: thin;
    overflow-y: auto;
    overflow-x: auto;
    scroll-behavior: smooth;
  }
  .image-gallery-thumbnail.active,
  .image-gallery-thumbnail:hover,
  .image-gallery-thumbnail:focus {
    border-color: lightgrey;
  }
  .image-gallery-thumbnails-wrapper.left {
    max-height: 750px;
  }
  .image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails,
  .image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails {
    direction: rtl;
  }
  .image-gallery-slide .image-gallery-description {
    top: 10px;
    left: 5px;
    bottom: unset;
    background-color: #262626;
  }
`;
const Lightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 3000;
  overflow: auto;
  display: grid;
  overscroll-behavior-y: contain;
  --webkit-overflow-scrolling: touch;
`;
const LightboxImageWrapper = styled.div`
  justify-self: center;
  align-self: center;
`;
const LightboxImage = styled.img`
  border: none;
  max-width: 100%;
  max-height: 100%;
  min-width: max-content;
  min-height: max-content;
`;
const CloseButton = styled((props) => <span {...props} role="button">&times;</span>)`
  position: fixed;
  top: 1rem;
  width: 2rem;
  height: 2rem;
  z-index: 3001;
  &:hover {
    opacity: 1;
  }
  font-size: 5rem;
  line-height: 1rem;
  cursor: pointer;
  Christmas of the Imperial Guard
`;
export const HeroSkins = () => {
  const heroName = getGlobal().heroName;
  const assetsUrl = `/assets/heroes/${heroName.toLowerCase()}/`;
  const [heroSkins, setHeroSkins] = useState([]);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    imgUrl: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  //Image Item for Gallery
  const getImageItem = (imageSrc) => ({
    original: `${assetsUrl}${imageSrc}.png`,
    thumbnail: `${assetsUrl}${imageSrc}.png`,
    description: imageSrc,
    thumbnailClass: "custom-thumbnail",
    originalClass: "custom-image",
  });

  //Handle resize to change ThumnailPosition once is screen < 650px
  let matchMedia = window.matchMedia("(max-width:650px)");
  const getThumbnailPosition = () => (matchMedia.matches ? "bottom" : "left");
  const [thumbnailsPosition, setThumbnailsPosition] = useState(
    getThumbnailPosition()
  );

  useEffect(() => {
    matchMedia.addListener(() => setThumbnailsPosition(getThumbnailPosition()));
  }, []);

  //TODO: add possibility to link to skins directly.
  //load skins and prepare skins
  useEffect(() => {
    if (heroName != "") {
      let skinGalleryItems = [getImageItem("Base")];
      AWSoperation(getHeroSkins, { name: heroName })
        .then((res) => {
          for (let skin of res.data.getHero.skins) {
            skinGalleryItems.push(getImageItem(skin));
          }
          setHeroSkins(skinGalleryItems);
          setLightboxState({
            isOpen: lightboxState.isOpen,
            imgUrl: skinGalleryItems[0].original,
          });
        })
        .then(() => setIsLoading(false));
    }
  }, [heroName]);

  //open lightbox
  const handleImageOnclick = (event) => {
    document.body.style.overflowY = "hidden";
    setLightboxState({
      isOpen: true,
      imgUrl: lightboxState.imgUrl,
    });

    let lightbox = document.getElementById("lightbox");
    setTimeout(() => {
      lightbox.scrollTo({
        top: (lightbox.scrollHeight - lightbox.offsetHeight) / 2,
        left: (lightbox.scrollWidth - lightbox.offsetWidth) / 2,
      });
    });
  };
  //close Lightbox
  const handleCloseLightboxClick = () => {
    document.body.style.overflowY = "auto";
    setLightboxState({
      isOpen: false,
      imgUrl: lightboxState.imgUrl,
    });
  };
  //prevent ImageClick closing lightbox
  const handleLightboxImageClick = (event) => {
    event.stopPropagation();
  };
  //scroll to Thumbnail Position in case its out of view
  const handleOnBeforeSlide = (event) => {
    let thumbnailsContainer = document.getElementsByClassName(
      `image-gallery-thumbnails`
    )[0];
    let targetThumbnail = document.getElementsByClassName(`custom-thumbnail`)[
      event
    ];
    let thumbnailsContainerRect = thumbnailsContainer.getBoundingClientRect();
    let targetThumbnailRect = targetThumbnail.getBoundingClientRect();

    //TODO: add vertical check.
    if (thumbnailsContainerRect.left > targetThumbnailRect.left) {
      thumbnailsContainer.scrollTo(
        targetThumbnail.offsetLeft -
          thumbnailsContainer.offsetWidth +
          targetThumbnail.offsetWidth,
        targetThumbnail.offsetTop
      );
    } else {
      thumbnailsContainer.scrollTo(
        targetThumbnail.offsetLeft,
        targetThumbnail.offsetTop
      );
    }

    setLightboxState({
      isOpen: lightboxState.isOpen,
      imgUrl: heroSkins[event].original,
    });
  };

  return isLoading ? (
    <div> </div>
  ) : (
    <SkinsWrapper>
      <ImageGallery
        items={heroSkins}
        showPlayButton={false}
        thumbnailPosition={thumbnailsPosition}
        showFullscreenButton={false}
        infinite={true}
        showIndex={false}
        disableThumbnailScroll={true}
        showBullets={true}
        slideOnThumbnailOver={false}
        onClick={handleImageOnclick}
        onBeforeSlide={handleOnBeforeSlide}
      />
      <Lightbox
        id="lightbox"
        style={lightboxState.isOpen ? { diplay: "block" } : { display: "none" }}
        onClick={handleCloseLightboxClick}
        onScroll={(event) => event.stopPropagation()}
      >
        <CloseButton
          className="close"
          onClick={handleCloseLightboxClick}
          style={{ right: thumbnailsPosition == "left" ? "2rem" : "1rem" }}
        />
        <LightboxImageWrapper>
          <LightboxImage
            id="lightbox-image"
            src={lightboxState.imgUrl}
            onClick={handleLightboxImageClick}
          />
        </LightboxImageWrapper>
      </Lightbox>
    </SkinsWrapper>
  );
};
