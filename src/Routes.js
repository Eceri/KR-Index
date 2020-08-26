import React from "react";
import { Switch, Route } from "react-router-dom";

// Relative imports
import { Notfound } from "./Notfound";
import {
  Artifacts,
  Home,
  Hero,
  Heroes,
  Guides,
  StatCaps,
  PerkCalculator,
} from "Components";

export const Routes = () => (
  <Switch>
    {/* <Route path="/heroes/Maya" component={Maya} /> */}
    <Route push={true} path="/heroes/:hero" component={Hero} />
    <Route path="/heroes" component={Heroes} />
    <Route path="/artifacts" component={Artifacts} />
    <Route path="/caps" component={StatCaps} />
    <Route exact path="/" component={Home} />
    <Route exact path="/guides" component={Guides} />
    <Route path="/perks" component={PerkCalculator} />
    <Route path="/404" component={Notfound} />
    <Route path="*" component={Notfound} />
  </Switch>
);
