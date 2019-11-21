import React from "react";

export const Image = props => {
  let { src, alt, className, id, style, dataTip } = props
  return <img
    src={require(`./../Assets/${src}`)}
    alt={alt}
    className={className}
    id={id}
    style={style}
    data-tip={dataTip}
  />
}
export default Image


