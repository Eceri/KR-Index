import React, { useState } from "react";
import "./styles/caps.css";

export const StatCaps = () => {
  const [statValue, setStatValue] = useState(0);

  const handleChange = (event) => setStatValue(event.target.value);

  //softCap is different for CC Res and CC-Acc(X1 instead of X2), so its passed separately
  const createTableRow = (stat, softCap) => {
    const [clicked, setClicked] = useState(false);
    return (
      <tr
        key={name}
        class={clicked ? "selected " : ""}
        onClick={() => setClicked(!clicked)}
      >
        <td>{stat.name}</td>
        <td>{softCap}</td>
        <td>{getActualStat(stat)}%</td>
      </tr>
    );
  };
  //Thanks to duckness for the work done here.
  const crit = {
    name: "Crit",
    MaxK: 2000,
    X1: 2000,
    A1: 1,
    B1: 1500,
    X2: 1500,
    A2: 500,
    B2: 750,
    MinK: 0,
    X3: -500,
    A3: 0,
    B3: 0,
    X4: 0,
    A4: 0,
    B4: 0,
  };
  const acc = {
    name: "Acc",
    MaxK: 2000,
    X1: 2000,
    A1: 1,
    B1: 1500,
    X2: 1500,
    A2: 500,
    B2: 750,
    MinK: -920,
    X3: -2,
    A3: 3,
    B3: -938,
    X4: 1,
    A4: 0,
    B4: 0,
  };
  const ccAcc = {
    name: "CC Acc",
    MaxK: 900,
    X1: 900,
    A1: 1000000,
    B1: 1000000,
    X2: 450,
    A2: 1000,
    B2: 0,
    MinK: 0,
    X3: -500,
    A3: 0,
    B3: 0,
    X4: 0,
    A4: 0,
    B4: 0,
  };
  const block = {
    name: "Block",
    MaxK: 1000,
    X1: 1000,
    A1: 3,
    B1: 0,
    X2: 500,
    A2: 500,
    B2: 250,
    MinK: 0,
    X3: -500,
    A3: 0,
    B3: 0,
    X4: 0,
    A4: 0,
    B4: 0,
  };
  const dodge = {
    name: "Dodge",
    MaxK: 1000,
    X1: 1000,
    A1: 3,
    B1: 0,
    X2: 500,
    A2: 500,
    B2: 250,
    MinK: 0,
    X3: -500,
    A3: 0,
    B3: 0,
    X4: 0,
    A4: 0,
    B4: 0,
  };
  const lifesteal = {
    name: "Lifesteal",
    MaxK: 1000,
    X1: 1000,
    A1: 3,
    B1: 0,
    X2: 500,
    A2: 500,
    B2: 250,
    MinK: 0,
    X3: -500,
    A3: 0,
    B3: 0,
    X4: 0,
    A4: 0,
    B4: 0,
  };
  const critResist = {
    name: "Crit Resist",
    MaxK: 1000,
    X1: 1000,
    A1: 3,
    B1: 0,
    X2: 500,
    A2: 500,
    B2: 250,
    MinK: 0,
    X3: -500,
    A3: 0,
    B3: 0,
    X4: 0,
    A4: 0,
    B4: 0,
  };
  const ccResist = {
    name: "CC Resist",
    MaxK: 1000,
    X1: 1000,
    A1: 1000000,
    B1: 1000000,
    X2: 500,
    A2: 1000,
    B2: 0,
    MinK: 0,
    X3: -500,
    A3: 0,
    B3: 0,
    X4: 0,
    A4: 0,
    B4: 0,
  };
  const pen = {
    name: "Penetration",
    MaxK: 900,
    X1: 1000,
    A1: 2,
    B1: 1000,
    X2: 450,
    A2: 409,
    B2: 266,
    MinK: 0,
    X3: -500,
    A3: 0,
    B3: 0,
    X4: 0,
    A4: 0,
    B4: 0,
  };
  const aspd = {
    name: "ASPD",
    MaxK: 2500,
    X1: 2400,
    A1: 1,
    B1: -733,
    X2: 1600,
    A2: 500,
    B2: 800,
    MinK: 250,
    X3: -10000,
    A3: 0,
    B3: 0,
    X4: 500,
    A4: 1,
    B4: -1500,
  };
  const blockDef = {
    name: "Block DEF",
    MaxK: 450,
    X1: 775,
    A1: 3,
    B1: 1500,
    X2: 225,
    A2: 204,
    B2: 179,
    MinK: -920,
    X3: -2,
    A3: 3,
    B3: -938,
    X4: -1,
    A4: 0,
    B4: 0,
  };
  const manaPerAttack = {
    name: "Mana/Attack",
    MaxK: 2300,
    X1: 2400,
    A1: 1,
    B1: -900,
    X2: 1200,
    A2: 500,
    B2: 600,
    MinK: 0,
    X3: -500,
    A3: 0,
    B3: 0,
    X4: 0,
    A4: 0,
    B4: 0,
  };
  const getActualStat = (statType) => {
    let actual;
    if (statValue === 0) {
      actual = 0;
      // 2nd upper softcap
    } else if (statValue > statType.X1) {
      actual = attenuateInv(statValue, statType.MaxK, statType.A1, statType.B1);
      // 1st upper softcap
    } else if (statValue > statType.X2) {
      actual = Math.floor((statValue * statType.A2) / 1000) + statType.B2;
      // 2nd lower softcap
    } else if (statValue < statType.X3) {
      actual = attenuateInv(statValue, statType.MinK, statType.A3, statType.B3);
      // 1st lower softcap
    } else if (statValue < statType.X4) {
      actual = attenuate(statValue, statType.MinK, statType.A4, statType.B4);
      // uncapped
    } else {
      actual = statValue;
    }
    // return to 1 significant decimal place
    actual = Math.round(actual) / 10;
    return actual.toFixed(1);
  };

  const attenuateInv = (x, k, a, b) => {
    let actual = k - Math.floor((k * 1000000) / (a * x * x + b * x + 1000000));
    console.log(actual);
    return actual;
  };
  const attenuate = (x, k, a, b) => {
    return Math.floor((k * 1000000) / (a * x * x + b * x + 1000000));
  };
  //duckness end
  return (
    <div id="caps">
      <h1>Calculator</h1>
      <p>
        <span id={"statInput"}>Raw Stat Value:</span>
        <input
          type="number"
          id="valueInput"
          name="statValueInput"
          value={statValue}
          onChange={handleChange}
        />
      </p>
      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Softap</th>
            <th>Actual Value</th>
          </tr>
        </thead>
        <tbody>
          {createTableRow(crit, crit.X2)}
          {createTableRow(acc, acc.X2)}
          {createTableRow(ccAcc, ccAcc.X1)}
          {createTableRow(block, block.X2)}
          {createTableRow(dodge, dodge.X2)}
          {createTableRow(lifesteal, lifesteal.X2)}
          {createTableRow(critResist, critResist.X2)}
          {createTableRow(ccResist, ccResist.X1)}
          {createTableRow(pen, pen.X2)}
          {createTableRow(aspd, aspd.X2)}
          {createTableRow(blockDef, blockDef.X2)}
          {createTableRow(manaPerAttack, manaPerAttack.X2)}
        </tbody>
      </table>

      {/* <br></br>
      <p id="thanks">
        Thanks to{" "}
        <a href="https://github.com/duckness" target="_blank" style ={{color:"pink"}}>
          Duckness
        </a>{" "}
         for his work with the stats.
      </p> */}
    </div>
  );
};

export default StatCaps;
