import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

// Relative import
import { createHelmet } from "./helpers/helpers.helmet";
import "./Components/styles/home.css";
import { AWSoperation, listPlugPosts } from "Helpers";

// Styling
const Announcement = styled.div`
  border-radius: 0.5rem;
  min-height: 10rem;
  border: 1px solid white;
  background-color: #5d5d5d;
  padding: 0.5rem;
  width: 70%;
  margin: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 2px 2px 3px black;
  &:hover {
    cursor: pointer;
    background-color: #262626;
  }
`;

const _dataObj = {
  title: "",
  description: "",
  url: "",
  timestamp: "",
  author: {
    name: "",
    url: "",
    icon_url: "",
  },
  thumbnail: "",
};

const PlugGame = () => {
  const [active, setActive] = useState([_dataObj]);

  useEffect(() => {
    let nextToken = "";
    let items = [];
    const asyncFetch = async () => {
      do {
        const result = await AWSoperation(listPlugPosts, { nextToken });
        nextToken = result.data.listPlugGames.nextToken;
        items = items.concat(result.data.listPlugGames.items);
      } while (nextToken);
      return items;
    };
    asyncFetch().then((res) =>
      setActive(res.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5))
    );
  }, []);

  return (
    <>
      {active.length > 1 ? (
        active.map((_data) => (
          <Announcement
            key={_data.url}
            onClick={() => window.open(_data.url, "_blank")}
          >
            <div style={{ paddingBottom: "0.5rem" }}>
              <h3 style={{ paddingBottom: "0.5rem" }}>{_data.title}</h3>
              <img style={{ maxHeight: "8rem" }} src={_data.thumbnail} />
            </div>
          </Announcement>
        ))
      ) : (
        <div className="loader"></div>
      )}
    </>
  );
};

export const Home = () => {
  return (
    <React.Fragment>
      {createHelmet("Home", "Homepage")}
      <div>
        <h1>Welcome to the King's Raid Index</h1>
        <div id="welcome">
          <div>
            <p>This page is a Database for the mobile game King's Raid.</p>
            <p>
              King's Raid (Korean: 킹스레이드) is a free-to-play side-scrolling
              RPG mobile game developed by South Korean game developer Vespa. It
              was first released on September 19, 2016 for operating systems
              Android and iOS in Thailand. The global version consists of 3
              servers, which were opened on February 16, 2017.
            </p>
          </div>
          <div id="communityLinks">
            <p>Community Links:</p>
            <a
              href="https://www.reddit.com/r/Kings_Raid/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="linkLogo"
                src={`${require("Assets/icons/reddit_share_circle_48.png")}`}
                alt="snoo"
                data-tip="reddit"
              />
            </a>
            <a
              href="https://discord.gg/sHjshB"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="linkLogo"
                src={`${require("Assets/icons/Discord-Logo-White.png")}`}
                alt="discord"
                data-tip="Community Discord"
              />
            </a>
            <a
              href="https://www.plug.game/kingsraid/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="linkLogo"
                src={`${require("Assets/icons/Plug_Cafe_Logo.bmp")}`}
                alt="plug.game"
                data-tip="Official Plug"
              />
            </a>
          </div>
        </div>
        <h2>News</h2>
        {PlugGame()}
        <ReactTooltip border={true} />
      </div>
    </React.Fragment>
  );
};

export default Home;
