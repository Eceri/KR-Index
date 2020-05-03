import React from "react";
import { ExternalRedirect } from "./redirect";

export const heroes = (props) => {
  return <ExternalRedirect link={`heroes/`} splat={props.match.params.hero ? props.match.params.hero: "" } />;
};
