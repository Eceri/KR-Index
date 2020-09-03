import React, { useGlobal, useEffect, useState } from "reactn";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

// Relative Imports
import { PERK_COSTS, INIT_BUILD } from "Constants";
import "../styles/genericPerks.css";

const CheckImage = styled((props) => <img {...props} />)`
  filter: ${(props) => (props.active ? "" : "grayscale(100%)")};
  &:hover {
    cursor: pointer;
  }
  width: 4rem;
  height: auto;
  min-height: 4rem;
  margin-top: 0.3rem;
  margin-right: 0.75rem;
  @media only screen and (max-width: 650px) {
    width: 3rem;
    min-height: 3rem;
    margin-top: 0.1rem;
    margin-right: 0.4rem;
  }
`;

const PerkEffect = styled.p`
  padding-top: 0.5rem;
  width: 12rem;
`;

const heroView = (perks) => {
  return perks.map((perk) => (
    <div className={"genericPerk"} key={perk.name}>
      <img
        src={`/assets/genericPerks/${perk.name}.png`}
        className={"genericPerkIcon"}
      />
      <div>
        <h3 className={"genericPerkName"}>{perk.name}</h3>
        <p>{perk.effect}</p>
      </div>
    </div>
  ));
};

const isActive = (build, pos, tier) => {
  if (tier === 2 || tier === 3) {
    if (build[0] === "l" && pos === 0) {
      return true;
    }
    if (build[0] === "d" && pos === 1) {
      return true;
    }
    if (build[1] === "l" && pos === 2) {
      return true;
    }
    if (build[1] === "d" && pos === 3) {
      return true;
    }
  } else {
    const active = build[pos];
    if (active !== "0") {
      return true;
    } else {
      return false;
    }
  }
};

const perkView = (perks, tier, setBuild, build, url, name, tp, setTP, hist) => {
  tier = tier - 1;

  const changer = (index) => {
    const build = hist.location.hash.replace("#", "");
    let buildSplit = build.split("-");
    const buildTier = buildSplit[tier];
    let i = buildTier.split("");
    let value = i[index];
    let costs = PERK_COSTS[tier];

    if (tier === 2 || tier === 3) {
      let situation;
      switch (index) {
        case 0:
          situation = 0;
          break;
        case 1:
          situation = 0;
          break;
        case 2:
          situation = 1;
          break;
        case 3:
          situation = 1;
          break;
        default:
          break;
      }
      value = i[situation];
      if (value === "l" && index === 1) {
        i[situation] = "d";
        costs = 0;
      }
      if (value === "l" && index === 3) {
        i[situation] = "d";
        costs = 0;
      }
      if (value === "d" && index === 0) {
        i[situation] = "l";
        costs = 0;
      }
      if (value === "d" && index === 2) {
        i[situation] = "l";
        costs = 0;
      }
      if (value === "l" && index === 0) {
        i[situation] = "0";
        setTP(tp + costs);
      }
      if (value === "l" && index === 2) {
        i[situation] = "0";
        setTP(tp + costs);
      }
      if (value === "d" && index === 1) {
        i[situation] = "0";
        setTP(tp + costs);
      }
      if (value === "d" && index === 3) {
        i[situation] = "0";
        setTP(tp + costs);
      }
      if (value === "0") {
        switch (index) {
          case 0:
            i[situation] = "l";
            break;
          case 1:
            i[situation] = "d";
            break;
          case 2:
            i[situation] = "l";
            break;
          case 3:
            i[situation] = "d";
            break;
          default:
            break;
        }
        setTP(tp - costs);
      }
    } else {
      if (value === "0") {
        i[index] = "1";
        setTP(tp - costs);
      }
      if (value === "1") {
        i[index] = "0";
        setTP(tp + costs);
      }
    }

    buildSplit[tier] = i.join("");

    const buildJoin = buildSplit.join("-");
    setBuild(buildJoin);
    hist.replace({ hash: buildJoin });
    isActive(buildSplit[tier], index);
  };

  const type = [
    { shortcut: "l", name: "Light", perkName: "light" },
    { shortcut: "d", name: "Dark", perkName: "dark" },
  ];

  const chooseTier = (perks, tier) => {
    let sliceTier;
    url = `/assets/heroes/${name}`;

    const mapSkillInfo = (skills) => {
      const result = skills.map((skill) => skill.name);
      return result.join(" / ");
    };

    const changeSequence = (array) => {
      let res = [];
      res.push(array[0]);
      res.push(array[2]);
      res.push(array[1]);
      res.push(array[3]);
      return res;
    };

    const darkChange = (index, type) => {
      if (type.shortcut === "l") {
        const lightArray = [0, 2];
        return lightArray[index];
      }
      if (type.shortcut === "d") {
        const darkArray = [1, 3];
        return darkArray[index];
      }
    };

    const renderTierRow = (sliceTier) => {
      if (sliceTier === undefined) {
        sliceTier = 0;
      }
      const result = type.map((_type) =>
        Object.keys(perks)
          .slice(...sliceTier)
          .map((perk, index) => (
            <div
              key={`${perk}+${_type.name}`}
              className="genericPerk"
              onClick={() => changer(darkChange(index, _type))}
            >
              <CheckImage
                src={`${url}/${perk}${_type.shortcut}.png`}
                dataTip
                dataFor={`${url}/${perk}${_type.shortcut}.png`}
                active={isActive(
                  build.split("-")[tier],
                  darkChange(index, _type),
                  tier
                )}
              />
              <ReactTooltip id={`${url}/${perk}${_type.shortcut}.png`}>
                <p>{`${mapSkillInfo(perks[perk].skillInfo)} [${
                  _type.name
                }]`}</p>
                <PerkEffect>{perks[perk][_type.perkName]}</PerkEffect>
              </ReactTooltip>
            </div>
          ))
      );

      const flatten = result.flat();

      return changeSequence(flatten);
    };

    if (tier < 2) {
      return renderPerkRow(perks);
    }
    if (tier === 2) {
      sliceTier = [0, 2];
      return renderTierRow(sliceTier);
    }
    if (tier === 3) {
      sliceTier = [2, 4];
      return renderTierRow(sliceTier);
    }
    if (tier === 4) {
      const t5Array = ["light", "dark"];
      url = `/assets/heroes/${name}`;
      return t5Array.map((t5, index) => (
        <div
          key={`${t5}${index}`}
          className="genericPerk"
          onClick={() => changer(index)}
        >
          <CheckImage
            src={`${url}/${t5}.png`}
            className="genericPerkIcon"
            dataTip
            dataFor={`${url}/${t5}.png`}
            active={isActive(build.split("-")[tier], index)}
          />
          <ReactTooltip id={`${url}/${t5}.png`}>
            <p>{`${name.charAt(0).toUpperCase()}${name.slice(1)} [${t5
              .charAt(0)
              .toUpperCase()}${t5.slice(1)}]`}</p>
            <PerkEffect>{perks.general[t5]}</PerkEffect>
          </ReactTooltip>
        </div>
      ));
    }
  };

  const renderPerkRow = (perks) => {
    url = "genericPerks/";
    return perks.map((perk, index) => (
      <div
        className={"genericPerk"}
        key={perk.name}
        onClick={() => changer(index)}
      >
        <CheckImage
          src={`/assets/${url}${perk.name}.png`}
          className={"genericPerkIcon"}
          dataTip
          dataFor={perk.name}
          active={isActive(build.split("-")[tier], index)}
        />
        <ReactTooltip id={perk.name}>
          <p>{perk.name}</p>
          <PerkEffect>{perk.effect}</PerkEffect>
        </ReactTooltip>
      </div>
    ));
  };

  return <div style={{ display: "flex" }}>{chooseTier(perks, tier)}</div>;
};

export const GenericPerks = (props) => {
  // Props
  let { perks, url, name } = props;
  const { tier } = props;

  // State
  const [build, setBuild] = useState(INIT_BUILD);

  // Globals
  const [globalBuild, setGlobalBuild] = useGlobal("build");
  const [tp, setTP] = useGlobal("tp");

  // History
  const hist = useHistory();
  const location = useLocation();
  let { hash } = location;

  useEffect(() => {
    hash = hash.replace("#", "");
    if (hash !== build && hash !== "") {
      setBuild(hash);
    }
  }, [hash]);

  useEffect(() => {
    const tp = 95;

    const buildSplit = build.split("-");
    // split every number, so it easier to count how many perks are active
    const splits = buildSplit.map((v) => v.split(""));
    const costs = splits.map((split, index) =>
      split.map((number) => {
        if (number !== "0") return PERK_COSTS[index];
      })
    );
    const filterCosts = costs.flat().filter((v) => v !== undefined);
    let counter = 0;
    filterCosts.map((cost) => (counter += cost));
    setTP(tp - counter);
  }, [build, globalBuild]);

  if (perks === undefined) {
    perks = [
      { name: "", effect: "" },
      { name: "", effect: "" },
      { name: "", effect: "" },
      { name: "", effect: "" },
      { name: "", effect: "" },
      { name: "", effect: "" },
    ];
  }
  if (url === undefined) {
    url = "genericPerks/";
  }
  if (name === undefined) {
    name = "Kasel";
  }

  const { pathname } = location;
  return (
    <div>
      {pathname.includes("/perks")
        ? perkView(perks, tier, setBuild, build, url, name, tp, setTP, hist)
        : heroView(perks)}
    </div>
  );
};
export default GenericPerks;
