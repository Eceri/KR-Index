const purple = "#af36ff";
const guide = "#f0e7d3";
const maintenance = "#ff7b00";
const gameGuide = "#4867aa";
const teal = "#00c9b0";
const events = "#FF72C0";
const specialShop = "#8D488D";
const notes = "#3636fa";
export const colors = {
  background: "#404040",
  font: "white",
  hover: "dimgrey",
  nav: "#262626",
  News: {
    notices: {
      notice: "white",
      maintenanceNotice: "#c7ced4",
      emergencyMaintenanceComplete: maintenance,
      emergencyMaintenance: maintenance,
      maintenanceCompleted: "#ffc100",
      maintenanceComplete: "#ffc100",
      extendedMaintenance: maintenance,
    },
    patches: {
      patchNote: teal,
      gameGuide: gameGuide,
    },
    content: {
      kingsRaidVod: purple,
      gmNote: notes,
      vod: purple,
      guide: guide,
      teaser: purple,
      developersNote: notes,
    },
    events: {
      event: events,
      facebookTwitter: events,
    },
    shop: {
      specialShopUpdate: specialShop,
      specialShop: specialShop,
    },
  },
};
