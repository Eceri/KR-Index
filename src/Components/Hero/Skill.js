import React from "react";
import "./heroSkill.css";
import ReactToolTip from 'react-tooltip';
import chainLink from './../../Assets/chain_link.svg';
import manaOrb from './../../Assets/manaOrb.png';

const Skill = (props) => {
    const manaCost = function (n) {
        let orbs = [];
        for (let i = 0; i < n; ++i) {
            orbs.push(<img alt="Mana Orb" src={manaOrb} className={"mana"}/>)
        }
        return (
            orbs
        )
    };
    return (
        <section className="skill" key={props.skill.id}>
            <div className="skillBaseInfo">
               {props.skill.skillInfo.map((skillInfo, index) =>
                <div className={"skillBlock" + (props.skill.linked && index > 0 && " linkedSkill")}>
                    {props.skill.linked && index > 0 && <div><img src={chainLink}
                                                             alt={"chain-link"} className={"chainlink"}
                                                             data-tip="This skill is linked to a previous cast." />
                                                        </div>}
                    <div className={"skillDescription"} >
                        <div className={"skillHeader"}>
                                <img src={`${props.heroImagesPath}${skillInfo.skillNumber}.png`} className={"skillIcon"}
                                     alt={`Skill ${skillInfo.id} Icon`}/>
                            <div>
                            <h2 className="skillName">{skillInfo.name}</h2>
                            {manaCost(skillInfo.cost)}
                            {(skillInfo.cooldown > 0) && <strong> {skillInfo.cooldown} Sec</strong>}
                            </div>
                        </div>
                       <p>{skillInfo.effect}</p>
                    </div>
                </div>)}
            </div>
            <div className="books">
                <h3>Books</h3>
                <div>
                {props.skill.books.map(book => {
                    return <p className={"bookEffects"}>
                            <img src={`/Assets/book${props.skill.id}.png`} alt={"book icon"} />
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
                <div >
                    <div>
                        <img src={`${props.heroImagesPath}ut${props.skill.id}.png`}
                             alt={`Unique Treasure ${props.skill.id} Icon`}/>
                    </div>
                    <div>
                        <h4>{props.skill.ut.name}</h4>
                        <p>{props.skill.ut.effect}</p>
                    </div>
                </div>
            </div>

            {(props.skill.id < 4 ) && <hr className="skillSeperator" />}
            <ReactToolTip
                multiline={true}
                border={true}
                className={"tooltip"}/>
        </section>
    )
};
export default Skill;
