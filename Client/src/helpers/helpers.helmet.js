import React from "react";
import Helmet from "react-helmet";

/**
 *
 * @param {*} title
 * @param {*} content
 * @param {*} link
 */
export const createHelmet = (title, content, link) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={content} />
    <link rel="icon" href={link} sizes="124x124"></link>
  </Helmet>
);
