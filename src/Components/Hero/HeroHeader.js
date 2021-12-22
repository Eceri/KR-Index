import React, { useEffect, useState, useGlobal, getGlobal } from "reactn";
import ReactTooltip from "react-tooltip";

import { AWSoperation, getHeroHeadInfo } from "Aws";
import styled from "styled-components";

export const HeroHeader = (props) => {
  //states
  const [isLoading, setIsLoading] = useState(true);
  //globals
  const [error, setError] = useGlobal("error");
  const [
    { title, name, damageType, position, class: heroClass },
    setGlobalHeadInfo,
  ] = useGlobal("headInfo");
  const { heroName, headInfos } = getGlobal();

  useEffect(() => {
    if (heroName !== "") {
      if (headInfos.length > 1) {
        setGlobalHeadInfo(headInfos.find((v) => v.name === heroName));
        setIsLoading(false);
      } else {
        AWSoperation(getHeroHeadInfo, { name: heroName })
          .then((hero) => {
            setGlobalHeadInfo(hero);
            setIsLoading(false);
          })
          .catch((err) => {
            setError({
              message: "Hero not found.",
            });
          });
      }
    }
  }, [heroName, headInfos]);

  let perkLink = true;
  if(props.perkLink == false){
    perkLink = false;
  } 

  //styled-components
  const HeroHeaderContainer = styled.div`
    display: grid;
    grid-gap: 0 .5rem;
    grid-auto-columns: min-content auto;
    align-items: center;
    .col-start-2 {
      grid-column-start: 2;
    }

    @media (max-width: 30em) {
    }
  `;
  const HeroDetailsDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: .5rem;
    align-items: center;
  `;
  const HeroPortrait = styled.img`
    height: 7rem; 
    width: auto;
    grid-row: span 3;
  `;
  const HeroClassAndTypeIcon = styled.img`
    height: 2rem;
    width: auto;
  `;
  const HeroPerkLinkDiv = styled.div`
    box-sizing: border-box;

    display: flex;
    gap: .5rem;

    border: 1px solid #262626;
    background-color: #262626;
    padding:.5rem;
    text-align: center
    border-radius: .25rem;
    grid-column-start: 3;
    grid-row: 1 / 3;

    min-width: 8rem;
    height: auto;
    @media (max-width: 30em) {
      grid-row: 4 / 5;
      grid-column-start: 2;
      justify-self: end;
      margin-top: 1rem;
    }
    :hover {
      border: 1px solid white;
    }
    img {
      border: none;
      width: 1.5rem;
    }
  `;

  return isLoading ? (
    <></>
  ) : (
    <HeroHeaderContainer>
      <HeroPortrait
        src={`/assets/heroes/${heroName.toLowerCase()}/portrait.png`}
      />
      <h1 className="col-start-2">{name}</h1>
      <h2 className="col-start-2">{title}</h2>
      <HeroDetailsDiv className="col-start-2">
        <HeroClassAndTypeIcon
          src={`/assets/classes/${heroClass.toLowerCase()}.png`}
          style={{ border: "none" }}
          data-tip={heroClass}
        />
        <HeroClassAndTypeIcon
          src={`/assets/${damageType}.png`}
          alt={"dmg type"}
          style={{ border: "none" }}
          data-tip={damageType}
        />
        <p>{position}</p>
      </HeroDetailsDiv>
      {perkLink && <HeroPerkLinkDiv>
        <a href={`/perks/${name}`} >
          Perks Viewer 
        </a>
          <img 
            src="/assets/icons/white_eye_icon.png"
          />
      </HeroPerkLinkDiv>}
      <ReactTooltip />
    </HeroHeaderContainer>
  );
};
