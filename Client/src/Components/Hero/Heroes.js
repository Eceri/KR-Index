import React from "react";
import Helmet from "react-helmet";
import ReactToolTip from "react-tooltip";
import { Image } from "./../components";
import { Link } from "react-router-dom";
import "./../styles/Heroes.css";

let heroesClasses = {
  Knight: ['Phillop', 'Clause', 'Demia', 'Morrah', 'Jane', 'Ricardo', 'Aselica', 'Neraxis', 'Sonia', 'Glenwys', 'Loman', 'Dosarta'],
  Warrior: ['Kasel', 'Gau', 'Naila', 'Theo', 'Viska', 'Priscilla', 'Seria', 'Scarlet', 'Kirze', 'Chase', 'Bernheim', 'Nicky'],
  Assassin: ['Roi', 'Epis', 'Reina', 'Fluss', 'Tanya', 'Ezekiel', 'Erze', 'Laudia', 'Mirianne', 'Nia', 'Gladi'],
  Archer: ['Selene', 'Dimael', 'Luna', 'Arch', 'Yanne', 'Zafir', 'Yuria', 'Requina', 'Shamilla'],
  Mechanic: ['Lakrak', 'Miruru', 'Rodina', 'Annette', 'Mitra', 'Oddy', 'Crow', 'Chrisha', 'Kara', 'Cecilia', 'Hanus', 'Pansirone'],
  Wizard: ['Cleo', 'Maria', 'Lorraine', 'Pavel', 'Aisha', 'Lewisia', 'Nyx', 'Ophelia', 'Lilia', 'Artemia', 'Esker', 'Dakaris', 'Veronica', 'Cain'],
  Priest: ['Frey', 'Kaulah', 'Rephy', 'Baudouin', 'Leo', 'Laias', 'Cassandra', 'Mediana', 'Lavril', 'Lucias', 'Shea', 'May', 'Juno', 'Rehartna']
}
// TODO: change the routing to accomodate a heroes overview.
export const Heroes = () => {
  // let heroes = require("./../../Assets/classes/classes.json")
  // let heroes = [];

  const title = (
    <Helmet>
      <title>{`Heroes`}</title>
      <meta name="description" content="Heroes overview" />
    </Helmet>
  );
  return <>
    {title}
    {Object.keys(heroesClasses).map(key => <div key={key}>
      <h2 className={"classHeadline"}>
        <Image src={`classes/${key.toLowerCase()}.png`} className="classIcon" />
        {key}s</h2>
      <div className="heroesContainer">
        {heroesClasses[key].sort().map(hero => (
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
