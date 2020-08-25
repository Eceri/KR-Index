import React, { useEffect, useState } from "react";
import "../styles/HeroStory.css";
import { Image } from "Components";

//Relative Imports
import { AWSoperation, getHeroStories } from "Helpers";

export const HeroStory = (props) => {
  const [heroStories, setHeroStories] = useState({});
  let { heroPath, heroName, heroTitle } = props;

  useEffect(() => {
    AWSoperation(getHeroStories, { name: heroName }).then((res) =>
      setHeroStories(res.data.getHero)
    );
  }, [heroName]);

  let createStoryDiv = (name, story, iconPathFragment) => (
    <div key={`${iconPathFragment}Story`}>
      <div className="headline">
        <Image
          src={`${heroPath}${iconPathFragment}.png`}
          className="uniqueItem"
        />
        <h2>{name}</h2>
      </div>
      <p className="story">{story}</p>
    </div>
  );

  let createTableRow = (bulletPoint, bulletPointValue) => (
    <tr>
      <td className={"profilePoint"}>{bulletPoint}</td>
      <td>{bulletPointValue}</td>
    </tr>
  );

  return (
    <>
      {Object.keys(heroStories).length > 1 ? (
        <>
          <div>
            <div id={"profile"}>
              <p className={"title2"}>Profile</p>
              <table id="profileTable">
                <tbody>
                  {createTableRow("Name", heroName)}
                  {createTableRow("Title", heroTitle)}
                  {createTableRow("Gender", heroStories.profile.gender)}
                  {createTableRow("Race", heroStories.profile.race)}
                  {createTableRow("Age", heroStories.profile.age)}
                  {createTableRow("Height", heroStories.profile.height)}
                  {createTableRow("Birthday", heroStories.profile.birthday)}
                  {createTableRow(
                    "Constellation",
                    heroStories.profile.constellation
                  )}
                  {createTableRow("Likes", heroStories.profile.likes)}
                  {createTableRow("Dislikes", heroStories.profile.dislikes)}
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          <div>
            <div className="headline">
              <Image src={`${heroPath}portrait.png`} className="uniqueItem" />
              <h2>{heroName}</h2>
            </div>
            <p className={"story"}>{heroStories.story}</p>
          </div>
          <hr className="seperator" />
          {createStoryDiv(
            heroStories.uniqueWeapon.name,
            heroStories.uniqueWeapon.story,
            "uw"
          )}
          <hr className="seperator" />
          {createStoryDiv("Soul", heroStories.soulWeapon.story, "sw")}
          <hr className="seperator" />
          {createStoryDiv(
            heroStories.skill1.uniqueTreasure.name,
            heroStories.skill1.uniqueTreasure.story,
            "ut1"
          )}
          <hr className="seperator" />
          {createStoryDiv(
            heroStories.skill2.uniqueTreasure.name,
            heroStories.skill2.uniqueTreasure.story,
            "ut2"
          )}
          <hr className="seperator" />
          {createStoryDiv(
            heroStories.skill3.uniqueTreasure.name,
            heroStories.skill3.uniqueTreasure.story,
            "ut3"
          )}
          <hr className="seperator" />
          {createStoryDiv(
            heroStories.skill4.uniqueTreasure.name,
            heroStories.skill4.uniqueTreasure.story,
            "ut4"
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
