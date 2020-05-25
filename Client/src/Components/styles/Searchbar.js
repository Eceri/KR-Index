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
`;

export const SearchInput = styled.input`
  margin-left: auto;
  width: ${searchWidth};
  padding-left: 0.5rem;

  &:focus {
    outline: none;
  }
`;
