import React from "react";

export const Image = (props) => {
  let { src, alt, className, id, style, dataTip } = props;
  let trySource = () => {
    let source = "";
    try {
      source = require(`Assets/${src}`);
    } catch (error) {
      console.log("failed loading an image: Error: " + error);
    }
    return source;
  };
  return (
    <img
      alt={alt}
      src={trySource()}
      className={className}
      id={id}
      style={style}
      data-tip={dataTip}
    />
  );
};
