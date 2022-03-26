import React, { useState, useGlobal, useEffect } from "reactn";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";

// Relative Imports
import { PerkCalculator } from "Components";
import { Flex, Filterbox, HeroImage } from "Styles";
import { AWSoperation, listHeros, Pagination } from "Aws";
import { sortedSearch } from "Helpers";
import { INIT_BUILD, PERK_URL_CHECK } from "Constants";

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

  const checkLength = urlSplit.map(
    (split, index) => PERK_URL_CHECK[index].length === split.length && true
  );
  const split = urlSplit.map((string) => string.split(""));

  const checkContent = split
    .map((v, index) =>
      v.map((a) => PERK_URL_CHECK[index].content.map((c) => a === c && true))
    )
    .flat();

  const checkTrue = checkContent
    .map((v, index) => !v.includes(true) && index)
    .filter((v) => v !== false);

  if (urlSplit.length < PERK_URL_CHECK.length) {
    hist.push({ hash: INIT_BUILD });
    return null;
  }

  if (checkLength.includes(false) || checkTrue.length > 0) {
    setError({
      message: "disfunctional URL",
      redirect: true,
      url: `/perks/${name}`,
      hash: INIT_BUILD,
    });
  } else return null;
};

export const PerksContainer = () => {
  // History
  const hist = useHistory();

  const urlHero = hist.location.pathname
    .split("/")
    .filter((v) => v)
    .slice(-1)
    .shift();
  const hero = urlHero.charAt(0).toUpperCase() + urlHero.slice(1).toLowerCase();
  const build = hist.location.hash.replace("#", "");

  // States
  const [reset, setReset] = useState(false);
  const [heroFilter, setHeroFilter] = useState("");
  const [heros, setHeros] = useState([]);
  const [copyHeroes, setCopyHeroes] = useState(heros);
  // DB
  const [nextToken, setNextToken] = useState(null);
  const [fetch, setFetch] = useState(true);
  const [fetchControl, setFetchControl] = useState(true);

  // Globals
  const [name, setName] = useGlobal("heroName");
  const [error, setError] = useGlobal("error");

  if (hero === "") {
    hist.push({
      pathname: "/perks/Kasel",
      hash: `#${INIT_BUILD}`,
    });
  }

  useEffect(() => {
    checkURL(build, setError, hero, hist);
  }, []);

  useEffect(() => {
    Pagination(listHeros)
      .then((heroes) => {
        setHeros(heroes);
        setCopyHeroes(sortedSearch(heroes, "name"));
      })
      .catch((error) => {
        history.pushState(error, "Error", "/404");
      });
    setName(hero);
  }, [fetch]);

  useEffect(() => {
    if (heroFilter !== "") {
      setHeros(sortedSearch(copyHeroes, "name", heroFilter));
    } else {
      setHeros(copyHeroes);
    }
  }, [heroFilter]);

  useEffect(() => {
    setReset(false);
  }, [reset]);

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
                <img
                  src={`/assets/heroes/${hero.name.toLowerCase()}/portrait.png`}
                  className="heroIcon"
                  data-tip
                  data-for={hero.name}
                  style={{height:"6rem"}}
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
      <PerkCalculator heroReset={reset} />
    </>
  );
};
