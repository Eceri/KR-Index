import React from "react";
import Helmet from "react-helmet";
import ReactToolTip from "react-tooltip";
import { Image } from "./../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./../styles/Heroes.css";

const heroesDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
const imageDiv = styled.div`
  padding: 10px;
`;

let heroesClasses = [
  {
    name: "Knight",
    heroes: ["Aselica"]
  },
  {
    name: "Warrior",
    heroes: ["Seria"]
  },
  {
    name: "Assassin",
    heroes: ["Epis"]
  }
];
// TODO: change the routing to accomodate a heroes overview.
export const Heroes = () => {
  // let heroes = require("./../../Assets/classes/classes.json")
  let heroes = [];
  heroesClasses.map(heroClass => heroes.push(heroClass.heroes));
  heroesClasses.map(heroClass => heroes.push(heroClass.heroes));
  heroesClasses.map(heroClass => heroes.push(heroClass.heroes));
  heroes.sort();

  const title = (
    <Helmet>
      <title>{`Heroes`}</title>
      <meta name="description" content="Helmet application" />
    </Helmet>
  );
  return (
    <div id="content">
      {title}
      <div  className="heroesContainer">
        {console.log(Heroes)}
        {heroes.map(hero => (
          <Link to={`/hero/${hero}`}>
            <Image
              src={`heroes/${hero}/hero.png`}
              dataTip={hero}
              className="heroIcon"
            />
          </Link>
        ))}
        <ReactToolTip multiline={true} border={true} className={"tooltip"} />
      </div>
    </div>
  );
};
export default Heroes;
