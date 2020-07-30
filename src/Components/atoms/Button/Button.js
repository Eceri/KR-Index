import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  width: ${(props) => (props.size ? props.size : "3rem")};
  background-color: #5e5e5e;
  color: white;
  border: 1px solid transparent;
  padding: 0.3rem;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

export const Button = (props) => {
  return <ButtonStyle {...props} />;
};
