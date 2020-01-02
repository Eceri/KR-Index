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
          If you have any suggestions or found errors, you can leave us a ticket over at  <Link href="https://github.com/Eceri/KR-Index" target="_blank" style={{color: "lightblue"}}>GitHub</Link>.
        </p>
      </div>
    </React.Fragment>
  );
}

export default Home;
