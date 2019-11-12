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
        let jsonFile = require(`./heroAssets/${heroName}/${heroName}.json`);
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
            const profile = heroInfo.profile
            return <article id={"pageContainer"}>
                {title}
                <div id={"hero"}>
                    <img src={require(`${heroPath}hero.png`)} alt={heroName} />
                    <div>
                        <h1>{heroInfo.name} </h1>
                        <h2>{heroInfo.title}</h2>
                    </div>
                </div>
                <h2 >Unique Weapon</h2>
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

                <div>
                    <h2 className={"subSectionHeadline"}>Art & Skins</h2>
                    <Tabs>
                        <TabList>
                            {heroInfo.skins.map(skin => <Tab>{skin}</Tab>)}
                        </TabList>
                        {heroInfo.skins.map(skin =>
                            <TabPanel forceRender={true}>
                                <div><img src={require(`${heroPath}${skin}.png`)} alt={skin} className={"skin"}/></div>
                            </TabPanel>)}
                    </Tabs>
                </div>
                <h2 className="subSectionHeadline">Miscellaneous</h2>
                <hr/>
                <div id={"heroBackground"}>
                    <div id={"story"} >
                        <h3>Story</h3>
                        <p>{heroInfo.story}</p>
                    </div>

                    <div id={"profile"}>
                        <div>
                            <h3>Profile</h3>
                            <table id="profileTable">
                                <tr><td>Name</td><td>{heroInfo.name}</td></tr>
                                <tr><td>Title</td><td>{heroInfo.title}</td></tr>
                                <tr><td>Gender</td><td>{profile.gender}</td></tr>
                                <tr><td>Race</td><td>{profile.race}</td></tr>
                                <tr><td>Age</td><td>{profile.age}</td></tr>
                                <tr><td>Height</td><td>{profile.height}</td></tr>
                                <tr><td>Birthday</td><td>{profile.birthday}</td></tr>
                                <tr><td>Constellation</td><td>{profile.constellation}</td></tr>
                                <tr><td>Likes</td><td>{profile.likes}</td></tr>
                                <tr><td>Dislikes</td><td>{profile.dislikes}</td></tr>
                            </table>
                        </div>
                    </div>
                </div>
            </article>
        }
    }
}
export default Hero;
