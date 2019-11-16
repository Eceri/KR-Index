import React from "react";
import "./../styles/HeroVoice.css"

export const HeroVoice = props => {
  let { heroPath, name, voice } = props;
  let voiceLines = voice.lines;
  return (
    <div>
      <p className="title2">Voice Actor</p>
      <table>
        <tbody>
          <tr>
            <td>Japanese</td> <td>{voice.actor.jp}</td>
          </tr>
          <tr>
            <td>Korean</td> <td>{voice.actor.kr}</td>
          </tr>
          <tr>
            <td>English</td> <td>{voice.actor.en}</td>
          </tr>
        </tbody>
      </table>
      {voiceLines.map(voiceLine => (
        <figure className="fig" key={voiceLine}>
          <figcaption className="figCaption">{voiceLine}</figcaption>
          <audio
            controls
            src={require(`./../../Assets/${heroPath}voice/jp/${voiceLine}.wav`)}
            preload={"none"} />
        </figure>
      ))}
    </div>
  );
};
