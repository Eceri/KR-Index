import React from "react";
import { Link } from "react-router-dom"
import { createHelmet } from "./helpers/helpers.helmet"

export const Home = () => {
  return (
    <React.Fragment>
      {createHelmet("Home", "Homepage")}
      <div>
        <h1 style={{textAlign: "center"}}>Welcome to KR Index</h1>
        <p>This is a WIP. We're missing a bunch of info, but we are working on it!</p>
        <p>
          If you have any suggestions or found errors, you can leave us a ticket over at  <Link href="https://github.com/Eceri/KR-Index" target="_blank" rel="noopener noreferrer" style={{color: "lightblue"}}>GitHub</Link>.
        </p>
        <p style={{marginTop: "40px"}}>
          Currently we are trying to finish up heroes with their Soul Weapons and stories. After that we'll add skins and voicelines. All <Link to="heroes" style={{color: "lightblue"}} >heroes</Link> with their skill and UT/UW data and <Link to="artifacts" style={{color: "lightblue"}} >artifacts</Link> are already available.
        </p>
      </div>
    </React.Fragment>
  );
}

export default Home;
