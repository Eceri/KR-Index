import React, { useEffect } from "react";
import Helmet from "react-helmet";
import ReactToolTip from "react-tooltip";
import { Image } from "./../components";
import { Link } from "react-router-dom";
import "./../styles/Heroes.css";

export const Heroes = () => {
  let classes = require("./../../Assets/classes/classes.json");
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
            <Image
              src={`classes/${heroClass.name.toLowerCase()}.png`}
              className="classIcon"
            />
            {heroClass.name}s
          </h2>
          <div className="heroesContainer">
            {heroClass.heroes.sort().map((hero) => (
              <Link to={`/heroes/${hero}`} key={hero}>
                <Image
                  src={`heroes/${hero.toLowerCase()}/portrait.png`}
                  dataTip={hero}
                  className="heroIcon"
                />
              </Link>
            ))}
            <ReactToolTip border={true} className={"tooltip"} />
          </div>
        </div>
      ))}
    </>
  );
};
export default Heroes;
