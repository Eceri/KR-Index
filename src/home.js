import React, { useEffect, useState, useGlobal, useRef } from "reactn";
import ReactTooltip from "react-tooltip";
import { Tabs, TabList, TabPanel } from "react-tabs";

// Relative import
import { createHelmet } from "./helpers/helpers.helmet";
import "./Components/styles/home.css";
import { AWSoperation, typePlugsByOrder } from "Helpers";
import {
  Announcement,
  Title,
  TitleType,
  TextContainer,
  News,
  SmallTab,
  MovingImage,
} from "Styles";
import { NEWS_DEFAULT, DB_PLUG_TYPES } from "Constants";

// Frontend Variable
const plugTypes = ["Notices", "Patches", "Content", "Events", "Shop"];

// Helper functions
const resizeTitle = (title) => {
  const text = title.split("]");

  return text[1];
};

const typeOfTitle = (title) => {
  const text = title.split("]");

  const type = text[0].replace("[", "");
  return type;
};

const dataSuffix = (res) => {
  return res["data"]["typePlugsByOrder"]["items"];
};

// render function
const PlugGamePosts = () => {
  //  States
  const [active, setActive] = useState([NEWS_DEFAULT]);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    AWSoperation(typePlugsByOrder, { type: DB_PLUG_TYPES[tabIndex] }).then(
      (res) => {
        setActive(dataSuffix(res));
      }
    );
  }, [tabIndex]);

  return (
    <News>
      <h2 style={{ marginBottom: "1.5rem" }}>News</h2>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          {plugTypes.map((type) => (
            <SmallTab key={type}>{type}</SmallTab>
          ))}
        </TabList>
        {plugTypes.map((type) => (
          <TabPanel key={type}>
            {active.map((notice) => (
              <Announcement
                key={notice.url}
                onClick={() => window.open(notice.url, "_blank")}
                borderColor={{ name: typeOfTitle(notice.title), type: type }}
              >
                <TextContainer>
                  <TitleType>{typeOfTitle(notice.title)}</TitleType>
                  <Title>{resizeTitle(notice.title)}</Title>
                </TextContainer>
                <MovingImage src={notice.thumbnail} />
              </Announcement>
            ))}
          </TabPanel>
        ))}
      </Tabs>
    </News>
  );
};

// Main
export const Home = () => {
  // Globals
  const [error, setError] = useGlobal("error");

  useEffect(() => {
    console.log("ERROR:------", error);
  }, [error]);

  return (
    <React.Fragment>
      {createHelmet("King's Raid Index", "King's Raid Index News")}
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
        <PlugGamePosts />
        <ReactTooltip border={true} />
      </div>
    </React.Fragment>
  );
};

export default Home;
