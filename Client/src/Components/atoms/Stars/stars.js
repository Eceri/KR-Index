import React from "react";
import styled from "styled-components";

const Star = styled.button`
  font-size: 1.5rem;
  border: 0px solid transparent;
  background: none;
  color: ${props => (props.active ? "#FFD700" : "white")};
  vertical-align: middle;

  &:hover {
    cursor: pointer;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #ffd700;
    // text-shadow: 1px 0 0 #ffd700, 0 -1px #ffd700, 0 1px 0 #ffd700,
    //   -1px 0 0 #ffd700;
  }

  &:focus {
    outline: none;
  }
`;

export const stars = (setStar, active) => {
  const arr = [0, 1, 2, 3, 4, 5];
  return (
    <div>
      {arr.map(v => (
        <Star
          onClick={() => setStar(v)}
          key={v}
          active={active >= v ? true : false}
        >
          {v > 0 ? (
            "★"
          ) : (
            <span
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                textShadow: "0.5px 0.5px #ffd700"
              }}
            >
              ○
            </span>
          )}
        </Star>
      ))}
    </div>
  );
};
