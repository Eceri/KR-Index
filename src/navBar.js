import React, { useState, useEffect } from "react";

// Relative imports
import { Link } from "react-router-dom";
import {
  AWSoperation,
  listArtifacts,
  sortedSearch,
} from "./helpers/helpers.index";
import { Searchbar } from "Atoms";

export const NavBar = (page) => {
  const [artifacts, setArtifacts] = useState(
    JSON.parse(localStorage.getItem("Artifacts")) || []
  );
  useEffect(() => {
    AWSoperation(listArtifacts).then((artifacts) => {
      setArtifacts(sortedSearch(artifacts.data.listArtifacts.items, "name"));
    });
  }, []);

  const handleError = () => {
    page.setError("");
  };

  return (
    <nav>
      <Link to={"/"} className={"navLink"} onClick={() => handleError()}>
        <img
          src={`${require("Assets/icons/favicon.png")}`}
          alt={"favicon.png"}
          style={{ width: 24, border: "none" }}
        />
      </Link>
      <Link to={"/heroes"} className="navLink" onClick={() => handleError()}>
        Heroes
      </Link>
      <Link
        to={"/artifacts"}
        className={"navLink"}
        onClick={() => handleError()}
      >
        Artifacts
      </Link>
      <Link to={"/guides"} className={"navLink"} onClick={() => handleError()}>
        Guides
      </Link>
      <Link
        to={"/perks/Kasel/00000-00000-0000-0000-00"}
        className={"navLink"}
        onClick={() => handleError()}
      >
        Perks
      </Link>
      <Searchbar artifacts={artifacts} />
    </nav>
  );
};

export default NavBar;
