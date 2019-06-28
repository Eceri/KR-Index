import React from "react";
import "../styles/heroSkill.css";

const Skill = (props) => {
    const manaCost = function (n) {
        let orbs = [];
        for (let i = 0; i < n; ++i) {
            orbs.push(<img alt="Mana Orb" src={require(`./manaOrb.bmp`)} className={"mana"}/>)
        }
        return (
            orbs
        )
    };
    return (
        <section className="skill" key={props.skill.id}>
            <div className="skillBaseInfo">
            {props.skill.skillInfo.map((skillInfo, index) =>
                <div className={"skillBlock" + (props.skill.linked && " linkedSkill")}>
                    {props.skill.linked && index > 0 && <img src={require("./heroAssets/chain_link.svg")} alt={"chain link"} className={"chainlink"} style={{ widht: 0 }} />}
                    <div className={"skillHeader"}>
                        <img src={require(`${props.heroImagesPath}${skillInfo.skillNumber}.png`)} className={"skillIcon"}
                             alt={`Skill ${skillInfo.id} Icon`}/><div>
                            <h2 className="skillName">{skillInfo.name}</h2>
                            {manaCost(skillInfo.cost)}
                            {(skillInfo.cooldown > 0) && <strong> {skillInfo.cooldown} Sec</strong>}
                        </div>
                    </div>
                    <div className={"skillDescription"} >
                        <p>{skillInfo.effect}</p>
                    </div>
                </div>)}
            </div>
            <div className="books">
                <h3>Books</h3>
                <div>
                {props.skill.books.map(book => {
                    return <p className={"bookEffects"}>
                        <img src={require(`./heroAssets/book${props.skill.id}.png`)} alt={"book icon"} />
                        {book}
                    </p>
                })}
                </div>
            </div>
            <div className="tPerks">
                <div className={"light"}>
                    <h4>LIGHT</h4>
                    <p>{props.skill.light}</p>
                </div>
                <div className={"dark"}>
                    <h4>DARK</h4>
                    <p>{props.skill.dark}</p>
                </div>
            </div>
            <div className="ut">
                <h3>Unique Treasure {props.skill.id}</h3>
                <section >
                    <img src={require(`${props.heroImagesPath}ut${props.skill.id}.png`)}
                         alt={`Unique Treasure ${props.skill.id} Icon`}/>
                    <section>
                        <h4>{props.skill.ut.name}</h4>
                        <p>{props.skill.ut.effect}</p>
                    </section>
                </section>
            </div>
            <small className={"utStory"}>Story</small>

            {(props.skill.id < 4 ) && <hr className="skillSeperator" />}
        </section>
    )
};
export default Skill;
