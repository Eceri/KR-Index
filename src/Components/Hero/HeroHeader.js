import React, { useEffect, useState, useGlobal, getGlobal } from "reactn";
import ReactTooltip from "react-tooltip";

import { AWSoperation, getHeroHeadInfo } from "Aws";
import { CustomError } from "Helpers";
import styled from "styled-components";

//Styled Components
const NpcBonusWrapperDiv = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  img {
    height: 2rem;
    border: none;
  }
`;
const attributeImg = (id) => (<img id={id} data-tip={``} data-for={id} data-place={`bottom`} />)`
  border: none;

`;
export const HeroHeader = () => {
  //states
  const [isLoading, setIsLoading] = useState(true);
  //globals
  const [error, setError] = useGlobal("error");
  const [
    { title, name, damageType, position, class: heroClass, npcBonus },
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

  let toolTip = (_id, content) => (
    <ReactTooltip id={_id} data-place={`bottom`}>
      {content}
    </ReactTooltip>
  );

  return isLoading ? (
    <></>
  ) : (
    <div className="flexBox">
      <img
        src={`/assets/heroes/${heroName.toLowerCase()}/portrait.png`}
        id={"portrait"}
      />
      <div>
        <h1>{name}</h1>
        <h2>{title}</h2>
        <div id="heroType" className="flexBox">
          <img
            src={`/assets/classes/${heroClass.toLowerCase()}.png`}
            id={"heroClassIcon"}
            data-tip={``}
            data-for={`heroClassIcon`}
            style={{ border: "none" }}
          />
          {toolTip(`heroClassIcon`, heroClass)}
          <img
            src={`/assets/${damageType}.png`}
            id={"damageType"}
            data-tip={``}
            data-for={`damageType`}
            alt={"dmg type"}
            style={{ border: "none" }}
          />
          {toolTip(`damageType`, damageType)}
          <p>{position}</p>
          {npcBonus && (
            <NpcBonusWrapperDiv>
              <img
                src={`/assets/hero/${name}/npcBonus.png`}
                id={`npcBonus`}
                data-tip={``}
                data-for={`npcBonus`}
                data-place={`bottom`}
              />
              {toolTip(
                `npcBonus`,
                <>
                  {npcBonus.name}
                  <p>{npcBonus.effect}</p>{" "}
                </>
              )}
            </NpcBonusWrapperDiv>
          )}
        </div>
      </div>
    </div>
  );
};
