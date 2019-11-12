import React from "react";

const Image = (props) =>(
    <img src={require(`./../Assets/${props.src}`)}
         alt={props.alt}
         className={props.className} />
)
export default Image
