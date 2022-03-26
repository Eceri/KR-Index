import React, { useEffect, useGlobal, useState } from "reactn";
import ReactToolTip from "react-tooltip";
import { NavLink, NavLink as StyledNavLink } from "react-router-dom";

import "../styles/heroes.css";

//AWS
import { AWSoperation, listHeroesWithClass } from "Aws";
import { Spinner } from "Styles";
import { createHelmet, groupElementsBy } from "Helpers";
import styled from "styled-components";

export const Heroes = () => {
  //States
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //Globals
  const [heroName, setGlobalHeroName] = useGlobal("heroName");

  const classOrder = [
    "Knight",
    "Warrior",
    "Assassin",
    "Archer",
    "Mechanic",
    "Wizard",
    "Priest",
  ];

  //styledComponents
  const HeroClassContainer = styled.div`
    display: grid;
    grid-gap: 1rem .5rem;
    grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
    justify-content: center;
    text-align: center;
  `;
  const HeroPortrait = styled.img`
    width: auto;
  `;
  const StyledNavLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
  `;
  const ClassIcon = styled.img`
    border: none;
    height: 1.5rem;
    width: auto;
    float: left;
    `;
  const ClassHeadlineContainer = styled.div`
    margin: .5rem 0;
    gap: .5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  useEffect(() => {
    let fetchData = async () => {
      let fetched = false;
      let fetchedHeroes = [];
      let currentToken;
      do {
        await AWSoperation(listHeroesWithClass, {
          nextToken: currentToken,
        }).then(({ items, nextToken }) => {
          fetchedHeroes.push(...items);
          if (nextToken) currentToken = nextToken;
          else fetched = true;
        });
      } while (!fetched);

      fetchedHeroes.sort((heroA, heroB) => heroA.name > heroB.name);
      let sortedHeroes = groupElementsBy(fetchedHeroes, (hero) =>
        classOrder.indexOf(hero.class)
      );
      setClasses(sortedHeroes);
      setIsLoading(false);
    };
    fetchData();
  }, [fetch]);

  const Heroes = () => (
    <>
      {classes.map((heroes, index) => {
        let heroClass = classOrder[index];
        return (
          <div key={index}>
            <ClassHeadlineContainer>
              <ClassIcon
                src={`/assets/classes/${heroClass.toLowerCase()}.png`}
                className="classIcon"
              />
              <h2>
                {`${heroClass}s`}
              </h2>
            </ClassHeadlineContainer>
            <HeroClassContainer>
              {heroes.map(({ name: hero }) => (
                <StyledNavLink
                  to={`/heroes/${hero}`}
                  key={hero}
                  onClick={() => setGlobalHeroName(hero)}
                >
                  <HeroPortrait
                    src={`/assets/heroes/${hero.toLowerCase()}/portrait.png`}
                    data-tip={hero}
                    className="heroIcon"
                  />
                  {hero}
                </StyledNavLink>
              ))}
            </HeroClassContainer>
          </div>
        );
      })}
    </>
  );
  const title = createHelmet(`Heroes`, `Heroes overview`);

  return (
    <>
      {title}
      {isLoading ? <Spinner /> : <Heroes />}
      <ReactToolTip />
    </>
  );
};
export default Heroes;
