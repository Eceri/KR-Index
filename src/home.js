import React, { useEffect, useState, useGlobal } from "reactn";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

// Relative import
import { createHelmet } from "./helpers/helpers.helmet";
import "./Components/styles/home.css";
import { AWSoperation, listPlugPosts, AWSoperationLists } from "Helpers";

// Styling
const Announcement = styled.div`
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  height: 4rem;
  width: 100%;
  margin-bottom: 0.5rem;
  &:hover {
    cursor: pointer;
    background-color: #262626;
  }
  // background-color: #5d5d5d;
`;

const Title = styled.h3`
  padding: 1rem;
  padding-top: 1.2rem;
  position: relative;
  height: 100%;
  width: 100%;
  background: linear-gradient(to left, rgba(0, 0, 0, 0) 0px, #252525 400px);
  z-index: 2;
`;

const News = styled.div`
  padding: 1rem;
`;

const MovingImage = styled.img`
  position: relative;
  top: -4rem;
  float: right;
  // left: ${(props) => (props.big ? "71.3%" : "88%")};
  height: 100%;
  max-width: 112px;
`;

const _dataObj = {
  title: "",
  url: "",
  thumbnail: "",
};

const PlugGame = () => {
  const [active, setActive] = useState([_dataObj]);
  const [error, setError] = useGlobal("error");

  useEffect(() => {
    AWSoperationLists(listPlugPosts).then((res) =>
      setActive(res.sort((a, b) => b.timestamp - a.timestamp).slice(0, 9))
    );
  }, []);

  useEffect(() => {
    console.log("ERROR:------", error);
  }, [error]);

  const eventImage = (thumbnail) => {
    if (/(S_[\w]+_EN)/g.test(thumbnail)) return true;
    return false;
  };

  return (
    <News>
      <h2 style={{ marginBottom: "1.5rem" }}>News</h2>
      {active.length > 1 ? (
        active.map((_data) => (
          <Announcement
            key={_data.url}
            onClick={() => window.open(_data.url, "_blank")}
          >
            <Title>{_data.title}</Title>
            <MovingImage
              big={eventImage(_data.thumbnail)}
              src={_data.thumbnail}
            />
          </Announcement>
        ))
      ) : (
        <div className="loader"></div>
      )}
    </News>
  );
};

export const Home = () => {
  return (
    <React.Fragment>
<<<<<<< HEAD
    {createHelmet("KR Index", "Homepage")}
=======
      {createHelmet("King's Raid Index", "King's Raid Index landing Page")}
>>>>>>> 0a913e107fd3b86a14d83101636abcb58f929e2e
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
        {PlugGame()}
        <ReactTooltip border={true} />
      </div>
    </React.Fragment>
  );
};

export default Home;
