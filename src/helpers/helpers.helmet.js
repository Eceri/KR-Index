import React from "react";
import Helmet from "react-helmet";

/**
 *
 * @param {*} title
 * @param {*} content
 * @param {*} image
 */
export const createHelmet = (title, content, image = "") => (
  <Helmet>
    <title>{title}</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={content} />
    <meta
      property="og:image"
      content={`https://dev.krindex.net/assets/${image}.png`}
    />
    <meta property="og:site_name" content="Krindex" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://krindex.net" />
    <meta name="theme-color" content="#18181b" />
  </Helmet>
);
