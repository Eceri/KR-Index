import React, { useState, useGlobal, useEffect } from "reactn";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

import { PerkCalculator, Image } from "Components";
import { Flex, Filterbox } from "Styles";
import { AWSoperation, listHeros, sortedSearch } from "Helpers";
import { INIT_BUILD } from "Constants";

// Styles
const HeroImage = styled.span`
  padding-right: 0.4rem;
  &:hover {
    cursor: pointer;
  }
`;

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
const checkURL = (build, setError, name, hist) => {
  if (build === "") {
    hist.replace({ hash: INIT_BUILD });
    return null;
  }
  const urlSplit = build.split("-");
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

  if (urlSplit.length < checkObject.length) {
    hist.push({ hash: INIT_BUILD });
    return null;
  }

  if (checkLength.includes(false) || checkTrue.length > 0) {
    setError({
      message: "disfunctional URL",
      redirect: true,
      url: `/perks/${name}/`,
      hash: INIT_BUILD,
    });
  }
};

export const PerksContainer = () => {
  // History
  const hist = useHistory();

  const hero = hist.location.pathname.split("/").slice(-1).shift();
  const build = hist.location.hash.replace("#", "");

  // States
  const [name, setName] = useState(hero);
  const [reset, setReset] = useState(false);
  const [heroFilter, setHeroFilter] = useState("");
  const [heros, setHeros] = useState([]);
  const [copyHeroes, setCopyHeroes] = useState(heros);
  // DB
  const [nextToken, setNextToken] = useState(null);
  const [fetch, setFetch] = useState(true);
  const [fetchControl, setFetchControl] = useState(true);

  // Globals
  const [error, setError] = useGlobal("error");

  if (hero === "") {
    hist.push({
      pathname: "/perks/Kasel",
      hash: `#${INIT_BUILD}`,
    });
  }

  useEffect(() => {
    checkURL(build, setError, hero, hist, setName);
  }, []);

  useEffect(() => {
    if (fetch && fetchControl) {
      try {
        AWSoperation(listHeros, { nextToken }).then((res) => {
          const { items, nextToken } = res.data.listHeros;
          let joinHeros = heros.concat(items);
          setNextToken(nextToken);
          setHeros(joinHeros);
          setCopyHeroes(sortedSearch(joinHeros, "name"));
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
    if (heroFilter !== "") {
      setHeros(sortedSearch(copyHeroes, "name", heroFilter));
    } else {
      setHeros(copyHeroes);
    }
  }, [heroFilter]);

  return (
    <>
      <Flex>
        <div style={{ width: "100%" }}>
          <Filterbox
            placeholder="Filter..."
            onChange={(event) =>
              setHeroFilter(event.currentTarget.value.toLowerCase())
            }
            value={heroFilter}
          />
          <div
            style={{
              overflowX: "scroll",
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
      </Flex>
      <PerkCalculator heroName={name} heroReset={reset} />
    </>
  );
};
