import React, { useEffect, useState, useGlobal } from "reactn";

//Relative Imports
import "../styles/HeroStory.css";
import { Spinner } from "Styles";
import { CustomError } from "Helpers";
import { AWSoperation, getHeroBackgroundData } from "Aws";

export const HeroStory = (props) => {
  //Globals
  const [error, setError] = useGlobal("error");
  const [heroName, setGlobalHeroName] = useGlobal("heroName");
  //States
  const [heroBackgroudData, setHeroBackgroundData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AWSoperation(getHeroBackgroundData, { name: heroName })
      .then((background) => setHeroBackgroundData(background))
      .then(() => setIsLoading(false))
      .catch((err) => {
        let error = CustomError(`Hero Not Found.`, true, `/heroes/`);
        setError(error);
      });
    return () => setIsLoading(true);
  }, [heroName]);

  const assetsUrl = `/assets/heroes/${heroName.toLowerCase()}`;

  let createStoryDiv = (name, story, iconPathFragment) => (
    <>
      <hr className="seperator" />
      <div key={`${iconPathFragment}Story`}>
        <div className="headline">
          <img
            src={`${assetsUrl}/${iconPathFragment}.png`}
            className="uniqueItem"
          />
          <h2>{name}</h2>
        </div>
        <p className="story">{story}</p>
      </div>
    </>
  );

  let createTableRow = (bulletPoint, bulletPointValue) => (
    <tr>
      <td className={"profilePoint"}>{bulletPoint}</td>
      <td>{bulletPointValue}</td>
    </tr>
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {Object.keys(heroBackgroudData).length > 1 ? (
        <>
          <div>
            <div id={"profile"}>
              <p className={"title2"}>Profile</p>
              <table id="profileTable">
                <tbody>
                  {createTableRow("Name", heroName)}
                  {createTableRow("Title", heroBackgroudData.title)}
                  {createTableRow("Gender", heroBackgroudData.profile.gender)}
                  {createTableRow("Race", heroBackgroudData.profile.race)}
                  {createTableRow("Age", heroBackgroudData.profile.age)}
                  {createTableRow("Height", heroBackgroudData.profile.height)}
                  {createTableRow(
                    "Birthday",
                    heroBackgroudData.profile.birthday
                  )}
                  {createTableRow(
                    "Constellation",
                    heroBackgroudData.profile.constellation
                  )}
                  {createTableRow("Likes", heroBackgroudData.profile.likes)}
                  {createTableRow(
                    "Dislikes",
                    heroBackgroudData.profile.dislikes
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <hr />
          <div>
            <div className="headline">
              <img src={`${assetsUrl}/portrait.png`} className="uniqueItem" />
              <h2>{heroName}</h2>
            </div>
            <p className={"story"}>{heroBackgroudData.story}</p>
          </div>
          {createStoryDiv(
            heroBackgroudData.uniqueWeapon.name,
            heroBackgroudData.uniqueWeapon.story,
            "uw"
          )}
          {createStoryDiv("Soul", heroBackgroudData.soulWeapon.story, "sw")}
          {createStoryDiv(
            heroBackgroudData.skill1.uniqueTreasure.name,
            heroBackgroudData.skill1.uniqueTreasure.story,
            "ut1"
          )}
          {createStoryDiv(
            heroBackgroudData.skill2.uniqueTreasure.name,
            heroBackgroudData.skill2.uniqueTreasure.story,
            "ut2"
          )}
          {createStoryDiv(
            heroBackgroudData.skill3.uniqueTreasure.name,
            heroBackgroudData.skill3.uniqueTreasure.story,
            "ut3"
          )}
          {createStoryDiv(
            heroBackgroudData.skill4.uniqueTreasure.name,
            heroBackgroudData.skill4.uniqueTreasure.story,
            "ut4"
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
