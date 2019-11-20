import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => (
  <nav id={"nav"}>
    <NavLink to={"/"} className={"navLink"}>
      <img
        src={require("./Assets/iconTest.png")}
        alt={"nagatoro.jpg"}
        style={{ width: 24, border: "none" }}
      />
    </NavLink>
    <NavLink to={"/heroes"} className="navLink">
      Heroes</NavLink>
    <NavLink to={"/artifacts"} className={"navLink"}>
      Artifacts
      </NavLink>
    <NavLink to={"/etc"} className={"navLink"}>
      Etc.
          </NavLink>
  </nav>
)
export default NavBar;
