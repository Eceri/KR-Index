import React from "react";
import { Link } from "react-router-dom"
import styled from "styled-components"
import { createHelmet } from "./helpers/helpers.helmet"

let BlueLink = styled.a`
  color: lightblue
`

export const Home = () => {
  return (
    <React.Fragment>
      {createHelmet("Home", "Homepage")}
      <div>
        <h1 style={{textAlign: "center"}}>Welcome to KR Index</h1>
        <p>This is a WIP. We're missing a bunch of info, but we are working on it!</p>
        <p>
          If you have any suggestions or found errors, you can leave us a ticket over at  <BlueLink  href="https://github.com/Eceri/KR-Index" target="_blank" rel="noopener noreferrer">GitHub</BlueLink>.
        </p>
        <p style={{marginTop: "40px"}}>
          Currently we are trying to finish up heroes with their Soul Weapons and stories. After that we'll add skins and voicelines. All <Link to="heroes"><BlueLink>heroes</BlueLink></Link> with their skill and UT/UW data and <Link to="artifacts"><BlueLink>artifacts</BlueLink></Link> are already available.
        </p>
      </div>
    </React.Fragment>
  );
}

export default Home;
