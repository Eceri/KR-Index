import React from "react";
import { Switch, Route } from "react-router-dom";

// Relative imports
import { Notfound } from "./Notfound";
import {
  Artifacts,
  Hero,
  Heroes,
  Guides,
  StatCaps,
  Gears
} from "Components";
import { Home } from "./home"
import { PerksContainer } from "Containers";

export const Routes = () => (
  <Switch>
    {/* <Route path="/heroes/Maya" component={Maya} /> */}
    <Route push={true} path="/heroes/:hero" component={Hero} />
    <Route path="/heroes" component={Heroes} />
    <Route path="/perks" component={PerksContainer} />
    <Route path="/artifacts" component={Artifacts} />
    <Route path="/caps" component={StatCaps} />
    <Route exact path="/guides" component={Guides} />
    <Route path="/gear" component={Gears} />
    <Route path="/404" component={Notfound} />
    <Route exact path="/" component={Home} />
    <Route path="*" component={Notfound} />
  </Switch>
);
