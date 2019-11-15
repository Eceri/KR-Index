import React, { useEffect, useState } from "react";

import styled from "styled-components";

// Styled Components --------------------------------------------------------------------------------------------------

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
    </div>
  );
};

export default Artifact;
