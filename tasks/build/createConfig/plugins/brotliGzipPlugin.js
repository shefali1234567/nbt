"use strict";

const BrotliGzipPlugin = require("brotli-gzip-webpack-plugin");

module.exports = options => {
  return process.env.NODE_ENV != "development"
    ? [
        new BrotliGzipPlugin({
          asset: "[path].br[query]",
          algorithm: "brotli",
          test: /\.(js|css|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
          quality: 11
        }),
        new BrotliGzipPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.(js|css|svg)$/,
          threshold: 10240,
          minRatio: 0.8
        })
      ]
    : [];
};
