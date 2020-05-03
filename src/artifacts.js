import React from "react";
import { ExternalRedirect } from "./redirect";

export const artifacts = props => {
  return <ExternalRedirect link={`artifacts/`} splat={props.match.params.artifact ? props.match.params.artifact: "" } />;
};
