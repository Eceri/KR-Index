import React, {Component} from "react";
import {
    Route,
    BrowserRouter,
    NavLink,
    Switch
} from "react-router-dom";
import Home from "./home";
import Hero from "./Components/Hero/Hero";
import Artifact from "./Components/Artifacts/Artifact";
import etc  from "./etc";
import "./Components/styles/base.css";
import "./Components/styles/nav.css";
import heroes from "./Assets/classes/classes";

import {HeroesMenu} from "./Components/components";

class Main extends Component {
    render() {
        return <BrowserRouter>
            <nav id={"nav"}>
                <NavLink exact to={"/"}>Home</NavLink>
                <HeroesMenu heroes={heroes}/>
                <NavLink to={"/artifacts"}>Artifacts</NavLink>
                <NavLink to={"/etc"}>Etc.</NavLink>
            </nav>
            <Switch>
                <Route path="/" component={Home} >
                    <Route push={true} path={"/hero/:hero"} component={Hero}/>
                    <Route path="/artifact/:artifact" component={Artifact}/>
                    <Route path="/artifacts" component={Artifact}/>
                    <Route path="/etc" component={etc}/>
                </Route>
            </Switch>
        </BrowserRouter>
    }
}

export default Main
