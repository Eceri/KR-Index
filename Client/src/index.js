import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Relative Imports
import { Artifacts, Home, Hero, Heroes } from "./Components/components";
import NavBar from "./navBar";
import "./Components/styles/base.css";
import "./Components/styles/home.css";
import { Footer } from "./Components/Footer.js";
import { createHelmet } from "./helpers/helpers.helmet";

// Amplify Settings
// import Amplify from "aws-amplify";
// import aws_exports from "./aws-exports";
// import { withAuthenticator } from 'aws-amplify-react';


// Amplify.configure(aws_exports);

render(
  <>
    {createHelmet("Home", "frontpage", "./favicon")}
    <div id="pageContainer">
      <BrowserRouter>
        <NavBar key={"components.js"} />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/heroes/Maya" component={Maya} /> */}
          <Route push={true} path="/heroes/:hero" component={Hero} />
          <Route path="/heroes/" component={Heroes} />
          <Route path="/artifacts/" component={Artifacts} />
          {/* <Route path="/etc" component={Etc} /> */}
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  </>,
  document.getElementById("root")
);
