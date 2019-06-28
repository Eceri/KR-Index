import React, {Component} from "react";
import {
    Route,
    BrowserRouter,
    NavLink,
    Switch
} from "react-router-dom";
import Home from "./home";
import Hero from "./Hero/Hero";
import Artifact from "./Artifacts/Artifact";
import "./styles/base.css";
import "./styles/KRCompendiumNav.css";
import heroes from "./classes/classes";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';


class Main extends Component {
    render() {
        return <BrowserRouter>
            <nav id={"sideNav"}>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/heroes"}>Heroes</NavLink>
                <Accordion className={"heroDiv"} allowZeroExpanded={true}>
                    {heroes.classes.map(heroClass => (
                            <AccordionItem>
                                <AccordionItemButton className={"heroClassButton"}>
                                    <span>{heroClass.class}<i className="down"/></span>
                                </AccordionItemButton>
                                <AccordionItemPanel>
                                    <div className={"heroContainer"}>
                                        {heroClass.heroes.map(hero =>
                                            <NavLink to={`/hero/${hero}`} className={"hero"}>
                                                {hero}
                                            </NavLink>)}
                                    </div>
                                </AccordionItemPanel>
                            </AccordionItem>
                        )
                    )} </Accordion>
                <NavLink to={"/artifacts"}>Artifacts</NavLink>
                <NavLink>Etc.</NavLink>
            </nav>
            <div id={"content"}>
                <Switch>
                    <Route exact={true} path="/" component={Home}/>
                    <Route path={"/hero/:hero"} component={Hero}/>
                    <Route path="/artifact/:artifact" component={Artifact}/>
                    <Route path="/artifacts" component={Artifact}/>
                    <Route path={"/etc"} component={Hero}/>
                </Switch>
            </div>
        </BrowserRouter>
    }
}

export default Main
