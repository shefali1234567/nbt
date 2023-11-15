"use strict";

module.exports = include => {
  return {
    test: /.*\.svg$/,
    use: [
      {
        loader: 'svg-sprite-loader',
        // options: {
        //   extract: true,
        //   spriteFilename: '/img/svgicons.svg',
        // }
      },
      'svgo-loader'
    ]
  };
};
