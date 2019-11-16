import React from "react";
import "./../styles/HeroVoice.css"

export const HeroVoice = props => {
  let { heroPath, name, voice } = props;
  let voiceLines = voice.lines;
  return (
    <div>
      {voiceLines.map(voiceLine => (
          <figure className="fig">
            <figcaption className="figCaption">{voiceLine}</figcaption>
            <audio
              controls
              src={require(`./../../Assets/heroes/${name}/voice/jp/${voiceLine}.wav`)}
              preload={"none"} />
          </figure>
      ))}
    </div>
  );
};
