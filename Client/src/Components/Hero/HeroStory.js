import React from "react";
import "../styles/HeroStory.css";
import { Image } from "./../components"

export const HeroStory = props => {
  let { heroPath, name, backgroundData, title } = props
  let profile = backgroundData.profile;
  return <>
    <div>
      <div id={"profile"}>
        <p className={"title2"}>Profile</p>
        <table id="profileTable">
          <tbody>
            <tr>
              <td className={"profilePoint"}>Name</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td className={"profilePoint"}>Title</td>
              <td>{title}</td>
            </tr>
            <tr>
              <td className={"profilePoint"}>Gender</td>
              <td>{profile.gender}</td>
            </tr>
            <tr>
              <td className={"profilePoint"}>Race</td>
              <td>{profile.race}</td>
            </tr>
            <tr>
              <td className={"profilePoint"}>Age</td>
              <td>{profile.age}</td>
            </tr>
            <tr>
              <td className={"profilePoint"}>Height</td>
              <td>{profile.height}</td>
            </tr>
            <tr>
              <td className={"profilePoint"}>Birthday</td>
              <td>{profile.birthday}</td>
            </tr>
            <tr>
              <td className={"profilePoint"}>Constellation</td>
              <td>{profile.constellation}</td>
            </tr>
            <tr>
              <td className={"profilePoint"}>Likes</td>
              <td>{profile.likes}</td>
            </tr>
            <tr>
              <td>Dislikes</td>
              <td>{profile.dislikes}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr />
    <div>
      <div className="headline">
        <Image src={`${heroPath}portrait.png`}
          className="uw" />
        <h2>Unique Weapon</h2>
      </div>
      <p className={"story"}>{backgroundData.story}</p>
    </div>
    <hr className="seperator" />
    <div>
      <div className="headline">
        <Image src={`${heroPath}uw.png`}
          className="uw" />
        <h2>Unique Weapon</h2>
      </div>
      <p className="story">{backgroundData.itemStories.uw}</p>
    </div>
    <hr className="seperator" />
    {backgroundData.itemStories.uts.map((utStory, index) => (
      <div key={`ut${index + 1}Story`}>
        <div className="headline">
          <Image src={`${heroPath}ut${index + 1}.png`}
            className="uw" />
          <h2> Treasure {index + 1}</h2>
        </div>
        <p className="story">{utStory}</p>
        {index < 3 && <hr className="seperator" />}
      </div>
    ))}
  </>
};
