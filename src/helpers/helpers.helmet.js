import React from "react";
import Helmet from "react-helmet";

/**
 *
 * @param {*} title
 * @param {*} content
 */
export const createHelmet = (title, content) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={content} />
  </Helmet>
);
