import React from "react";

export function ExternalRedirect(props)  {
  let splat = props.splat ? props.splat : "";
  let link = props.link ? props.link : "";
  
  global.window &&
    (global.window.location.href = `https://www.krindex.net/${link}${splat}`);
  return null;
};
