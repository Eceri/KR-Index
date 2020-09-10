import React, { useEffect, useState, useGlobal } from "reactn";
import ReactTooltip from "react-tooltip";
import { Tabs, TabList, TabPanel } from "react-tabs";
import { useDrag } from "react-use-gesture";

// Relative import
import { createHelmet } from "./helpers/helpers.helmet";
import "./Components/styles/home.css";
import { AWSoperation, typePlugsByOrder } from "Aws";
import { useWindowDimensions } from "Helpers";
import {
  Announcement,
  Title,
  TitleType,
  TextContainer,
  News,
  MovingImage,
  SmallTab,
} from "Styles";
import { NEWS_DEFAULT, DB_PLUG_TYPES } from "Constants";

// Frontend Variable
const plugTypes = ["Notices", "Patches", "Content", "Events", "Shop"];

// Helper functions
const resizeTitle = (title) => {
  const text = title.split("]");

  return text.slice(1).join("]");
};

const typeOfTitle = (title) => {
  const text = title.split("]");

  const type = text[0].replace("[", "");
  return type;
};

// render function
const PlugGamePosts = () => {
  //  States
  const [activeNews, setActiveNews] = useState([NEWS_DEFAULT]);
  const [tabIndex, setTabIndex] = useState(0);
  const { isMobile } = useWindowDimensions();

  useEffect(() => {
    AWSoperation(typePlugsByOrder, { type: DB_PLUG_TYPES[tabIndex] }).then(
      (news) => {
        setActiveNews(news);
      }
    );
  }, [tabIndex]);

  const bindSwipe = useDrag(({ vxvy: [vx], last }) => {
    if (!isMobile) {
      return null;
    }
    if (last && vx < 0.3) {
      // Swipe Left
      if (tabIndex < plugTypes.length - 1) {
        setTabIndex(tabIndex + 1);
      }
    } else if (last && vx > 0.3) {
      // Swipe Right
      if (tabIndex > 0) {
        setTabIndex(tabIndex - 1);
      }
    }
  });

  return (
    <News>
      <h2 style={{ marginBottom: "1.5rem" }}>News</h2>
      <Tabs
        selectedTabClassName={"active_TabList"}
        selectedTabPanelClassName={"active_TabPanel"}
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
        {...bindSwipe()}
      >
        <TabList>
          {plugTypes.map((type) => (
            <SmallTab key={type}>{type}</SmallTab>
          ))}
        </TabList>
        {plugTypes.map((type) => (
          <TabPanel key={type}>
            {activeNews.map((active) => (
              <Announcement
                key={active.url}
                onClick={() => window.open(active.url, "_blank")}
                borderColor={{ name: typeOfTitle(active.title), type: type }}
              >
                <TextContainer>
                  <TitleType>{typeOfTitle(active.title)}</TitleType>
                  <Title>{resizeTitle(active.title)}</Title>
                </TextContainer>
                <MovingImage src={active.thumbnail} />
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
    <>
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
    </>
  );
};

export default Home;
