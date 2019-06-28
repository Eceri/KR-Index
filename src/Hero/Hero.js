import React, {Component} from "react";
import "../styles/hero.css";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import "./tabStyles.css";
import Skill from "./Skill";
import Helmet from "react-helmet";

class Hero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            heroName: this.props.match.params.hero,
            heroInfo: undefined,
            heroPath: undefined,
        };
    }

    setStateFromProps(heroName) {
        let jsonFile = require(`./heroAssets/${heroName}/info.json`);
        let pathString = `./heroAssets/${heroName}/`;
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
            this.setStateFromProps(nextProps.match.params["hero"])
        }

    }
    render() {
        const heroName = this.state.heroName;
        const title = <Helmet>
            <title>KRC - {heroName} </title>
            <meta name="description" content="Helmet application"/>
        </Helmet>;

        if (this.state.isLoading) {
            return <div>
                {title}
                Loading
            </div>
        }
        if (!this.state.isLoading) {
            const heroPath = this.state.heroPath;
            const heroInfo = this.state.heroInfo;
            return <article id={"pageContainer"}>
                {title}
                <div id={"hero"}>
                    <img src={require(`${heroPath}hero.png`)} alt={heroName} />
                    <div>
                        <h1>{heroInfo.heroName} </h1>
                        <h2>{heroInfo.title}</h2>
                    </div>
                </div>
                <h2>Unique Weapon</h2>
                <hr/>
                <section id={"uw"}>
                    <img src={require(`${heroPath}uw.png`)} alt={"UW Icon"}/>
                    <section>
                        <h2>{heroInfo.uw.name}</h2>
                        <p>{heroInfo.uw.effect}</p>
                    </section>
                </section>
                <h2 className={"subSectionHeadline"}>Skills</h2>
                <hr/>
                <section className={"flexBox"}>
                    {heroInfo.skills.map(skill => <Skill skill={skill} heroImagesPath={heroPath}/>)}
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
                            <p>{heroInfo.light}</p>
                        </section>
                        <section>
                            <h4>DARK</h4>
                            <p>{heroInfo.dark}</p>
                        </section>
                    </div>
                </section>

                <h2 className="subSectionHeadline">Miscellaneous</h2>
                <hr/>
                <section>
                    <h3>Story</h3>
                    <section>
                        <p>{heroInfo.story}</p>
                    </section>
                    <h3>Trivia</h3>
                    <ul id="triviaList">
                        {heroInfo.trivia.map(info => <li>{info}</li>)}
                    </ul>
                </section>
                <h2>Art</h2>
                <Tabs>
                    <TabList>
                        {heroInfo.skins.map(skin => <Tab>{skin}</Tab>)}
                    </TabList>
                    {heroInfo.skins.map(skin =>
                        <TabPanel forceRender={true}>
                            <img src={require(`${heroPath}${skin}.png`)} alt={skin} className={"skin"}/>
                        </TabPanel>)}
                </Tabs>
            </article>
        }
    }
}


export default Hero;
