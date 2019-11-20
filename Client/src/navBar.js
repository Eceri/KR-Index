import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Hero from "./Components/Hero/Hero";
import Artifacts from "./Components/Artifacts/Artifacts";
import Etc from "./Etc";
import { HeroesMenu, Heroes } from "./Components/components";
import { Maya } from "./Components/components";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [artifactNames, setArtifactNames] = useState([]);

  useEffect(() => {
    fetch(`https://krc-api.herokuapp.com/api/artifacts/`)
      .then(res => {
        return res.json();
      })
      .then(data => setArtifactNames(data.map(v => v.name)));
  }, []);

  const artifactNamesfilter = (names, query) => {
    console.log(names, query);
    return names.filter(v => v.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <div>
      <nav id={"nav"}>
        <Link to={"/"} className={"navLink"}>
          <img
            src={require("./Assets/iconTest.png")}
            alt={"nagatoro.jpg"}
            style={{ width: 24, border: "none" }}
          />
        </Link>
        <HeroesMenu className={"navLink"} />
        <Link to={"/artifacts"} className={"navLink"}>
          Artifacts
        </Link>
        <Link to={"/etc"} className={"navLink"}>
          Etc.
        </Link>
        <Link to={"/heroes"} className="navLink">
          Heroes(Temp)
        </Link>
        <input
          placeholder="Filter..."
          onChange={e => setSearchQuery(e.currentTarget.value)}
          value={searchQuery}
        />
        <div style={{ backgroundColor: "white", color: "black" }}>
          {artifactNamesfilter(artifactNames, searchQuery)}
        </div>
      </nav>
      <Switch>
        <Route push={true} path="/hero/:hero" component={Hero} />
        <Route path="/artifact/:artifact" component={Artifacts} />
        <Route path="/artifacts" component={Artifacts} />
        <Route path="/etc" component={Etc} />
        <Route path="/Maya" component={Maya} />
        <Route path="/Heroes" component={Heroes} />
      </Switch>
    </div>
  );
};

export default NavBar;
