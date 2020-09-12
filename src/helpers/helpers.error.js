import React, { useEffect, useGlobal } from "reactn";
import styles from "styled-components";
import { useHistory } from "react-router-dom";

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
export const CustomError = (message, redirect = false, url = "", hash = "") => {
  return {
    message,
    redirect,
    url,
    hash,
  };
};

export const ErrorHandler = () => {
  const [{ message, redirect, url, hash }, setError] = useGlobal("error");

  const history = useHistory();

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setError(ErrorState);
      }, 2000);
    }
    if (redirect) {
      history.push({
        pathname: url,
        hash: hash,
      });
    }
  }, [message, redirect, url]);

  return <>{message !== "" ? <ErrorBoard>Error</ErrorBoard> : <></>}</>;
};
