import React, { useEffect, useGlobal } from "reactn";
import Helmet from "react-helmet";
import ReactToolTip from "react-tooltip";
import { NavLink } from "react-router-dom";

import "../styles/heroes.css";
//AWS
import { AWSoperation } from "Helpers";

export const Heroes = () => {
  let classes = require("./../../Assets/classes/classes.json");
  //Globals
  const [heroName, setGlobalHeroName] = useGlobal("heroName");
  
  const title = (
    <Helmet>
      <title>{`Heroes`}</title>
      <meta name="description" content="Heroes overview" />
    </Helmet>
  );
  
  return (
    <>
      {title}
      {classes.map((heroClass) => (
        <div key={heroClass.name}>
          <h2 className={"classHeadline"}>
            <img
              src={`/assets/classes/${heroClass.name.toLowerCase()}.png`}
              className="classIcon"
            />
            {heroClass.name}s
          </h2>
          <div className="heroesContainer">
            {heroClass.heroes.sort().map((hero) => (
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
            <ReactToolTip border={true} className={"tooltip"} />
          </div>
        </div>
      ))}
    </>
  );
};
export default Heroes;
