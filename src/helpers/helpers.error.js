import React, { useEffect, useGlobal } from "reactn";
import styles from "styled-components";
import { useHistory } from "react-router-dom";

// Relative imports
import { ErrorState } from "Constants";
import { useDebounce } from "Helpers";

const ErrorBoard = styles.div`
  position: absolute;
  top: 2.5rem;
  left: calc(50% - 6rem);
  width: 12rem;
  height: 3rem;
  padding: 0.75rem;
  background-color: #CD0000;
  text-align: center;
  border: 2px solid black;
  visibility: ${(props) => (props.message === "" ? "hidden" : "visible")};
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

  const debouncedTerm = useDebounce(redirect, 200);

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setError(ErrorState);
      }, 2000);
    }
    if (debouncedTerm) {
      history.push({
        pathname: url,
        hash: hash,
      });
    }
  }, [message, debouncedTerm, url, hash]);

  return <ErrorBoard message={message}>{message}</ErrorBoard>;
};
