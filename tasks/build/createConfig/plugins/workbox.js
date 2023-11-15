/* eslint-disable no-restricted-syntax */
const WorkboxPlugin = require("workbox-webpack-plugin");
const ASSET_PATH = process.env.ASSET_PATH || "";
const SITE_NAME = process.env.SITE;
const SITE_PATH = process.env.SITE_PATH || "";
module.exports = options => {
  const { name } = options;

  return [
    new WorkboxPlugin.InjectManifest({
      // globDirectory: `dist/${SITE_PATH}`,
      // globPatterns: ["**/*.{html,js,css,png,woff,ico,svg,jpg,gif}"],
      // importsDirectory: SITE_NAME,
      swSrc: `./src/public/${SITE_NAME}/` + `service-worker${name === "clientPlus" ? "-plus" : ""}.js`,
      precacheManifestFilename: "wb-manifest.[manifestHash].js",
      include: [/\.html$/, /\.js$/, /\.css$/, /\.png$/, /\.jpg$/],
      // globIgnores: [
      //   "sw.js",
      //   "service-worker.js?v=123",
      //   "client-stats.json",
      //   "server.js",
      //   "wb-manifest/*.js",
      //   "css/main.css",
      // ],
      exclude: [
        /^css\/main\.css$/,
        /^css\/opera\.css$/,
        /^opera\.js$/,
        /^server\.js$/,
        /webworkers/,
        /service-worker\.js$/,
        /wb-manifest*\.js$/,
      ],
      // manifestTransforms: [
      //   originalManifest => {
      //     const manifest = [];
      //     for (const entry of originalManifest) {
      //       if (
      //         (entry.url !== "client-stats" || entry.url !== "client-plus-stats") &&
      //         entry.url !== "css/main.css" &&
      //         entry.url.indexOf("wb-manifest") === -1 &&
      //         entry.url !== "webworkers" &&
      //         entry.url !== "service-worker.js"
      //       ) {
      //         if (ASSET_PATH !== "" && entry.url.indexOf(ASSET_PATH) === -1) {
      //           entry.url = ASSET_PATH + SITE_PATH + entry.url;
      //           manifest.push(entry);
      //         } else {
      //           manifest.push(entry);
      //         }
      //       }
      //     }
      //     const warnings = [];
      //     return { manifest, warnings };
      //   },
      // ],
    }),
  ];
};
