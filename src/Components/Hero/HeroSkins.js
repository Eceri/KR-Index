import React, { useState, useEffect, getGlobal, useGlobal } from "reactn";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactTooltip from "react-tooltip";

//Relative Imports
import { Spinner } from "Styles";
import { AWSoperation, getHeroSkins } from "Aws";
import { CustomError } from "Helpers";

//styled components
const SkinsWrapper = styled.div`
  .custom-thumbnail {
    cursor: pointer;
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
  .image-gallery-image {
    width: 100%;
    height: auto;
    min-width: 100px;
    min-height: 100px;
  }
`;
export const HeroSkins = () => {
  //Globals
  const [error, setError] = useGlobal("error");
  const heroName = getGlobal().heroName;
  //States
  const [heroSkins, setHeroSkins] = useState([]);
  const [currentSkinUrl, setCurrentSkinUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  const assetsUrl = `/assets/heroes/${heroName.toLowerCase()}/`;

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
      setCurrentSkinUrl(skinGalleryItems[0].original);
      AWSoperation(getHeroSkins, { name: heroName })
        .then(({ skins }) => {
          for (let skin of skins) {
            skinGalleryItems.push(getImageItem(skin));
          }
          setHeroSkins(skinGalleryItems);
        })
        .then(() => setIsLoading(false))
        .catch((err) => {
          let error = CustomError(`Hero Not Found.`, true, `/heroes/`);
          setError(error);
        });;
    }
  }, [heroName]);

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

    setCurrentSkinUrl(heroSkins[event].original);

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
  };

  //hacky open in new tab button
  const customFullScreenButton = () => (
    <a
      type="button"
      aria-label="Open Image in new Tab"
      className="image-gallery-icon image-gallery-fullscreen-button"
      target="_blank"
      rel="noopener noreferrer"
      href={currentSkinUrl}
      data-tip={`Open in new tab`}
      style={{ margin: "20px", padding: 0 }}
    >
      <svg
        width="2rem"
        height="2rem"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="white"
        stroke="black"
        strokeWidth=".25"
      >
        <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
      </svg>
    </a>
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <SkinsWrapper>
      <ImageGallery
        items={heroSkins}
        showPlayButton={false}
        thumbnailPosition={thumbnailsPosition}
        showFullscreenButton={true}
        renderFullscreenButton={customFullScreenButton}
        infinite={true}
        showIndex={false}
        disableThumbnailScroll={true}
        showBullets={true}
        slideOnThumbnailOver={false}
        onBeforeSlide={handleOnBeforeSlide}
      />
      <ReactTooltip border={true} />
    </SkinsWrapper>
  );
};
