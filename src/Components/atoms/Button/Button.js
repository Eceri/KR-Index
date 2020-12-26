import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  display: flex;
  width: ${(props) => (props.size ? props.size : "")};
  background-color: ${(props) => (props.icon ? "transparent" : "#5e5e5e")};
  color: white;
  border: 1px solid transparent;
  padding: 0.3rem;
  &:hover {
    cursor: pointer;
    ${(props) =>
      props.icon
        ? "-webkit-text-stroke: 0.4px #303030"
        : "box-shadow: -1px -1px 9px #303030;"}
  }
  &:focus {
    outline: none;
  }
  vertical-align: middle;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Icon = styled.img`
  display: ${(props) => (props.show ? "block" : "none")};
  width: 0.75rem;
  border: 0px solid transparent;
  filter: invert(100%);
  margin-right: 0.2rem;
`;

export const Button = (props) => {
  let { icon, children } = props;
  switch (icon) {
    case "clipboard":
      icon = "https://img.icons8.com/material/24/000000/copy--v1.png";
      break;
    default:
      break;
  }
  return (
    <ButtonStyle {...props}>
      <Icon src={icon} show={icon} /> <span>{children}</span>
    </ButtonStyle>
  );
};
