const merge = require("webpack-merge");
const common = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const SitemapPlugin = require("sitemap-webpack-plugin").default;
const RobotstxtPlugin = require("robotstxt-webpack-plugin");

const paths = ["/heroes/", "/artifacts/", "/perks/"];

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new SitemapPlugin({
      base: "https://www.krindex.net",
      paths,
      options: {
        filename: "./map.xml",
      },
    }),
    new RobotstxtPlugin({
      filePath: "./robots.txt",
      policy: [{ userAgent: "*", allow: "/", crawlDelay: 10 }],
    }),
  ],
});
