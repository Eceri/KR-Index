import React from "react";
import "./../styles/background.css";

export const Background = (props) => {
    let profile = props.backgroundData.profile;
    return <div>
        <div className={"test"}>
        <div id={"heroBackground"}>
            <div>
            <p className={"title2"}>Story</p>
            <p id={"story"}>{props.backgroundData.story}</p>
            </div>
        </div>
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
            <hr className={"subSectionHeadline"}/>
            <p>Voice Lines</p>
            <figure>
                <figcaption>Test Audio file</figcaption>
                <audio controls
                       src={require("./../../Assets/heroes/test.mp3")}
                       preload={"none"}/>
            </figure>
        </div>
    </div>
};
