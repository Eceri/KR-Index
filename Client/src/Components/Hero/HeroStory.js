import React from "react";
import "../styles/HeroStory.css";

export const HeroStory = props => {
  let profile = props.backgroundData.profile;
  return (
    <div>
      <div>
        <div id={"profile"}>
          <div>
            <p className={"title2"}>Profile</p>
            <table id="profileTable">
              <tr>
                <td className={"profilePoint"}>Name</td>
                <td>{props.name}</td>
              </tr>
              <tr>
                <td className={"profilePoint"}>Title</td>
                <td>{props.title}</td>
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
            </table>
          </div>
        </div>
      </div>
      <div>
        <p className="title2">{props.name}</p>
        <p className={"story"}>{props.backgroundData.story}</p>
      </div>
      <div>
        <p className="title2">Unique Weapon</p>
        <p className="story">{props.backgroundData.itemStories.uw}</p>
      </div>
      <div>
        <p className="title2">Unique Treasure 1</p>
        <p className="story">{props.backgroundData.itemStories.ut1}</p>
      </div>
      <div>
        <p className="title2">Unique Treasure 2</p>
        <p className="story">{props.backgroundData.itemStories.ut2}</p>
      </div>
      <div>
        <p className="title2">Unique Treasure 3</p>
        <p className="story">{props.backgroundData.itemStories.ut3}</p>
      </div>
      <div>
        <p className="title2">Unique Treasure 4</p>
        <p className="story">{props.backgroundData.itemStories.ut4}</p>
      </div>
    </div>
  );
};
