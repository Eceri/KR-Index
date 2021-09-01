import styled from "styled-components";

export const RunesPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 5rem);
  @media only screen and (max-width: 650px) {
    width: 100%;
  }
`;

export const RuneContainer = styled.div`
  width: 20%;
  height: 10rem;
  padding: 0.4rem;
  margin: 0 0.5rem 0.5rem 0.5rem;
  &:hover {
    cursor: pointer;
  }
  text-align: left;
  @media only screen and (max-width: 650px) {
    width: 20vw;
  }
`;

export const RunesPageContainer = styled.div`
  display: flex;
  justifycontent: space-between;
`;

export const StatFilter = styled.div`
  width: 10rem;
  @media only screen and (max-width: 650px) {
    ${({ showStats }) => {
      switch (showStats) {
        case true:
          return "";
        case false:
          return "margin-left: -10rem;";
      }
    }}
  }
`;
