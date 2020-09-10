import React from "react";
import styled from "styled-components";

export const Spinner = styled.div`
  border: 8px solid white;
  border-top: 8px solid slategray;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
  position: absolute;
  top: calc(50% - 8px);
  left: calc(50% - 8px);

  @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
  }
`;
