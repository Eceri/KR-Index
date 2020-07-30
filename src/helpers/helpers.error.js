import React, { useEffect, useGlobal } from "reactn";
import styles from "styled-components";

// Relative imports
import { ErrorState } from "Constants";

const ErrorBoard = styles.div`
  position: absolute;
  top: 2rem;
  left: calc(50% - 6rem);
  width: 12rem;
  height: 3rem;
  padding: 0.75rem;
  background-color: #262626;
  text-align: center;
`;

export const ErrorHandler = () => {
  const [error, setError] = useGlobal("error");

  const { component, message, redirect, url } = error;

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setError(ErrorState);
      }, 2000);
    }
    if (redirect) {
      history.pushState(error, message, url);
    }
  }, [component, message, redirect, url]);

  return <>{message !== "" ? <ErrorBoard>Error</ErrorBoard> : <></>}</>;
};
