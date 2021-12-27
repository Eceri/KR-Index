import React, { useGlobal, setGlobal } from "reactn";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";

// Relative Imports
import NavBar from "./NavBar";
import "./Components/styles/base.css";
import "./Components/styles/home.css";
import { Footer } from "Components";
import { ErrorHandler } from "Helpers";
import {
  ErrorState,
  INIT_BUILD,
  LOADING_ARTIFACT,
  INIT_HEROHEADER,
} from "Constants";
import { Routes } from "./Routes";

// Amplify Settings
import Amplify from "@aws-amplify/core";
import aws_exports from "./aws-exports";
Amplify.configure(aws_exports);

setGlobal({
  error: ErrorState,
  build: INIT_BUILD,
  tp: 95,
  heroName: "",
  headInfo: INIT_HEROHEADER,
  artifacts: [LOADING_ARTIFACT],
  headInfos: [INIT_HEROHEADER],
});

const Page = () => {
  const [error, setError] = useGlobal("error");

  window.localStorage.clear();

  //styled-components

  return (
    <>
      <div id="pageContainer">
        <BrowserRouter>
          <ErrorHandler />
          <NavBar key={"components.js"} setError={setError} />
          <Routes />
        </BrowserRouter>
      <hr />
      </div>
      <Footer />
    </>
  );
};

const rootElement = document.getElementById("root");

render(<Page />, rootElement);
