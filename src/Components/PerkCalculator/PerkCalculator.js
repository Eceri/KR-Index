import React, { useEffect, useState, useGlobal } from "reactn";
import styles from "styled-components";

// Relative imports
import {
  AWSoperation,
  getHeroSkills,
  listHeros,
  AWSoperationLists,
} from "Helpers";
import { ClassPerks, TierOnePerks, Image, GenericPerks } from "Components";
import ReactTooltip from "react-tooltip";
import { Filterbox, Button } from "Styles";

const samplePerks = {
  s1: {
    light: "",
    dark: "",
    skillInfo: [],
  },
  s2: {
    light: "",
    dark: "",
    skillInfo: [],
  },
  s3: {
    light: "",
    dark: "",
    skillInfo: [],
  },
  s4: {
    light: "",
    dark: "",
    skillInfo: [],
  },
  general: {
    light: "",
    dark: "",
  },
};

// Styles
const Row = styles.div`
  display: flex;
  & h3 {
    margin-right: 1rem;
    text-align: center;
    margin-top: 1.5rem;
  }
`;

const Container = styles.div`
  display: flex;
`;

const PerkContainer = styles.div`
  padding: 2rem;
`;

const HeroImage = styles.span`
  padding-right: 0.4rem;
  &:hover {
    cursor: pointer;
  }
`;

const TP = styles.div`
  color: ${(props) => (props.value < 0 ? "red" : "white")}
`;

const CopyTP = styles.input`
  margin: 1rem;
  padding: 0.2rem;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const copyToClipboard = (copy) => {
  navigator.clipboard.writeText(copy);
};

const genericWrapper = (
  heroClass,
  name,
  perks,
  link,
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
        <div>{displayName}</div>
        <TP value={tp}>TP: {tp}</TP>
        <button onClick={() => setReset(true)}>Reset</button>
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
      <Row>
        <CopyTP
          readOnly
          value={link}
          onClick={() => {
            copyToClipboard(location.href);
            setCopySuccess(true);
          }}
        />
        <button
          style={{
            height: "2rem",
            backgroundColor: "transparent",
            color: "white",
            marginTop: "0.8rem",
          }}
          onClick={() => {
            copyToClipboard(location.href);
            setCopySuccess(true);
          }}
        >
          Copy
        </button>
      </Row>
      {copySuccess && <div>Successfull copied link</div>}
    </PerkContainer>
  );
};

const handleWheel = (event) => {
  const container = document.getElementById("verticalScroll");
  let containerScrollPosition = container.scrollLeft;
  container.scrollTo({
    top: 0,
    left: (containerScrollPosition += event.deltaY),
  });
};

const resetBuild = "00000-00000-0000-0000-00";
export const PerkCalculator = (props) => {
  const [name, setName] = useState("Kasel");
  const [reset, setReset] = useState(false);
  const [perks, setPerks] = useState(samplePerks);
  const [heros, setHeros] = useState([]);
  const [heroFilter, setHeroFilter] = useState("");
  const [link, setLink] = useState(location.href);
  const [globalBuild, setGlobalBuild] = useGlobal("build");
  const [tp, setTP] = useGlobal("tp");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    AWSoperationLists(listHeros).then((res) => setHeros(res));
    setName(props.match.params.hero);
  }, []);

  useEffect(() => {
    AWSoperation(getHeroSkills, { name: name }).then((res) => {
      console.log(res);
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
    if (reset) {
      history.pushState(name, name, `/perks/${name}/${resetBuild}`);
      setGlobalBuild(resetBuild);
      setTP(95);
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    setLink(location.pathname.replace("/perks/", ""));
  }, [globalBuild]);

  useEffect(() => {
    if (copySuccess) {
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }
  }, [copySuccess]);

  return (
    <>
      <Container>
        <div style={{ width: "100%" }}>
          <Filterbox
            placeholder="Filter..."
            onChange={(event) => setHeroFilter(event.currentTarget.value)}
            value={heroFilter}
          />
          <div
            style={{
              overflow: "auto",
              marginTop: "1.5rem",
              height: "8rem",
              display: "flex",
            }}
            id="verticalScroll"
            onWheel={(event) => handleWheel(event)}
          >
            {heros
              .sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              })
              .map((hero) => (
                <HeroImage
                  key={hero.name}
                  onClick={() => {
                    setName(hero.name);
                    setReset(true);
                  }}
                >
                  <Image
                    src={`heroes/${hero.name.toLowerCase()}/portrait.png`}
                    className="heroIcon"
                    dataTip
                    dataFor={hero.name}
                  />
                  <ReactTooltip
                    border={true}
                    id={hero.name}
                    className="tooltip"
                  >
                    {hero.name}
                  </ReactTooltip>
                </HeroImage>
              ))}
          </div>
        </div>
      </Container>
      <Container>
        {genericWrapper(
          perks.heroClass,
          name,
          perks,
          link,
          tp,
          setReset,
          copySuccess,
          setCopySuccess
        )}
      </Container>
    </>
  );
};
