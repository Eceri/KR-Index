import React, {Component} from "react";
import {
    Route,
    HashRouter,
    NavLink,
    Switch
} from "react-router-dom";
import Hero from "./Components/Hero/Hero";
import Artifact from "./Components/Artifacts/Artifact";
import etc from "./etc";
import {HeroesMenu} from "./Components/components";
import {Maya} from "./Components/components"
class NavBar extends Component {
    render() {
        return <HashRouter>
            <nav id={"nav"}>
                <NavLink exact to={"/"} className={"navLink"}><img src={"/iconTest.png"} alt={"nagatoro.jpg"} style={{width: 24,}}/></NavLink>
                <HeroesMenu className={"navLink"} />
                <NavLink to={"/artifacts"} className={"navLink"}>Artifacts</NavLink>
                <NavLink to={"/etc"} className={"navLink"}>Etc.</NavLink>
            </nav>
            <Switch>
                <Route path={"/"}>
                    <Route push={true} path={"/hero/:hero"} component={Hero}/>
                    <Route path="/artifact/:artifact" component={Artifact}/>
                    <Route path="/artifacts" component={Artifact}/>
                    <Route path="/etc" component={etc}/>
                    <Route path={"/Maya"} component={Maya}/>
                    <IndexRedirect component={"/home"} />

                </Route>
            </Switch>
        </HashRouter>
    }
}

export default NavBar
