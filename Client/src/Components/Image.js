import React from "react";

export const Image = props => (
  <img
  {...props} src={require(`./../Assets/${props.src}`)}
    

  />
);
export default Image