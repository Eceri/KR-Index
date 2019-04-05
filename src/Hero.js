import React, {Component} from "react";
import "./styles/KRCHeroPage.css";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import "./styles/tabStyles.css";
import Skill from "./Skill";

class Hero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            heroInfo: undefined,
            heroPath: undefined,
        };
    }

    setStateFromProps(heroName) {
        let jsonFile = require(`./assets/heroes/${heroName}/info.json`);
        let pathString = `./assets/heroes/${heroName}/`;
        this.setState({
            isLoading: false,
            heroName: heroName,
            heroInfo: jsonFile,
            heroPath: pathString
        })
    }

    componentDidMount() {
        this.setStateFromProps(this.props.match.params.hero)
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.heroName !== nextProps.match.params.hero) {
            this.setStateFromProps(nextProps.match.params.hero)
        }

    }


    render() {
        {console.log("Loading " + this.state.heroName)}
        if (this.state.isLoading) {
            return <div>Loading</div>
        }
        if (!this.state.isLoading) {
            return <div id={"pageContainer"}>
                <div id={"hero"}>
                    <img src={require(`${this.state.heroPath}hero.png`)}/>
                    <h1>{this.state.heroInfo.heroName} </h1>
                    <h2>{this.state.heroInfo.title}</h2>
                </div>
                <hr/>
                <h2>Unique Weapon</h2>
                <hr/>
                <section id={"uw"}>
                    <img src={require(`${this.state.heroPath}uw.png`)} alt={"UW Icon"}/>
                    <section>
                        <h2>{this.state.heroInfo.uw.name}</h2>
                        <p>{this.state.heroInfo.uw.effect}</p>
                    </section>
                    <p>ATK: placeholder</p>
                </section>
                <h2 className={"subSectionHeadline"}>Skills</h2>
                <hr/>
                <section className={"flexBox"}>
                    {
                        this.state.heroInfo.skills.map(skill =>
                            <Skill skill={skill} heroImagesPath={this.state.heroPath}/>
                            )
                    }
                </section>

                <h2 className="subSectionHeadline">Transcendence</h2>
                <hr/>
                <section>
                    <h2>T1</h2>
                    <div className="genericPerks">

                        <section>
                            <h4>ATK Up</h4>
                            <p>Increases ATK by 30%.</p>
                        </section>
                        <hr/>
                        <section>
                            <h4>HP Up</h4>
                            <p>Increases HP by 30%.</p>
                        </section>
                        <hr/>
                        <section>
                            <h4>DEF Up</h4>
                            <p>Increases DEF by 30%.</p>
                        </section>
                        <hr/>
                        <section>
                            <h4>Crit Resist Up</h4>
                            <p>Increases DEF by 30%.</p>
                        </section>
                        <hr/>
                        <section>
                            <h4>Monster Hunting</h4>
                            <p>Increases DMG to non-hero Enemies by 10% and takes 10% less dmg.</p>
                        </section>
                    </div>
                    <hr className="skillSeperator"/>
                    <h2>T2</h2>
                    <div className="genericPerks">
                        <section>
                            <h4>Expirienced Fighter</h4>
                            <p>Increases the dmg targets take by 20%.</p>
                        </section>
                        <hr/>
                        <section>
                            <h4>HP Up</h4>
                            <p>Increases HP by 30%.</p>
                        </section>
                        <hr/>
                        <section>
                            <h4>DEF Up</h4>
                            <p>Increases DEF by 30%.</p>
                        </section>
                        <hr/>
                        <section>
                            <h4>Shield of Protection</h4>
                            <p>Increases DEF by 30%.</p>
                        </section>
                        <hr/>
                        <section>
                            <h4>Monster Hunting</h4>
                            <p>Increases DMG to non-hero Enemies by 10% and takes 10% less dmg.</p>
                        </section>
                    </div>
                    <hr className="skillSeperator"/>
                    <div className="tPerks">
                        <section>
                            <h4>LIGHT</h4>
                            <p>{this.state.heroInfo.light}</p>
                        </section>
                        <section>
                            <h4>DARK</h4>
                            <p>{this.state.heroInfo.dark}</p>
                        </section>
                    </div>
                </section>
                <section>
                    <h2>Story</h2>
                    <hr/>
                    <section>
                        <p>As a knight of the righteous heavens, she punishes evil with her sword and protects the weak
                            with
                            her shield. She has descended in order to defeat the Demons who are ruining the earthly
                            realm.
                            Her beautiful sword and shield are wielded to smite enemies and protect her comrades with
                            their
                            light.</p>
                    </section>

                    <h2>Trivia</h2>
                    <hr/>
                    <ul id="triviaList">
                        <li>She is 170cm (about 5'6' feet)</li>
                        <li>She is called the "guardian of the sun".</li>
                        <li>Her birthday is September 22nd.</li>
                        <li>Her constellation is Judgment Layan.</li>
                        <li>She likes her fellow kinsmen, and enforcing order.</li>
                        <li>She dislikes demons.</li>
                        <li>She is a knight of the righteous heavens and she punishes evil with her sword and
                            protects the weak with her shield.
                        </li>
                        <li>She descended in order to defeat the Demons who are ruining the earthly realm.</li>
                        <li>She is the second angel to be released, after Arch.</li>
                        <li>It is likely she was sent by Lua, as a goddess is mentioned in her story.</li>
                        <li>Likely the chosen warrior in her story is Kyle, who seems to have fallen into path
                            of darkness.
                        </li>
                    </ul>
                </section>
                <h2>Art</h2>
                <Tabs>
                    <TabList>
                        {this.state.heroInfo.skins.map(skin => <Tab>{skin}</Tab>)}
                    </TabList>

                    {this.state.heroInfo.skins.map(skin =>
                        <TabPanel forceRender={true}>
                            <img src={require(`${this.state.heroPath}${skin}.png`)} alt={skin} className={"skin"}/>
                        </TabPanel>)}
                </Tabs>
                <section>
                    <h2>Miscellaneous</h2>
                    <hr/>
                </section>
            </div>


        }
    }
}


export default Hero;
