import React, { useEffect, useState, useGlobal } from "reactn";
import { useHistory, useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip";

// Relative imports
import { AWSoperation, getHeroSkills, createHelmet } from "Helpers";
import { ClassPerks, TierOnePerks, GenericPerks } from "Components";
import { TP, Row, PerkContainer, Flex, Questionmark } from "Styles";
import { INIT_BUILD, PERK_SAMPLE } from "Constants";
import { Button } from "Atoms";
import { HeroHeader } from "Components";

const copyToClipboard = (copy) => {
  navigator.clipboard.writeText(copy);
};

const renderPerks = (
  heroClass,
  name,
  perks,
  tp,
  setReset,
  copySuccess,
  setCopySuccess
) => {
  let displayName;
  if (name === undefined) {
    name = "kasel";
    displayName = "Kasel";
  } else {
    displayName = name;
    name = name.toLowerCase();
  }
  return (
    <PerkContainer>
      <Row style={{ justifyContent: "space-between" }}>
        <HeroHeader />
      </Row>
      <Row style={{ justifyContent: "flex-end" }}>
        <TP value={tp}>TP: {tp}</TP>
        <Questionmark data-tip>?</Questionmark>
        <ReactTooltip border={true}>
          {/* TODO: Need better Sentence */}
          To get all 95 TP you need to buy Transcendence Attribute points and
          apply it your Hero of choice
        </ReactTooltip>
        <Button onClick={() => setReset(true)}>Reset</Button>
      </Row>
      <Row>
        <h3>T1</h3>
        <TierOnePerks />
      </Row>
      <Row>
        <h3>T2</h3>
        <ClassPerks heroClass={heroClass} />
      </Row>
      <Row>
        <h3>T3</h3>
        <GenericPerks tier={3} name={name} perks={perks} />
      </Row>
      <Row>
        <h3 style={{ visibility: "hidden" }}>T3</h3>
        <GenericPerks tier={4} name={name} perks={perks} />
      </Row>
      <Row>
        <h3>T5</h3>
        <GenericPerks tier={5} perks={perks} name={name} />
      </Row>
      <Row
        style={{
          justifyContent: "space-between",
        }}
      >
        <div></div>
        <Button
          icon="clipboard"
          onClick={() => {
            copyToClipboard(location.href);
            setCopySuccess(true);
          }}
        >
          {copySuccess ? <span>Copied!</span> : <div>Copy to clipboard</div>}
        </Button>
      </Row>
    </PerkContainer>
  );
};

export const PerkCalculator = (props) => {
  // Props
  const { heroName, heroReset } = props;

  // history
  const hist = useHistory();
  const location = useLocation();
  const { pathname, hash } = location;

  // State
  const [name, setName] = useState(heroName);
  const [reset, setReset] = useState(false);
  const [perks, setPerks] = useState(PERK_SAMPLE);
  const [copySuccess, setCopySuccess] = useState(false);

  // Globals
  const [tp, setTP] = useGlobal("tp");
  const [globalBuild, setGlobalBuild] = useGlobal("build");

  useEffect(() => {
    const hero = pathname.split("/").slice(-1).shift();
    setName(hero);
  }, [pathname]);

  useEffect(() => {
    AWSoperation(getHeroSkills, { name: name }).then((res) => {
      const { dark, light, skill1, skill2, skill3, skill4 } = res.data.getHero;
      setPerks({
        s1: {
          light: skill1.light,
          dark: skill1.dark,
          skillInfo: skill1.skillInfo,
        },
        s2: {
          light: skill2.light,
          dark: skill2.dark,
          skillInfo: skill2.skillInfo,
        },
        s3: {
          light: skill3.light,
          dark: skill3.dark,
          skillInfo: skill3.skillInfo,
        },
        s4: {
          light: skill4.light,
          dark: skill4.dark,
          skillInfo: skill4.skillInfo,
        },
        general: {
          light: light,
          dark: dark,
        },
        heroClass: res.data.getHero.class,
      });
    });
  }, [name]);

  useEffect(() => {
    if (copySuccess) {
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }
  }, [copySuccess]);

  useEffect(() => {
    setName(heroName);
    if (heroReset) {
      setReset(true);
    }
  }, [heroReset, heroName]);

  useEffect(() => {
    if (reset) {
      hist.push({
        pathname: `/perks/${name}`,
        hash: `#${INIT_BUILD}`,
      });
      setGlobalBuild(INIT_BUILD);
      setTP(95);
      setReset(false);
    }
  }, [reset]);

  return (
    <>
      {createHelmet(`Perks - ${name}`, name)}
      <Flex>
        {renderPerks(
          perks.heroClass,
          name,
          perks,
          tp,
          setReset,
          copySuccess,
          setCopySuccess
        )}
      </Flex>
    </>
  );
};
