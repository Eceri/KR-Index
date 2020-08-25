import React from "react";

export const Image = (props) => {
  let { src, alt, className, id, style, dataTip, dataFor } = props;
  // let trySource = () => {
  //   let source = "";
  //   try {
  //     source = require(`https://krindex.s3.eu-central-1.amazonaws.com/assets/${src}`);
  //   } catch (error) {
  //     console.log("failed loading an image: Error: " + error);
  //   }
  //   return source;
  // };
  return (
    <img
      alt={alt}
      src={`/assets/${src}`}
      className={className}
      id={id}
      style={style}
      data-tip={dataTip}
      data-for={dataFor}
    />
  );
};
