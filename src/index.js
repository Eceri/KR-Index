import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./navBar";
import "./Components/styles/base.css";
ReactDOM.render(
    <div id={"pageContainer"} >
        <NavBar key={"components.js"}/>
        <div id={"footer"}>
            footer
        </div>
    </div>
  ,
    document.getElementById("root")
);

