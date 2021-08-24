import styled from "styled-components";

export const RunesPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 5rem);
`;

export const RuneContainer = styled.div`
  box-shadow: 0 0 0 1px #262626;
  width: 20%;
  height: 10rem;
  padding: 0.4rem;
  margin: 0 0.5rem 0.5rem 0.5rem;
  &:hover {
    cursor: pointer;
  }
  text-align: left;
`;
