import React, { useState, useEffect, useRef } from "react";
import styles from "styled-components";

// Relative imports
import { NavLink } from "react-router-dom";
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

const Tools = styles.div`
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
      <Tools onClick={() => handleClick()}>
        Tools <Arrow direction={direction} style={{ marginLeft: "0.2rem" }} />
      </Tools>
      {renderShow()}
    </div>
  );
};

export const NavBar = (page) => {
  const [show, setShow] = useState(false);
  const [direction, setDirection] = useState("down");
  const [mobileSearch, setMobileSearch] = useState(false);

  const miscRef = useRef();

  const handleClickOutside = (event) => {
    if (miscRef.current.contains(event.target)) {
      return;
    }
    setShow(false);
  };

  useEffect(() => {
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
          src={"/assets/icons/favicon.png"}
          alt={"favicon"}
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
      {mobileSearch ? (
        <></>
      ) : (
        <>{Dropdown(show, setShow, direction, setDirection)}</>
      )}
      <Searchbar setMobileSearch={setMobileSearch} />
    </nav>
  );
};

export default NavBar;
