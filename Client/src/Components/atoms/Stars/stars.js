import React from "react";
import styled from "styled-components";

const Star = styled.button`
  font-size: 1.5rem;
  border: 0px solid transparent;
  background: none;
  color: ${props => (props.active ? "#FFD700" : "white")};

  &:hover {
    cursor: pointer;
    background-color: #ffd700;
    color: black;
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
          {v > 0 ? "☆" : "X"}
        </Star>
      ))}
    </div>
  );
};
