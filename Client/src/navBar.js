import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Hero from "./Components/Hero/Hero";
import Artifacts from "./Components/Artifacts/Artifacts";
import etc from "./etc";
import { HeroesMenu } from "./Components/components";
import { Maya } from "./Components/components";
class NavBar extends Component {
  render() {
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
        </nav>
        <Switch>
          <Route push={true} path={"/hero/:hero"} component={Hero} />
          <Route path="/artifact/:artifact" component={Artifacts} />
          <Route path="/artifacts" component={Artifacts} />
          <Route path="/etc" component={etc} />
          <Route path={"/Maya"} component={Maya} />
        </Switch>
      </div>
    );
  }
}

export default NavBar;
