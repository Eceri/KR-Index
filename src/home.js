import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { Tabs, TabList, TabPanel } from "react-tabs";
import { useDrag } from "react-use-gesture";

// Relative import
import "./Components/styles/home.css";
import {
  Announcement,
  Title,
  TitleType,
  TextContainer,
  News,
  MovingImage,
  SmallTab,
  LoadMoreButton,
} from "Styles";

import { AWSoperation, typePlugsByOrder, allTempNewsByOrder } from "Aws";
import { useWindowDimensions, createHelmet, useDebounce } from "Helpers";
import { NEWS_DEFAULT, DB_PLUG_TYPES } from "Constants";
import { Button } from "Atoms";
import styled from "styled-components";

// Frontend Variable
const plugTypes = ["Notices", "Patches", "Content", "Events", "Shop"];
const GM_NOTE =
  "https://g-plug.pstatic.net/20200915_97/16001363921830R2Dl_PNG/S_GMNote_EN_NoSub.png?type=lfa686_320";

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

  // Load more News
  const [fetch, setFetch] = useState(true);
  const [next, setNext] = useState(null);
  const [fetchable, setFetchable] = useState(true);

  // Toggle archive
  const [showArchive, setShowArchive] = useState(false);
  const debouncedToggle = useDebounce(showArchive, 700);

  // Mobile
  const { isMobile } = useWindowDimensions();

  useEffect(() => {
    setNext(null);
    setFetch(true);
  }, [showArchive]);

  useEffect(() => {
    if (fetch) {
      const params = showArchive
        ? {
          type: DB_PLUG_TYPES[tabIndex],
          nextToken: next,
        }
        : {
          nextToken: next,
        };
      const operation = showArchive ? typePlugsByOrder : allTempNewsByOrder;
      AWSoperation(operation, params).then(({ items, nextToken }) => {
        const active = activeNews.length > 2 ? activeNews.concat(items) : items;
        setActiveNews(active);
        setNext(nextToken);
        if (nextToken === null) {
          setFetchable(false);
        }
      });
      setFetch(false);
    }
  }, [tabIndex, fetch]);

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

  const renderArchive = () => (
    <>
      <Tabs
        selectedTabClassName={"active_TabList"}
        selectedTabPanelClassName={"active_TabPanel"}
        selectedIndex={tabIndex}
        onSelect={(index) => {
          setTabIndex(index);
          setFetch(true);
          setFetchable(true);
          setNext(null);
          setActiveNews([NEWS_DEFAULT]);
        }}
        {...bindSwipe()}
      >
        <TabList>
          {plugTypes.map((type) => (
            <SmallTab key={type}>{type}</SmallTab>
          ))}
        </TabList>
        {plugTypes.map((type) => (
          <TabPanel key={type}>
            {activeNews.map(({ url, title, thumbnail }) => (
              <Announcement
                key={url}
                onClick={() => window.open(url, "_blank")}
                borderColor={{ name: typeOfTitle(title), archive: true }}
              >
                <TextContainer>
                  <TitleType>{typeOfTitle(title)}</TitleType>
                  <Title>{resizeTitle(title)}</Title>
                </TextContainer>
                <MovingImage
                  src={thumbnail.startsWith("http:") ? "" : thumbnail}
                  alt={`${typeOfTitle(title)} - picture`}
                />
              </Announcement>
            ))}
          </TabPanel>
        ))}
      </Tabs>
      {fetchable && activeNews.length > 2 ? (
        <LoadMoreButton onClick={() => setFetch(true)}>
          Load more News
        </LoadMoreButton>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "0.5rem",
            marginTop: "1rem",
            border: "1px solid transparent",
            borderTopColor: "#262626",
          }}
        >
          End of list
        </div>
      )}
    </>
  );

  return (
    <News>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ marginBottom: "1.5rem" }}>
          {showArchive ? "Archive" : "News"}
        </h2>
        {/* <Button
          disabled={debouncedToggle !== showArchive}
          style={{ height: "2rem", width: "3.5rem" }}
          onClick={() => {
            setShowArchive(!showArchive);
            setActiveNews([NEWS_DEFAULT]);
          }}
        >
          {showArchive ? "News" : "Archive"}
        </Button> */}
      </div>
      {showArchive ? (
        renderArchive()
      ) : (
        <div>
          {activeNews.map(({ title, url, type }) => (
            <Announcement
              key={url}
              onClick={() => window.open(url, "_blank")}
              borderColor={{ name: type }}
            >
              <TextContainer>
                <TitleType>{typeOfTitle(title)}</TitleType>
                <Title>{resizeTitle(title)}</Title>
              </TextContainer>
            </Announcement>
          ))}
          {fetchable && activeNews.length > 2 ? (
            <LoadMoreButton onClick={() => setFetch(true)}>
              Load more News
            </LoadMoreButton>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "0.5rem",
                marginTop: "1rem",
                border: "1px solid transparent",
                borderTopColor: "#262626",
              }}
            >
              End of list
            </div>
          )}
        </div>
      )}
    </News>
  );
};

// Main
export const Home = () => {
  const ContentContainer = styled.div`
    h2,
    h1 {
      text-align: center;
      margin: .5rem 0;
    }
  `;
  //nth-child-selector will have to be adjusted if # of links changes.
  const LinkContainer = styled.div`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    
    @media (max-width: 25.5em) {
      a:nth-last-child(-n+2) {
        grid-column: span 2;
      }
    }

  `;

  const circleIconClassName = `img-border-radius-circle`;
  //create template Link to be used as base for styled component.
  const communityLinkTemplate = (props) => {
    return <a
      className={props.className}
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      data-tip={props.dataTip}
    >
      <img
        src={`${props.icon}`}
        className={props.circleIcon && circleIconClassName}
      />
      {props.children}
    </a>
  };
  const CommunityLink = styled(communityLinkTemplate)`
    background-color: #262626 ;
    display: flex;
    flex-direction: row;
    flex: 100%;
    gap: .5rem;
    padding: .5rem;
    align-items: center;
    border-radius: .25rem;
    
    img {
      height: 3rem;
      width: auto;
      border: none;
    }
    .${circleIconClassName} {
      border-radius: 50%;
    }
    p {
      padding: 0 .5rem;
    }
  `;
  return (
    <>
      {createHelmet("King's Raid Index", "King's Raid Index News")}
      <ContentContainer>
        <h1>Welcome to the KRI</h1>
        <div>
          <p>This page is a Database for the mobile game King's Raid.</p>
          <p style={{ paddingTop: ".5rem" }}>
            King's Raid (Korean: 킹스레이드) is a free-to-play side-scrolling
            RPG mobile game developed by South Korean game developer Vespa. It
            was first released on September 19, 2016 for operating systems
            Android and iOS in Thailand. The global version consists of 3
            servers, which were opened on February 16, 2017.
          </p>
        </div>
        <hr />
        <h2>Community Links</h2>
        <LinkContainer>
          <CommunityLink
            circleIcon
            icon={"/assets/icons/kr_official_icon.png"}
            dataTip={"Official Website"}
            href={"https://kr-official.community/"}
          >
            Official Website
          </CommunityLink>
          <CommunityLink
            icon={"/assets/icons/Discord-Logo-White.png"}
            dataTip={"Official Discord Server"}
            href={"https://discord.gg/FgzqsYzU4A"}
          >
            Official Discord
          </CommunityLink>
          <CommunityLink
            icon={"/assets/icons/reddit_share_circle_48.png"}
            dataTip={"Community sub"}
            href={"https://www.reddit.com/r/Kings_Raid/"}
          >
            Reddit Community
          </CommunityLink>
          <CommunityLink
            circleIcon
            icon={"/assets/icons/KRE_icon.png"}
            dataTip={"Community discord for Guides, Discussions, and everything"}
            href={"https://discord.gg/kre"}
          >
            KRE Community Discord Server
          </CommunityLink>
        </LinkContainer>
        <hr />
        <PlugGamePosts />
        <ReactTooltip border={true} />
      </ContentContainer>
    </>
  );
};

export default Home;
