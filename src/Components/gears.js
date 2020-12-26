import React, { useState } from "react";
import styles from "styled-components";
import { colors } from "./styles/styles.colors";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export const Gears = () => {
  console.log("GEARS CALLED");
  return (
    <div>
      <h1>Gears</h1>

      <h2>Technomagic Gear</h2>
      <Tabs >
        <TabList>
          <Tab>Galgoria</Tab>
          <Tab>Siegfried</Tab>
          <Tab>Ascalon</Tab>
        </TabList>
        <TabPanel>{renderTMGear(technomagicGear.galgoria)}</TabPanel>
        <TabPanel> {renderTMGear(technomagicGear.siegfried)}</TabPanel>
        <TabPanel> {renderTMGear(technomagicGear.ascalon)}</TabPanel>
      </Tabs>
      <br />
      <div> 
        <h3>Available Options</h3>
      </div>
      <h2>Dragon &amps; Field Raids</h2>
    </div>
  );
};

const GearTable = styles.table`
  border-collapse: collapse;
`;

const GearTableData = styles.td`
  border: 2px solid ${colors.nav};
  padding: 5px;
`;

const GearTableRow = styles.tr`
`;

const renderTMGear = (gearInfos) => (
  <>
    <h3>{gearInfos.name}</h3>
    <div>
      <GearTable>
        <tr>
          <GearTableData>Knight</GearTableData>
          <GearTableData>{gearInfos.knight}</GearTableData>
        </tr>
        <GearTableRow>
          <GearTableData>Warrior</GearTableData>
          <GearTableData>{gearInfos.warrior}</GearTableData>
        </GearTableRow>
        <tr>
          <GearTableData>Assassin</GearTableData>
          <GearTableData>{gearInfos.assassin}</GearTableData>
        </tr>
        <tr>
          <GearTableData>Archer</GearTableData>
          <GearTableData>{gearInfos.archer}</GearTableData>
        </tr>
        <tr>
          <GearTableData>Mechanic</GearTableData>
          <GearTableData>{gearInfos.mechanic}</GearTableData>
        </tr>
        <tr>
          <GearTableData>Wizard</GearTableData>
          <GearTableData>{gearInfos.wizard}</GearTableData>
        </tr>
        <tr>
          <GearTableData>Priest</GearTableData>
          <GearTableData>{gearInfos.priest}</GearTableData>
        </tr>
      </GearTable>
    </div>
  </>
);

const dragonGear = {
  fire: {},
  frost: {},
  poison: {},
  black: {},
};
const fieldRaidGear = {
  lava: {},
  heroProtection: {},
  heroSuppression: {},
  darkLegion: {},
};

const galgoriaAtkSkill = `Increased DMG dealt to enemies by 10%, and ATK by 10%. This effect increases up to max 25% over 100 sec.`;
const galgoriaCdmgSkill = `Increases DMG dealt to enemies by 10%, and Crit DMG by 20%. This effect increases up to max 25% and Crit DMG up to max 50% over 100 sec.`;
const technomagicGear = {
  options: {},
  galgoria: {
    name: "Perseverance",
    knight:
      "Increases DMG dealt to enemies by 10% and takes 10% reduced All DMG. This effect increases up to max 20% over 50 sec.",
    warrior: galgoriaAtkSkill,
    assassin: galgoriaAtkSkill,
    archer: galgoriaAtkSkill,
    mechanic: galgoriaCdmgSkill,
    wizard: galgoriaCdmgSkill,
    priest:
      "Increases the amount own Heal Rate effects by 25% and Shield by 25%.",
    drop: "Galgoria",
  },
  siegfried: {},
  ascalon: {},
};

export default Gears;
