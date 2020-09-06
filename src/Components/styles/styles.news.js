import React from "react";
import styled from "styled-components";
import { Tab } from "react-tabs";

const purple = "#4b2665";
const guide = "#f0e7d3";
const maintenance = "#ff7b00";
const gg = "#4867aa";
const teal = "#00c9b0";
const events = "#FF72C0";
const specialShop = "#8D488D";
const colors = {
  notices: {
    notice: "white",
    maintenanceNotice: "#c7ced4",
    emergencyMaintenanceComplete: maintenance,
    emergencyMaintenance: maintenance,
    maintenanceCompleted: "#ffc100",
    extendedMaintenance: maintenance,
  },
  patches: {
    patchNote: teal,
    gameGuide: gg,
  },
  content: {
    kingsRaidVod: purple,
    gmNote: "darkblue",
    vod: purple,
    guide: guide,
    teaser: purple,
    developersNote: "darkblue",
  },
  events: {
    event: events,
    facebookTwitter: events,
  },
  shop: {
    specialShopUpdate: specialShop,
    specialShop: specialShop,
  },
};

const colorPicker = (border) => {
  let { name, type } = border;
  if (name === "" || type === "") {
    return "";
  }
  const test = name.toLowerCase().replace(/[!’´`'-]/g, "");
  let nameToColor = test.split(" ");
  nameToColor = nameToColor
    .map((v, i) => {
      if (i > 0) {
        return `${v.charAt(0).toUpperCase()}${v.slice(1)}`;
      } else {
        return v;
      }
    })
    .join("");
  type = `${type.charAt(0).toLowerCase()}${type.slice(1)}`;
  return colors[type][nameToColor];
};

// Styling
export const Announcement = styled.div`
  display: flex;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  height: 4rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(to left, rgba(0, 0, 0, 0) 0px, #252525 400px);
  &:hover {
    cursor: pointer;
    background-color: #262626;
  }
  border: 2px solid transparent;
  border-left-color: ${(props) => colorPicker(props.borderColor)};
`;

export const Title = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TitleType = styled.div`
  @media only screen and (max-width: 650px) {
    font-size: 0.8rem;
  }
`;

export const TextContainer = styled.div`
  // padding: 1rem;
  display: flex;
  flex-direction: column;
  min-width: calc(18rem - 5rem);
  padding: 0.3rem;
  flex-grow: 1;
  @media only screen and (max-width: 650px) {
    font-size: 0.9rem;
    width: calc(20rem - 5rem);
  }
`;

export const News = styled.div`
  padding: 1rem;
  @media only screen and (max-width: 650px) {
    padding: 0;
  }
`;

export const SmallTab = styled((props) => <Tab {...props} />)`
  width: 4rem;
  list-style: none;
  padding: 0.3rem;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
  @media only screen and (max-width: 650px) {
    font-size: 1rem;
  }
`;

SmallTab.tabsRole = "Tab";

export const MovingImage = styled.img`
  height: 100%;
  width: 240px;
  @media only screen and (max-width: 650px) {
    max-width: 5rem;
    object-fit: cover;
    object-position: 40% 0;
  }
`;
