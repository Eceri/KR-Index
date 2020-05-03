import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Redirect = (first, second) => {
  const _second = second !== undefined ? `/${second}` : "";
  window.location.href = `https://www.krindex.net/${first}${_second}`;
};

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Switch>
        <Route
          path="/*"
          component={Redirect(
            window.location.pathname.split("/")[1],
            window.location.pathname.split("/")[2]
          )}
        />
      </Switch>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);
