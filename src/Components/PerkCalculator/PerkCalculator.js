import React, { useEffect, useState, useGlobal } from "reactn";
import styles from "styled-components";
import ReactTooltip from "react-tooltip";

// Relative imports
import { AWSoperation, getHeroSkills, listHeros, sortedSearch } from "Helpers";
import { ClassPerks, TierOnePerks, Image, GenericPerks } from "Components";
import { Filterbox } from "Styles";
import { INIT_BUILD, PERK_SAMPLE } from "Constants";
import { Button } from "Atoms";

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
  margin:auto;
  padding: 1rem;
  @media only screen and (max-width: 650px) {
    padding: 0;
  }
`;

const HeroImage = styles.span`
  padding-right: 0.4rem;
  &:hover {
    cursor: pointer;
  }
`;

const TP = styles.div`
  color: ${(props) => (props.value < 0 ? "red" : "white")}
  padding-right: 1rem;
`;

const CopyTP = styles.input`
  margin-left: 2rem;
  padding: 0.2rem;
  width: 13rem;
  &:hover {
    cursor: pointer;
  }
`;

const copyToClipboard = (copy) => {
  navigator.clipboard.writeText(copy);
};

const renderPerks = (
  heroClass,
  name,
  perks,
  link,
  tp,
  setReset,
  copySuccess,
  setCopySuccess
) => {
  console.log(link);
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
        <div>
          <div style={{ marginBottom: "0.75rem" }}>{displayName}</div>
          <Image
            src={`heroes/${name.toLowerCase()}/portrait.png`}
            className="heroIcon"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "7rem",
            paddingRight: "0.75rem",
          }}
        >
          <TP value={tp}>TP: {tp}</TP>
          <Button onClick={() => setReset(true)}>Reset</Button>
        </div>
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
      <Row style={{ paddingRight: "0.75rem", margin: "1rem 1rem 0 0" }}>
        <CopyTP
          readOnly
          value={link}
          onClick={() => {
            copyToClipboard(location.href);
            setCopySuccess(true);
          }}
          data-tip
        />
        <ReactTooltip className="tooltip">Copy to clipboard</ReactTooltip>
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

const handleWheel = (event, fetch, setFetch) => {
  const container = document.getElementById("verticalScroll");
  let containerScrollPosition = container.scrollLeft;
  container.scrollTo({
    top: 0,
    left: (containerScrollPosition += event.deltaY),
  });

  if (
    container.clientWidth + containerScrollPosition + event.deltaY <
      container.scrollWidth ||
    fetch
  )
    return;
  setFetch(true);
};

const checkURL = (url, setError, name) => {
  const urlSplit = url.split("-");
  const checkObject = [
    { length: 5, content: ["0", "1"] },
    { length: 5, content: ["0", "1"] },
    { length: 2, content: ["0", "l", "d"] },
    { length: 2, content: ["0", "l", "d"] },
    { length: 2, content: ["0", "1"] },
  ];
  const checkLength = urlSplit.map(
    (split, index) => checkObject[index].length === split.length && true
  );
  const split = urlSplit.map((string) => string.split(""));

  const checkContent = split
    .map((v, index) =>
      v.map((a) => checkObject[index].content.map((c) => a === c && true))
    )
    .flat();

  const checkTrue = checkContent
    .map((v, index) => !v.includes(true) && index)
    .filter((v) => v !== false);

  if (checkLength.includes(false) || checkTrue.length > 0) {
    setError({
      message: "disfunctional URL",
      redirect: true,
      url: `/perks/${name}/${INIT_BUILD}`,
    });
  }
};

export const PerkCalculator = (props) => {
  const [name, setName] = useState("Kasel");
  const [reset, setReset] = useState(false);
  const [perks, setPerks] = useState(PERK_SAMPLE);
  const [heros, setHeros] = useState([]);
  const [heroFilter, setHeroFilter] = useState("");
  const [link, setLink] = useState(location.href);
  const [globalBuild, setGlobalBuild] = useGlobal("build");
  const [tp, setTP] = useGlobal("tp");
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useGlobal("error");
  const [nextToken, setNextToken] = useState(null);
  const [copyHeroes, setCopyHeroes] = useState(heros);
  const [fetch, setFetch] = useState(true);
  const [fetchControl, setFetchControl] = useState(true);

  let { hero, build } = props.match.params;

  if (hero === undefined || build === undefined) {
    history.pushState("Redirect", "Redirect", `/perks/Kasel/${INIT_BUILD}`);
    location.reload();
  }
  useEffect(() => {
    checkURL(build, setError, hero);
    if (fetch && fetchControl) {
      try {
        AWSoperation(listHeros, { nextToken }).then((res) => {
          const { items, nextToken } = res.data.listHeros;
          let joinHeros = heros.concat(items);
          setNextToken(nextToken);
          // const sorted = sortedSearch(joinHeros, "name", "");
          setHeros(joinHeros);
          setCopyHeroes(joinHeros);
          if (nextToken === null) {
            setFetchControl(false);
          }
        });
        setFetch(false);
      } catch (error) {
        history.pushState(error, "Error", "/404");
      }
    }

    setName(hero);
  }, [fetch]);

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
    if (reset) {
      history.pushState(name, name, `/perks/${name}/${INIT_BUILD}`);
      setLink(location.pathname.replace("/perks/", ""));
      setGlobalBuild(INIT_BUILD);
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

  useEffect(() => {
    if (heroFilter !== "") {
      setHeros(sortedSearch(copyHeroes, "name", heroFilter));
    } else {
      setHeros(copyHeroes);
    }
  }, [heroFilter]);

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
              height: "7.4rem",
              display: "flex",
            }}
            id="verticalScroll"
            onWheel={(event) => handleWheel(event, fetch, setFetch)}
          >
            {heros.map((hero) => (
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
                  globalEventOff="touchstart"
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
        {renderPerks(
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
