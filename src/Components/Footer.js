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
          width="32px"
          hieght="32px"
        />
      </a>
    </footer>
  );
};
