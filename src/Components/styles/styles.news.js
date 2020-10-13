import React from "react";
import styled, { css, keyframes } from "styled-components";
import { Tab } from "react-tabs";

import { colors } from "./styles.colors";

import { Button } from "Atoms";

const colorPicker = ({ name, type }) => {
  if (name === "" || type === "") {
    return "";
  }
  const text = name
    .toLowerCase()
    .replace(/[!’´`'-]/g, "")
    .replace(/\//g, " ");
  let nameToColor = text.split(" ");
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
  return colors.News[type][nameToColor];
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
    border-color: white;
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

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

const animation = (props) => css`
  1s ${fadeIn} linear
`;

export const News = styled.div`
  padding: 1rem;
  @media only screen and (max-width: 650px) {
    padding: 0;
  }
  .active_TabPanel {
    animation: ${animation};
  }
  .active_TabList {
    animation: ${animation};
    background: dimgray;
  }
`;

export const MovingImage = styled.img`
  height: 100%;
  width: 15rem;
  object-fit: cover;
  @media only screen and (max-width: 650px) {
    min-wdith: 5rem;
    max-width: 33%;
    object-position: 40% 0;
  }
`;

export const SmallTab = styled((props) => <Tab {...props} />)`
  width: 20%;
  list-style: none;
  padding: 0.3rem;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

SmallTab.tabsRole = "Tab";

export const LoadMoreButton = styled((props) => <Button {...props} />)`
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem;
  margin-top: 1rem;

  &:hover {
    transform: scale(1.1);
  }
`;
