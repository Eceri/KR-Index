import styled from "styled-components";

export const TP = styled.div`
  color: ${(props) => (props.value < 0 ? "red" : "white")};
`;

export const Row = styled.div`
  display: flex;
  & h3 {
    margin-right: 1rem;
    text-align: center;
    margin-top: 1.5rem;
  }
`;

export const PerkContainer = styled.div`
  margin: auto;
  padding: 1rem;
  width: 27rem;
  @media only screen and (max-width: 650px) {
    padding: 0;
    width: 18.7rem;
  }
`;

export const Questionmark = styled.span`
  padding: 0 0.5rem 0 0.5rem;
  margin: 0 0.3rem 0 0.3rem;
  background: #5e5e5e;
  border: 1px solid #5e5e5e;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;
