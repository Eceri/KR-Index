import React from "react";

export const Image = props => (
  <img
    src={require(`./../Assets/${props.src}`)}
    alt={props.alt}
    className={props.className}
    id={props.id}
    style={props.style}
    data-tip={props.dataTip}
  />
);
export default Image