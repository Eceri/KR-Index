import React, { useEffect, useState } from "react";

import styled from "styled-components";

// const writeJsonFile = require("write-json-file");

// Styled Components --------------------------------------------------------------------------------------------------

const Question = styled.div`
  text-align: center;
  position: absolute;
  bottom: 10rem;
  left: 40%;
`;

const ArtifactContainer = styled.p`
  width: calc(100% - 10rem);
  height: 5rem;
  padding: 1rem;
`;

const ArtifactStory = styled.section`
  padding: 1rem;
  padding-top: 5rem;
`;

let artifact = {
  name: "Burning Brazier of Elf",
  description: [
    "Upon attacking an enemy, there is a 10% chance to recover 1 MP.",
    "Upon attacking an enemy, there is a 12% chance to recover 1 MP.",
    "Upon attacking an enemy, there is a 14% chance to recover 1 MP.",
    "Upon attacking an enemy, there is a 17% chance to recover 1 MP.",
    "Upon attacking an enemy, there is a 20% chance to recover 1 MP.",
    "Upon attacking an enemy, there is a 25% chance to recover 1 MP."
  ],
  story:
    "A mysterious brazier crafted by ancient Elves to honor the mother nature. It is the pinnacle of their magic, capable of producing an infinite amount of mana."
};

let artifactsTest = [{}];

const Artifact = () => {
  const [star, setStar] = useState(0);
  const [artifactNumber, setArtifactNumber] = useState(1);

  const artifactPicture = require(`../../Assets/artifacts/${artifactNumber}.png`);

  useEffect(() => {
    artifactNumber < 10 &&
      fetch(
        `https://maskofgoblin.com/i18n/English/artifact/${artifactNumber}.json`
      )
        .then(res => {
          return res.json();
        })
        .then(data => artifactsTest.push({ ...data, picture: artifactNumber }))
        .then(setArtifactNumber(artifactNumber + 1));
  }, [artifactNumber]);

  const stars = () => {
    const arr = [0, 1, 2, 3, 4, 5];
    return (
      <div>
        {arr.map(v => (
          <button onClick={() => setStar(v)}>{v}</button>
        ))}
      </div>
    );
  };

  // const write = object => {
  //   writeJsonFile("ArtifactsDB.json", JSON.stringify(object));
  // };

  return (
    <div id={"content"}>
      {console.log(
        artifactsTest.sort((a, b) => (a.picutre > b.picture ? 1 : -1))
      )}

      <ArtifactContainer>
        {artifactsTest.map(
          (artifact, index) =>
            index && (
              <React.Fragment>
                <img
                  src={require(`../../Assets/artifacts/${artifact.picture}.png`)}
                  alt="Pic"
                  align="left"
                  style={{ padding: "1rem" }}
                />
                {/* <section>
                  <h1>{artifact.name}</h1>

                  <p>
                    {artifact.description &&
                      artifact.description.length > 0 &&
                      artifact.description[star]}
                  </p>
                </section>
                {stars()}
                <ArtifactStory>{artifact.story}</ArtifactStory> */}
              </React.Fragment>
            )
        )}
        {/* <input
          type="number"
          min="1"
          max="560"
          value={artifactNumber}
          onChange={e => setArtifactNumber(e.currentTarget.value)}
        ></input> */}
      </ArtifactContainer>

      {/* <Question>
        <h2>GOT QUESTIONS?</h2>
        <p>The easiest thing to do is post on.</p>
      </Question> */}
    </div>
  );
};

export default Artifact;
