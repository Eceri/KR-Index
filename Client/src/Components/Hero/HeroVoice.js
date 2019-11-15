import React from "react";

export const HeroVoice = props => {
  return (
    <div>
      <figure>
        <figcaption>Test Audio file</figcaption>
        <audio
          controls
          src={require("./../../Assets/heroes/test.mp3")}
          preload={"none"}
        />
      </figure>
    </div>
  );
};
