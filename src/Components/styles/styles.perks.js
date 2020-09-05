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

export const CheckImage = styled.img`
  filter: ${(props) => (props.active ? "" : "grayscale(100%)")};
  &:hover {
    cursor: pointer;
  }
  width: 4rem;
  height: auto;
  min-height: 4rem;
  margin-top: 0.3rem;
  margin-right: 0.75rem;
  @media only screen and (max-width: 650px) {
    width: 3rem;
    min-height: 3rem;
    margin-top: 0.1rem;
    margin-right: 0.4rem;
  }
`;

export const PerkEffect = styled.p`
  padding-top: 0.5rem;
  width: 12rem;
`;
