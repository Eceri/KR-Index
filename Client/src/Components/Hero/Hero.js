import React, { Component } from "react";
import "../styles/hero.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../styles/tabStyles.css";
import Helmet from "react-helmet";
import {
  Image,
  HeroGeneral,
  HeroStory,
  HeroSkins,
  HeroVoice
} from "./../components";
import "../styles/heroSkills.css";

export class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      heroInfo: undefined
    };
  }
  setStateFromProps(heroName) {
    this.setState({
      isLoading: false,
      heroName: heroName
    });
  }
  componentDidMount() {
    this.setStateFromProps(this.props.match.params.hero);
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.heroName !== nextProps.match.params.hero) {
      this.setStateFromProps(nextProps.match.params["hero"]);
    }
  }
  goBack() {
    this.props.history.goBack();
  }

  render() {
    const heroName = this.props.match.params.hero;
    const heroPath = `heroes/${heroName}/`;
    let heroInfo;
    try {
      heroInfo = require(`./../../Assets/heroes/${heroName}/${heroName}.json`);
    } catch (e) {
      return <div>Hero not Found</div>;
    }
    const title = (
      <Helmet>
        <title>{`${heroName}`}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
    );
    if (this.state.isLoading) {
      return (
        <div>
          {title}
          Loading
        </div>
      );
    }
    if (!this.state.isLoading) {
      return (
        <div id="content">
          {title}
          <div id={"hero"}>
            <Image
              src={`${heroPath}hero.png`}
              id={"portrait"}
            />
            <div>
              <p className={"title1"}>{heroInfo.name}</p>
              <p className={"title2"}>{heroInfo.title}</p>
              <div id="heroType" className="flexBox">
                <Image
                  src={`classes/${heroInfo.class}.png`}
                  className={"heroClassIcon"}
                  style={{ border: "none" }}
                />
                <Image src={`${heroInfo.damageType}.png`}
                  id={"damageType"}
                  style={{ border: "none" }} />
                <p>{heroInfo.position}</p>
              </div>
            </div>
          </div>
          <Tabs>
            <TabList>
              <Tab>General</Tab>
              <Tab>Story</Tab>
              <Tab>Skins</Tab>
              <Tab>Voice</Tab>
            </TabList>
            <TabPanel>
              <HeroGeneral heroPath={heroPath}
                heroInfo={heroInfo} />
            </TabPanel>
            <TabPanel>
              <HeroStory
                heroPath={heroPath}
                name={heroInfo.name}
                backgroundData={heroInfo.background}
                title={heroInfo.title} />
            </TabPanel>
            <TabPanel>
              <HeroSkins heroPath={heroPath}
                skins={heroInfo.skins} />
            </TabPanel>
            <TabPanel>
              <HeroVoice
                heroPath={heroPath}
                voice={heroInfo.voice} />
            </TabPanel>
          </Tabs>
        </div>
      );
    }
  }
}
export default Hero;