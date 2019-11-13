import React, {Component} from "react";
import "../styles/hero.css";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import "../styles/tabStyles.css";
import Helmet from "react-helmet";
import {
    Image,
    StatsAndSkills,
    Background,
    Skins,
} from "./../components";
import "../styles/heroSkills.css";

class Hero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            heroInfo: undefined,
        };
    }
    setStateFromProps(heroName) {
        this.setState({
            isLoading: false,
            heroName: heroName,
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
    goBack(){
        this.props.history.goBack();
    }

    render() {
        const heroName = this.props.match.params.hero;
        const heroPath = `heroes/${heroName}/`;
        let heroInfo;
        try {
            heroInfo = require(`./../../Assets/heroes/${heroName}/${heroName}.json`);
        }
        catch (e) {
            return <div>Hero not Found</div>
        }
        const title = <Helmet>
            <title>{`KRC - ${heroName}`}</title>
            <meta name="description" content="Helmet application" />
        </Helmet>;
        if (this.state.isLoading) {
            return <div>
                {title}
                Loading
            </div>
        }
        if (!this.state.isLoading) {
            return <article id={"content"}>
                { title }
                <div id={"hero"}>
                    <Image src={`${heroPath}hero.png`} className={"defaultBorder "} id={"portrait"}/>
                    <div>
                        <p className={"title1"}>{heroInfo.name}</p>
                        <p className={"title2"}>{heroInfo.title}</p>
                        <div id="heroType" className="flexBox">
                            <Image src={`classes/${heroInfo.class}.png`} className={"heroClassIcon"}/>
                            <Image src={`${heroInfo.damageType}.png`} id={"damageType"} />
                            <p>{heroInfo.position}</p>
                        </div>
                    </div>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>General</Tab>
                        <Tab>Background</Tab>
                        <Tab>Skins</Tab>
                    </TabList>
                    <TabPanel>
                        <StatsAndSkills heroPath={heroPath} heroInfo={heroInfo} />
                    </TabPanel>
                    <TabPanel>
                        <Background backgroundData={heroInfo.background}
                                    heroPath ={heroPath}
                                    name={heroInfo.name}
                                    title={heroInfo.title} />
                    </TabPanel>
                    <TabPanel>
                        <Skins skins={heroInfo.skins}  heroPath ={heroPath} />
                    </TabPanel>
                </Tabs>
            </article>
        }
    }
}
export default Hero;
