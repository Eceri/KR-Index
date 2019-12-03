import React from "react";
import Helmet from "react-helmet";
import ReactToolTip from "react-tooltip";
import { Image } from "./../components";
import { Link } from "react-router-dom";
import "./../styles/Heroes.css";

let heroesClasses = [
  {
    name: "Knight",
    heroes: ["Aselica", "Sonia"]
  },
  {
    name: "Warrior",
    heroes: ["Seria"]
  },
  {
    name: "Assassin",
    heroes: ["Epis"]
  },
  {
    name: "Mechanics",
    heroes: ["Annette"]
  }
];
// TODO: change the routing to accomodate a heroes overview.
export const Heroes = () => {
  // let heroes = require("./../../Assets/classes/classes.json")
  // let heroes = [];

  const title = (
    <Helmet>
      <title>{`Heroes`}</title>
      <meta name="description" content="Helmet application" />
    </Helmet>
  );
  return <>
    {title}
    {heroesClasses.map(heroClass => <div key={heroClass.name}>
      <h2>{heroClass.name}</h2>
      <div className="heroesContainer">
        {heroClass.heroes.sort().map(hero => (
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
    )
    }
  </>
}
export default Heroes;
