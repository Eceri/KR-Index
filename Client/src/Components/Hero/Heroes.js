import React from "react";
import Helmet from "react-helmet";
import ReactToolTip from "react-tooltip";
import { Image } from "./../components"
import styled from "styled-components";
import {Link} from "react-router-dom"

const ArtifactContainer = styled.div`
  width: 100%;
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
]
// TODO: change the routing to accomodate a heroes overview.
export const Heroes = () => {
  // let heroes = require("./../../Assets/classes/classes.json")
  let heroes = []
  heroesClasses.map(heroClass => heroes.push(heroClass.heroes))
  heroes.sort()
  
  const title = (
    <Helmet>
      <title>{`Heroes`}</title>
      <meta name="description" content="Helmet application" />
    </Helmet>
  )
  return (
    <div id="content">
      {title}
      {console.log(Heroes)}
          {heroes.map(hero => (
            <Link to={`/hero/${hero}`}>
              <Image src={`heroes/${hero}/hero.png`} dataTip={hero} className="heroIcon" />
            </Link>
          ))}
      <ReactToolTip multiline={true} border={true} className={"tooltip"} />
    </div>
  )
};
export default Heroes;