import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Redirect = (first, second) => {
  const _second = second !== undefined ? `/${second}` : "";
  sleep(3000).then(() => {
    window.location.href = `https://www.krindex.net/${first}${_second}`;
  });
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

ReactDOM.render(
  <div>
    <h1>
      KR Index has moved to{" "}
      <a href="https://www.krindex.net">https://www.krindex.net</a>. You'll be
      redirected shortly.
    </h1>
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
