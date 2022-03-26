import React from "react";
import styled from "styled-components";

export const Footer = () => {
  const StyledFooter = styled.footer`
    display: flex;
    flex-direction: row;
    flex: 1fr;
    justify-content: center;
    margin: 1rem;
    gap: 1rem;
  `;
  return (
    <StyledFooter>
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
    </StyledFooter>
  );
};
