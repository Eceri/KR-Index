import React, { useEffect, useGlobal, useState } from "reactn";
import Helmet from "react-helmet";
import ReactToolTip from "react-tooltip";
import { NavLink } from "react-router-dom";

import "../styles/heroes.css";
//AWS
import { AWSoperation, listHeroesWithClass } from "Aws";
import { Spinner } from "Styles";

const groupBy = (items, keyFn) => {
  const result = [];
  items.forEach((item) => {
    const key = keyFn(item);
    const group = result[key];
    group ? group.push(item) : (result[key] = [item]);
  });
  return result;
};
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

  useEffect(() => {
    AWSoperation(listHeroesWithClass)
      .then((res) => {
        res.sort((heroA, heroB) => heroA.name > heroB.name);
        let sortedHeroes = groupBy(res, (hero) =>
          classOrder.indexOf(hero.class)
        );
        setClasses(sortedHeroes);
      })
      .then(() => setIsLoading(false));
  }, []);

  const Heroes = () => (
    <>
      {classes.map((heroes, index) => {
        let heroClass = classOrder[index];
        return (
          <div key={index}>
            <h2 className={"classHeadline"}>
              <img
                src={`/assets/classes/${heroClass.toLowerCase()}.png`}
                className="classIcon"
              />
              {heroClass}s
            </h2>
            <div className="heroesContainer">
              {heroes.map(({ name: hero }) => (
                <NavLink
                  to={`/heroes/${hero}`}
                  key={hero}
                  onClick={() => setGlobalHeroName(hero)}
                >
                  <img
                    src={`/assets/heroes/${hero.toLowerCase()}/portrait.png`}
                    data-tip={hero}
                    className="heroIcon"
                  />
                </NavLink>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
  const title = (
    <Helmet>
      <title>{`Heroes`}</title>
      <meta name="description" content="Heroes overview" />
    </Helmet>
  );
  return (
    <>
      {title}
      {isLoading ? <Spinner /> : <Heroes />}
      <ReactToolTip />
    </>
  );
};
export default Heroes;
