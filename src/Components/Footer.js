import React from "react";

export const Footer = () => {
  return (
    <footer id={"footer"}>
      <a
        href="https://github.com/Eceri/KR-Index"
        target="_blank"
        rel="noopener noreferrer"
        style={{ alignItems: "center" }}
      >
        <img
          src={`${require("Assets/icons/GitHub-Mark-Light-32px.png")}`}
          alt="github"
          style={{ border: "none" }}
          height="36px"
        />
      </a>
      <a
        href="https://discord.gg/BympyXMBaB"
        target="_blank"
        rel="noopener noreferrer"
        style={{ alignItems: "center" }}
      >
        <img
          src={`${require("Assets/icons/Discord-Logo-White.png")}`}
          alt="discord"
          style={{ border: "none" }}
          height="36px"
        />
      </a>
    </footer>
  );
};
