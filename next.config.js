require("dotenv").config();

const withLess = require("@zeit/next-less");
const lessToJS = require("less-vars-to-js");
const path = require("path");
const fs = require("fs");

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./assets/antd-custom.less"), "utf8")
);

if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {};
}

module.exports = withLess({
  env: {
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
    ALGOLIA_MAP_SEARCH_INDEX: process.env.ALGOLIA_MAP_SEARCH_INDEX,
    MAPBOX_PUBLIC_API_KEY: process.env.MAPBOX_PUBLIC_API_KEY
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables
  }
});
