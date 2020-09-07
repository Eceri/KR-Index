import styled from "styled-components";
import { NavLink } from "react-router-dom";

const searchWidth = "16rem";

export const SearchBox = styled.div`
  width: ${searchWidth};
  background-color: white;
  color: black;
  position: absolute;
  overflow: auto;
  z-index: 2;
  right: 0;
  top: 3rem;
`;

export const SearchListElement = styled(NavLink)`
  list-style-type: none;
  display: block;
  cursor: pointer;
  padding-left: 0.5rem;
  color: black;

  &:hover {
    background-color: #71b9f5;
  }
  background-color: ${(props) => props.selected && "#71b9f5"};
`;

export const SearchInput = styled.input`
  margin-left: auto;
  width: ${searchWidth};
  height: 100%;
  padding-left: 0.5rem;

  &:focus {
    outline: none;
  }
  display: ${(props) => (props.isMobile ? "none" : "")};
  // @media only screen and (max-width: 480px) {
  //   display: none;
  // }
`;

export const Filterbox = styled.input`
  background-color: #303030;
  padding: 0.3rem;
  color: white;
  &::placeholder {
    color: white;
  }
  border: 1px solid transparent;

  &:focus {
    box-shadow: -1px -1px 9px white;
    outline: none;
  }

  &:hover {
    box-shadow: -1px -1px 9px #303030;
  }
`;
