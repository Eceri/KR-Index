import React, { useEffect, useState, getGlobal, useGlobal } from "reactn";
import styled from "styled-components";
import {
  TierTwoPerks,
  TierOnePerks,
  UniqueWeapon,
  HeroSkill,
} from "Components";
import { Spinner } from "Styles";
import { CustomError } from "Helpers";
//aws
import { AWSoperation, getHeroGeneralInfo } from "Aws";

//Styled Components
const NpcBonusWrapperDiv = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  img {
    height: 3rem;
    border: none;
  }
`;
export const HeroGeneral = (props) => {
  //States
  const [heroInfo, setHeroInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  //Globals
  const [error, setError] = useGlobal("error");
  const { heroName } = getGlobal();

  const assetsUrl = `/assets/heroes/${heroName.toLowerCase()}/`;

  useEffect(() => {
    if (heroName != "") {
      AWSoperation(getHeroGeneralInfo, {
        name: heroName,
      })
        .then((hero) => setHeroInfo(hero))
        .then(() => setIsLoading(false))
        .catch((err) => {
          let error = CustomError(`Hero Not Found.`, true, `/heroes/`);
          console.log(err)
          setError(error);
        });
    }
    return () => setIsLoading(true);
  }, [heroName]);

  useEffect(() => {
    if (isLoading) return;
    let scrollAnchor = window.location.hash;
    if (scrollAnchor !== undefined && scrollAnchor !== null) {
      let element = document.getElementById(`${scrollAnchor.slice(1)}-anchor`);
      let scrollToTopPosition = 0;
      if (element !== null) {
        scrollToTopPosition = element.offsetTop - 50;
      }
      window.scrollTo({
        top: scrollToTopPosition,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [window.location.hash, isLoading]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {heroInfo.npcBonus && (
        <NpcBonusWrapperDiv>
          <img src={`${assetsUrl}npcBonus.png`} />
          <p>
            {heroInfo.npcBonus.name}
            <p>{heroInfo.npcBonus.effect}</p>
          </p>
        </NpcBonusWrapperDiv>
      )}
      <h2> Unique Weapon </h2> <hr />
      <UniqueWeapon
        uniqueWeapon={heroInfo.uniqueWeapon}
        soulWeapon={heroInfo.soulWeapon}
      />
      <h2 className="subSectionHeadline">Skills</h2>
      <hr />
      <div id={"skills"}>
        <HeroSkill skill={heroInfo.skill1} />
        <HeroSkill skill={heroInfo.skill2} />
        <HeroSkill skill={heroInfo.skill3} />
        <HeroSkill skill={heroInfo.skill4} />
      </div>
      <h2 className="subSectionHeadline">Transcendence</h2>
      <hr />
      <h2 id="t5-anchor">T5</h2>
      <div className="flexBox transcendance">
        <img
          src={`${assetsUrl}light.png`}
          alt={"light"}
          className={"perkIcon"}
        />
        <p>{heroInfo.light}</p>
      </div>
      <div className="flexBox transcendance">
        <img src={`${assetsUrl}dark.png`} alt={"dark"} className={"perkIcon"} />
        <p>{heroInfo.dark}</p>
      </div>
      <hr className="seperator" />
      <h2 id="t1-anchor">T1 - Generic</h2>
      <TierOnePerks />
      <hr className="seperator" />
      <h2 id="t2-anchor">T2 - Class-Specific</h2>
      <TierTwoPerks heroClass={heroInfo.class} />
    </>
  );
};
