import React from "react";
import { createHelmet } from "./helpers/helpers.helmet";
import ReactTooltip from "react-tooltip";

import "./Components/styles/home.css";

export const Home = () => {
  return (
    <React.Fragment>
      {createHelmet("Home", "Homepage")}
      <div>
        <h1>Welcome to the King's Raid Index</h1>
        <div id="welcome">
          <div>
            <p>This page is a Database for the mobile game King's Raid.</p>
            <p>King's Raid (Korean: 킹스레이드) is a free-to-play side-scrolling
            RPG mobile game developed by South Korean game developer Vespa. It
            was first released on September 19, 2016 for operating systems
            Android and iOS in Thailand. The global version consists of 3
            servers, which were opened on February 16, 2017.</p>
          </div>
          <div id="communityLinks">
            <p>Community Links:</p>
            <a href="https://www.reddit.com/r/Kings_Raid/" target="_blank" rel="noopener noreferrer">
              <img
                className="linkLogo"
                src="/reddit_share_circle_48.png"
                alt="snoo"
                data-tip="reddit"
              />
            </a>
            <a href="https://discord.gg/sHjshB" target="_blank" rel="noopener noreferrer">
              <img
                className="linkLogo"
                src="/Discord-Logo-White.png"
                alt="discord"
                data-tip="Community Discord"
              />
            </a>
            <a href="https://www.plug.game/kingsraid/" target="_blank" rel="noopener noreferrer">
              <img
                className="linkLogo"
                src="/Plug_Cafe_Logo.bmp"
                alt="plug.game"
                data-tip="Official Plug"
              />
            </a>
          </div>
        </div>
        <ReactTooltip border={true} />
      </div>
    </React.Fragment>
  );
};

export default Home;
