import React, { useState, useEffect } from "react";

import styled from "styled-components";

import Artifact from "./Artifact";

// Styled Components --------------------------------------------------------------------------------------------------

const ArtifactContainer = styled.div`
  width: calc(100% - 10rem);
  padding: 1rem;
`;

const ArtifactImage = styled.img`
  margin-right: 1rem;
  margin-bottom: 1rem;
  width: 96px;

  &:hover {
    cursor: pointer;
  }
`;
// Declarations -------------------------------------------------------------------------------------------------------

let artifact = [
  {
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
      "A mysterious brazier crafted by ancient Elves to honor the mother nature. It is the pinnacle of their magic, capable of producing an infinite amount of mana.",
    picture: 1
  },
  {
    name: "Drinking Horn of Ancient Cow",
    description: [
      "Upon auto attacking, there is a 10% chance that ATK rises by 10% and ATK Speed rises by 100.",
      "Upon auto attacking, there is a 10% chance that ATK rises by 12% and ATK Speed rises by 120.",
      "Upon auto attacking, there is a 10% chance that ATK rises by 14% and ATK Speed rises by 140.",
      "Upon auto attacking, there is a 10% chance that ATK rises by 17% and ATK Speed rises by 170.",
      "Upon auto attacking, there is a 10% chance that ATK rises by 20% and ATK Speed rises by 200.",
      "Upon auto attacking, there is a 10% chance that ATK rises by 25% and ATK Speed rises by 250."
    ],
    story:
      "A glass made from the horn of a sacred bull that roams the sky. It is a magical drinking horn that embodies the essence of abundance.",
    picture: 2
  },
  {
    name: "Dice of Magical Letters",
    description: [
      "Upon attacking an enemy, deal 400% M. DMG for a 3% chance.",
      "Upon attacking an enemy, deal 480% M. DMG for a 3% chance.",
      "Upon attacking an enemy, deal 575% M. DMG for a 3% chance.",
      "Upon attacking an enemy, deal 690% M. DMG for a 3% chance.",
      "Upon attacking an enemy, deal 830% M. DMG for a 3% chance.",
      "Upon attacking an enemy, deal 1000% M. DMG for a 3% chance."
    ],
    story:
      "A die used in an ancient civilization for divination. Each face is engraved with mysterious illegible letters.",
    picture: 3
  },
  {
    name: "Golden Cat Statue",
    description: [
      "Every Battle, Spd increases by 400 for the first 15 secs.",
      "Every Battle, Spd increases by 480 for the first 15 secs.",
      "Every Battle, Spd increases by 570 for the first 15 secs.",
      "Every Battle, Spd increases by 690 for the first 15 secs.",
      "Every Battle, Spd increases by 830 for the first 15 secs.",
      "Every Battle, Spd increases by 1000 for the first 15 secs."
    ],
    story:
      "A curious golden statue in the shape of a golden cat, the symbol of good fortune. Sometimes it seems as if the cat is waving its paw.",
    picture: 4
  }
];

let artifactsTest = [{}];

const Artifacts = () => {
  const [artifactNumber, setArtifactNumber] = useState(0);

  // useEffect(() => {
  //   artifactNumber < 10 &&
  //     fetch(
  //       `https://maskofgoblin.com/i18n/English/artifact/${artifactNumber}.json`
  //     )
  //       .then(res => {
  //         return res.json();
  //       })
  //       .then(data => artifactsTest.push({ ...data, picture: artifactNumber }))
  //       .then(setArtifactNumber(artifactNumber + 1));
  // }, [artifactNumber]);

  return (
    <div id={"content"}>
      <ArtifactContainer>
        {/* artifactTest */}
        {Artifact(artifact[artifactNumber])}
        {artifact.map((item, index) => (
          <ArtifactImage
            onClick={() => setArtifactNumber(index)}
            src={require(`../../Assets/artifacts/${item.name}.png`)}
            alt={`Picture of ${item.name}`}
            align="left"
          />
        ))}
      </ArtifactContainer>
    </div>
  );
};

export default Artifacts;
