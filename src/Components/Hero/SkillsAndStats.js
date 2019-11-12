import React from "react";
import {
    UniqueWeapon as UW,
} from "../components";
import Skill from "./Skill";

export const StatsAndSkills = (props) => {
    const heroPath = props.heroPath;
    const heroInfo = props.heroInfo;
    return <div id="skills">
        <UW heroPath={heroPath} uw={heroInfo.uw}/>
        <h2 className={"subSectionHeadline"}>Skills</h2>
        <hr/>
        <div className={"flexBox"}>
            {heroInfo.skills.map(skill => <Skill skill={skill} heroPath={heroPath}/>)}
        </div>
        <h2 className="subSectionHeadline">Transcendence</h2>
        <hr/>
        <div>
            <h2>T1 - Generic</h2>
            <div className="genericPerks">
                <div>
                    <h4>ATK Up</h4>
                    <p>Increases ATK by 30%.</p>
                </div>
                <hr/>
                <div>
                    <h4>HP Up</h4>
                    <p>Increases HP by 30%.</p>
                </div>
                <hr/>
                <div>
                    <h4>DEF Up</h4>
                    <p>Increases DEF by 30%.</p>
                </div>
                <hr/>
                <div>
                    <h4>Crit Resist Up</h4>
                    <p>Increases DEF by 30%.</p>
                </div>
                <hr/>
                <div>
                    <h4>Monster Hunting</h4>
                    <p>Increases DMG to non-hero Enemies by 10% and takes 10% less dmg.</p>
                </div>
            </div>
            <hr className="skillSeperator"/>
            <h2>T2 - Class-Specific</h2>
            <div className="genericPerks">
                <div>
                    <h4>Expirienced Fighter</h4>
                    <p>Increases the dmg targets take by 20%.</p>
                </div>
                <hr/>
                <div>
                    <h4>HP Up</h4>
                    <p>Increases HP by 30%.</p>
                </div>
                <hr/>
                <section>
                    <h4>DEF Up</h4>
                    <p>Increases DEF by 30%.</p>
                </section>
                <hr/>
                <div>
                    <h4>Shield of Protection</h4>
                    <p>Increases DEF by 30%.</p>
                </div>
                <hr/>
                <div>
                    <h4>Monster Hunting</h4>
                    <p>Increases DMG to non-hero Enemies by 10% and takes 10% less dmg.</p>
                </div>
            </div>
            <hr className="skillSeperator"/>
            <div className="tPerks">
                <div>
                    <h4>LIGHT</h4>
                    <p>{heroInfo.light}</p>
                </div>
                <div>
                    <h4>DARK</h4>
                    <p>{heroInfo.dark}</p>
                </div>
            </div>
        </div>
    </div>
};
