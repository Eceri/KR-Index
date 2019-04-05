import React, {Component} from "react";
import {
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import Home from "./home";
import Hero from "./Hero";
import Artifact from "./artifact";
import "./styles/KRCompendiumNav.css";


class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav id="cssmenu">
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink>Events</NavLink></li>
                            <li><NavLink>Heroes</NavLink></li>
                            <li className="navClass" aria-current="true" activeClassName="active">
                                <NavLink to="/hero">Knights</NavLink>
                                <ul className="classesSubmenu">
                                    <li><NavLink to="/hero/Aselica">Aselica</NavLink></li>
                                    <li><NavLink to="/hero/Clause">Clause</NavLink></li>
                                    <li><NavLink to="/hero">Demia</NavLink></li>
                                    <li><NavLink to="/hero">Dosarta</NavLink></li>
                                    <li><NavLink to="/hero">Jane</NavLink></li>
                                    <li><NavLink to="/hero">Loman</NavLink></li>
                                    <li><NavLink to="/hero">Morrah</NavLink></li>
                                    <li><NavLink to="/hero">Neraxis</NavLink></li>
                                    <li><NavLink to="/hero">Phillop</NavLink></li>
                                    <li><NavLink to="/hero">Ricardo</NavLink></li>
                                    <li><NavLink to="/hero">Sonia</NavLink></li>
                                </ul>
                            </li>
                            <li className="navClass">
                                <NavLink>Warriors</NavLink>
                                <ul className="classesSubmenu">
                                    <li><NavLink to="/hero">Chase</NavLink></li>
                                    <li><NavLink to="/hero">Gau</NavLink></li>
                                    <li><NavLink to="/hero">Kasel</NavLink></li>
                                    <li><NavLink to="/hero">Naila</NavLink></li>
                                    <li><NavLink to="/hero">Nikky</NavLink></li>
                                    <li><NavLink to="/hero">Priscilla</NavLink></li>
                                    <li><NavLink to="/hero">Scarlet</NavLink></li>
                                    <li><NavLink to="/hero">Seria</NavLink></li>
                                    <li><NavLink to="/hero">Theo</NavLink></li>
                                    <li><NavLink to="/hero">Viska</NavLink></li>
                                </ul>
                            </li>
                            <li className="navClass">
                                <NavLink>Assassins</NavLink>
                                <ul className="classesSubmenu">
                                    <li><NavLink to="/hero/Epis">Epis</NavLink></li>
                                    <li><NavLink to="/hero">Erze</NavLink></li>
                                    <li><NavLink to="/hero">Ezekiel</NavLink></li>
                                    <li><NavLink to="/hero">Fluss</NavLink></li>
                                    <li><NavLink to="/hero">Gladi</NavLink></li>
                                    <li><NavLink to="/hero">Laudia</NavLink></li>
                                    <li><NavLink to="/hero">Mirianne</NavLink></li>
                                    <li><NavLink to="/hero">Nia</NavLink></li>
                                    <li><NavLink to="/hero">Reina</NavLink></li>
                                    <li><NavLink to="/hero">Roi</NavLink></li>
                                    <li><NavLink to="/hero">Tanya</NavLink></li>
                                </ul>
                            </li>
                            <li className="navClass">
                                <NavLink>Archers</NavLink>
                                <ul className="classesSubmenu">
                                    <li><NavLink to="/hero">Arch</NavLink></li>
                                    <li><NavLink to="/hero">Dimael</NavLink></li>
                                    <li><NavLink to="/hero">Luna</NavLink></li>
                                    <li><NavLink to="/hero">Requina</NavLink></li>
                                    <li><NavLink to="/hero">Selene</NavLink></li>
                                    <li><NavLink to="/hero">Shamilla</NavLink></li>
                                    <li><NavLink to="/hero">Yanne</NavLink></li>
                                    <li><NavLink to="/hero">Zafir</NavLink></li>
                                </ul>
                            </li>
                            <li className="navClass">
                                <NavLink>Mechanics</NavLink>
                                <ul className="classesSubmenu">
                                    <li><NavLink to="/hero">Annette</NavLink></li>
                                    <li><NavLink to="/hero">Chrisha</NavLink></li>
                                    <li><NavLink to="/hero">Crow</NavLink></li>
                                    <li><NavLink to="/hero">Kara</NavLink></li>
                                    <li><NavLink to="/hero">Lakrak</NavLink></li>
                                    <li><NavLink to="/hero">Miruru</NavLink></li>
                                    <li><NavLink to="/hero">Mitra</NavLink></li>
                                    <li><NavLink to="/hero">Oddy</NavLink></li>
                                    <li><NavLink to="/hero">Rodina</NavLink></li>
                                </ul>
                            </li>
                            <li className="navClass">
                                <NavLink>Wizards</NavLink>
                                <ul className="classesSubmenu">
                                    <li><NavLink to="/hero">Aisha</NavLink></li>
                                    <li><NavLink to="/hero">Artemia</NavLink></li>
                                    <li><NavLink to="/hero">Cleo</NavLink></li>
                                    <li><NavLink to="/hero">Esker</NavLink></li>
                                    <li><NavLink to="/hero">Lewisia</NavLink></li>
                                    <li><NavLink to="/hero">Lilia</NavLink></li>
                                    <li><NavLink to="/hero">Lorraine</NavLink></li>
                                    <li><NavLink to="/hero">Maria</NavLink></li>
                                    <li><NavLink to="/hero">Nyx</NavLink></li>
                                    <li><NavLink to="/hero">Ophelia</NavLink></li>
                                    <li><NavLink to="/hero">Pavel</NavLink></li>
                                    <li><NavLink to="/hero">Veronica</NavLink></li>
                                </ul>
                            </li>
                            <li className="navClass">
                                <NavLink href="Warrios.html">Priests</NavLink>
                                <ul className="classesSubmenu">
                                    <li><NavLink to="/hero">Baudouin</NavLink></li>
                                    <li><NavLink to="/hero">Cassandra</NavLink></li>
                                    <li><NavLink to="/hero">Frey</NavLink></li>
                                    <li><NavLink to="/hero">Juno</NavLink></li>
                                    <li><NavLink to="/hero">Kaulah</NavLink></li>
                                    <li><NavLink to="/hero">Laias</NavLink></li>
                                    <li><NavLink to="/hero">Lavril</NavLink></li>
                                    <li><NavLink to="/hero">Leo</NavLink></li>
                                    <li><NavLink to="/hero">Lucias</NavLink></li>
                                    <li><NavLink to="/hero">May</NavLink></li>
                                    <li><NavLink to="/hero">Mediana</NavLink></li>
                                    <li><NavLink to="/hero">Rephy</NavLink></li>
                                    <li><NavLink to="/hero">Shea</NavLink></li>
                                </ul>
                            </li>
                            <li><NavLink href="Artifacts.html">Artifacts</NavLink></li>
                            <li><NavLink href="Resources.html">Resources</NavLink></li>
                            <li><NavLink>Etc.</NavLink></li>
                        </ul>
                    </nav>
                    <div id={"content"}>
                        <Route exact path="/" component={Home}/>
                        <Route path={"/hero/:hero"} component={Hero} />
                        <Route path="/artifact/:artifact" component={Artifact} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;
