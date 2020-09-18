import React from "react";
import Helmet from "react-helmet";

/**
 *
 * @param {*} title
 * @param {*} content
 * @param {*} image
 */
export const createHelmet = (
  title = "King's Raid Index|Database",
  content = "News, Heroes, Artifacts and everything you need to know about King's Raid on one Page",
  image = "/assets/icons/favicon.png"
) => (
  <Helmet>
    <title>{title}</title>
    {/* HTML Meta Tags */}
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="description" content={content} />

    {/* Google / Search Engine Tags */}
    <meta itemProp="name" content={title} />
    <meta itemProp="description" content={content} />
    <meta itemProp="image" content={`https://dev.krindex.net${image}.png`} />

    {/* Facebook Meta Tags */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={content} />
    <meta property="og:image" content={`https://dev.krindex.net${image}.png`} />
    <meta property="og:site_name" content="Krindex" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://krindex.net" />

    <meta name="theme-color" content="#18181b" />
  </Helmet>
);
