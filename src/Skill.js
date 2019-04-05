import React from "react";


const Skill = (props) => {
    const manaCost = function (n) {
        let orbs = [];
        for (let i = 0; i < n; ++i) {
            orbs.push(<img alt="Mana Orb" src={require(`./assets/manaOrb.bmp`)} className={"mana"}/>)
        }
        return (
            orbs
        )
    };
    return (
        <div className="skill" key={props.skill.id}>
            <div className="skillInfo">
                <section>
                    <img src={require(`${props.heroImagesPath}s${props.skill.id}.png`)} className={"skillIcon"}
                         alt={`Skill ${props.skill.id} Icon`}/>
                    <section>
                        <h2 className="skillName">{props.skill.name}</h2>
                        {manaCost(props.skill.cost)}
                        {(props.skill.cooldown > 0) && <strong> {props.skill.cooldown} Sec</strong>}
                    </section>
                </section>
                <section>
                    <p>{props.skill.effect}</p>
                    <hr className="bookSeperator"/>
                    <div className="books">
                        <h3>Books</h3>
                        {props.skill.books.map(book => {
                            return <p>{book}</p>
                        })}
                    </div>
                </section>
            </div>
            <div className="tPerks">
                <section>
                    <h4>LIGHT</h4>
                    <p>{props.skill.light}</p>
                </section>
                <section>
                    <h4>DARK</h4>
                    <p>{props.skill.dark}</p>
                </section>
            </div>
            <div className="ut">
                <img src={require(`${props.heroImagesPath}ut${props.skill.id}.png`)}
                     alt={`Unique Treasure ${props.skill.id} Icon`}/>
                <section>
                    <h3>{props.skill.ut.name}</h3>
                    <p>{props.skill.ut.effect}</p>
                </section>

            </div>
            <section className={"utStory"}>
                <small>Story</small>
            </section>
            {(props.skill.id < 4 ) && <hr className="skillSeperator"/>}
        </div>
    )
}
export default Skill;
