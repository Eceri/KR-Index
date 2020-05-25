import React, { useState, useEffect } from "react";

// Relative imports
import { Link } from "react-router-dom";
import {
  AWSoperation,
  listArtifacts,
  sortedSearch,
} from "./helpers/helpers.index";
import { Searchbar } from "Atoms";

export const NavBar = () => {
  const [artifacts, setArtifacts] = useState(
    JSON.parse(localStorage.getItem("Artifacts")) || []
  );
  useEffect(() => {
    AWSoperation(listArtifacts).then((artifacts) => {
      setArtifacts(sortedSearch(artifacts.data.listArtifacts.items, "name"));
    });
  }, []);

  return (
    <nav>
      <Link to={"/"} className={"navLink"}>
        <img
          src={`${require("Assets/icons/favicon.png")}`}
          alt={"favicon.png"}
          style={{ width: 24, border: "none" }}
        />
      </Link>
      <Link to={"/heroes/"} className="navLink">
        Heroes
      </Link>
      <Link to={"/artifacts"} className={"navLink"}>
        Artifacts
      </Link>
      <Searchbar artifacts={artifacts} />
    </nav>
  );
};

export default NavBar;
