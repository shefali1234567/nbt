"use strict";

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = (createSvg) => [
  new SpriteLoaderPlugin({
    plainSprite: true
  })
];
