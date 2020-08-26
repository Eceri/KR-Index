import React, { useState, useEffect, useRef } from "react";
import styles from "styled-components";

// Relative imports
import { NavLink } from "react-router-dom";
import {
  AWSoperation,
  listArtifacts,
  sortedSearch,
} from "./helpers/helpers.index";
import { Searchbar } from "Atoms";
import { ErrorState, INIT_BUILD } from "Constants";

const Arrow = styles.span`
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  ${(props) => {
    switch (props.direction) {
      case "right":
        return `transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);`;
      case "left":
        return `transform: rotate(135deg);
        -webkit-transform: rotate(135deg);`;
      case "up":
        return `transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);`;
      case "down":
        return `transform: rotate(45deg);
        -webkit-transform: rotate(45deg);`;
    }
  }}
`;

const Misc = styles.div`
  &:hover {
    cursor: pointer;
    background: black;
  }
  padding: 0.75rem;
  width: 5rem;
`;

const Items = styles.div`
  display: flex;
  flex-direction: column;
  background: #262626;
  align-items: center;
`;

const DropdownLink = styles((props) => <NavLink {...props} />)`
  padding: 0.75rem;
  width: 100%;
  height: 100%;
`;

const Dropdown = (show, setShow, direction) => {
  const handleClick = () => {
    setShow(!show);
  };

  const renderShow = () =>
    show && (
      <Items>
        {/* <DropdownLink
          to={"/guides"}
          className={"navLink"}
          onClick={() => handleClick()}
        >
          Guides
        </DropdownLink> */}
        <DropdownLink
          to={"/caps"}
          className={"navLink"}
          onClick={() => handleClick()}
        >
          Caps
        </DropdownLink>
        <DropdownLink
          to={`/perks/Kasel#${INIT_BUILD}`}
          className={"navLink"}
          onClick={() => handleClick()}
        >
          Perks
        </DropdownLink>
      </Items>
    );

  return (
    <div>
      <Misc onClick={() => handleClick()}>
        Misc <Arrow direction={direction} style={{ marginLeft: "0.2rem" }} />
      </Misc>
      {renderShow()}
    </div>
  );
};

export const NavBar = (page) => {
  const [artifacts, setArtifacts] = useState(
    JSON.parse(localStorage.getItem("Artifacts")) || []
  );
  const [show, setShow] = useState(false);
  const [direction, setDirection] = useState("down");

  const miscRef = useRef();

  const handleClickOutside = (event) => {
    if (miscRef.current.contains(event.target)) {
      return;
    }
    setShow(false);
  };

  useEffect(() => {
    AWSoperation(listArtifacts).then((artifacts) => {
      setArtifacts(sortedSearch(artifacts.data.listArtifacts.items, "name"));
    });
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (show) {
      setDirection("up");
    } else {
      setDirection("down");
    }
  }, [show]);

  const handleError = () => {
    page.setError(ErrorState);
  };

  return (
    <nav ref={miscRef}>
      <NavLink to={"/"} className={"navLink"} onClick={() => handleError()}>
        <img
          src={`${require("Assets/icons/favicon.png")}`}
          alt={"favicon.png"}
          style={{ width: 24, border: "none" }}
        />
      </NavLink>
      <NavLink to={"/heroes"} className="navLink" onClick={() => handleError()}>
        Heroes
      </NavLink>
      <NavLink
        to={"/artifacts"}
        className={"navLink"}
        onClick={() => handleError()}
      >
        Artifacts
      </NavLink>
      {Dropdown(show, setShow, direction, setDirection)}
      <Searchbar artifacts={artifacts} />
    </nav>
  );
};

export default NavBar;
