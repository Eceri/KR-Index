import React, { useGlobal, useState, useEffect } from "reactn";
import ReactTooltip from "react-tooltip";
import styles from "styled-components";

// Relative Imports
import { Image } from "../components";
import "../styles/genericPerks.css";

const CheckImage = styles((props) => <Image {...props} />)`
  filter: ${(props) => (props.active ? "" : "grayscale(100%)")};
  &:hover {
    cursor:pointer;
  }
`;

const cost = { 0: 10, 1: 15, 2: 15, 3: 15, 4: 15 };

const heroView = (perks) => {
  return perks.map((perk) => (
    <div className={"genericPerk"} key={perk.name}>
      <Image
        src={`genericPerks/${perk.name}.png`}
        className={"genericPerkIcon"}
      />
      <div>
        <h3 className={"genericPerkName"}>{perk.name}</h3>
        <p>{perk.effect}</p>
      </div>
    </div>
  ));
};

const isActive = (build, pos) => {
  const active = build[pos];
  if (active === "1") {
    return true;
  }
  if (active === "0") {
    return false;
  }
};

const perkView = (perks, tier, setBuild, build, url, name, tp, setTP) => {
  tier = tier - 1;

  const changer = (index) => {
    const { pathname } = location;
    const build = pathname.split("/").slice(-1)[0];
    let buildSplit = build.split("-");
    const buildTier = buildSplit[tier];
    let i = buildTier.split("");
    const value = i[index];

    if (value === "1") {
      i[index] = "0";
      setTP(tp + cost[tier]);
    }
    if (value === "0") {
      let costs = cost[tier];
      i[index] = "1";
      if (tier === 2 || tier === 3) {
        if ((i[0] === "1" && i[1] === "1") || (i[2] === "1" && i[3] === "1")) {
          if (index === 0) {
            i[index + 1] = "0";
          }
          if (index === 1) {
            i[index - 1] = "0";
          }
          if (index === 2) {
            i[index + 1] = "0";
          }
          if (index === 3) {
            i[index - 1] = "0";
          }
          costs = 0;
        }
      }

      setTP(tp - costs);
    }
    buildSplit[tier] = i.join("");

    setBuild(buildSplit.join("-"));
    history.pushState(tier, "Build", buildSplit.join("-"));
    isActive(buildSplit[tier], index);
  };

  const type = [
    { shortcut: "l", name: "Light", perkName: "light" },
    { shortcut: "d", name: "Dark", perkName: "dark" },
  ];

  const chooseTier = (perks, tier) => {
    let sliceTier;
    url = `heroes/${name}`;

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
                className="genericPerkIcon"
                dataTip
                dataFor={`${url}/${perk}${_type.shortcut}.png`}
                active={isActive(
                  build.split("-")[tier],
                  darkChange(index, _type)
                )}
              />
              <ReactTooltip id={`${url}/${perk}${_type.shortcut}.png`}>
                <p>{`${mapSkillInfo(perks[perk].skillInfo)} [${
                  _type.name
                }]`}</p>
                <p>{perks[perk][_type.perkName]}</p>
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
      url = `heroes/${name}`;
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
            <p>{perks.general.dark}</p>
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
          src={`${url}${perk.name}.png`}
          className={"genericPerkIcon"}
          dataTip
          dataFor={perk.name}
          active={isActive(build.split("-")[tier], index)}
        />
        <ReactTooltip id={perk.name}>
          <p>{perk.name}</p>
          <p>{perk.effect}</p>
        </ReactTooltip>
      </div>
    ));
  };

  return <div style={{ display: "flex" }}>{chooseTier(perks, tier)}</div>;
};

export const GenericPerks = (props) => {
  const [build, setBuild] = useGlobal("build");
  const [tp, setTP] = useGlobal("tp");

  let { perks, url, name } = props;
  const { tier } = props;

  useEffect(() => {
    const tp = 95;
    const build = location.pathname.split("/").slice(-1)[0];
    console.log(build);
    setBuild(build);
    const buildSplit = build.split("-");
    // split every number, so it easier to count how many are perks active
    const splits = buildSplit.map((v) => v.split(""));
    const costs = splits.map((split, index) =>
      split.map((number) => {
        if (number === "1") return cost[index];
      })
    );
    const filterCosts = costs.flat().filter((v) => v !== undefined);
    let counter = 0;
    filterCosts.map((cost) => (counter += cost));
    console.log(counter);
    setTP(tp - counter);
  }, []);

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
        ? perkView(perks, tier, setBuild, build, url, name, tp, setTP)
        : heroView(perks)}
    </div>
  );
};
export default GenericPerks;
