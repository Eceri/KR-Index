import React from "react";
import Helmet from "react-helmet";

/**
 * @param {*} title
 */
export const createHelmet = title => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content="Helmet application" />
  </Helmet>
);
