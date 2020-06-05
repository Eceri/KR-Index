import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  padding: 1rem;
  height: 3rem;
  width: 100%;
  background-color: #262626;
`;

const renderNavbar = () => (
  <Nav>
    <NavLink to="/caps">Caps</NavLink>
  </Nav>
);

export const Guides = () => {
  return (
    <div>
      {renderNavbar()}
      <div id="content"></div>
    </div>
  );
};
