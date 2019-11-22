import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./navBar";
import "./Components/styles/base.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Hero, Heroes, Maya, Artifacts, Etc } from "./Components/components";
import Home from "./home";
import { hydrate, render } from "react-dom";
import App from "./App"

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}