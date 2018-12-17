const fs = require('fs');

const { paths } = require('./webpack/config');
const { rules } = require('./webpack/config');
const { plugins } = require('./webpack/config');
const { resolve } = require('./webpack/config');
const { IS_DEVELOPMENT } = require('./webpack/config');

// Webpack config
const config = {
  target: 'node',
  watch: IS_DEVELOPMENT,
  devtool: IS_DEVELOPMENT ? 'source-map' : false,
  context: paths.javascript,
  entry: [
    './app.js'
  ],
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'app.js'
  },
  module: {
    rules
  },
  resolve,
  plugins,
  // Fix for node modules
  externals: fs.readdirSync('node_modules').reduce((accumulator, module) => {
    const newAccumulator = accumulator;
    if (module !== '.bin') {
      newAccumulator[module] = `commonjs ${ module }`;
    }

    return newAccumulator;
  }, {})
};

module.exports = config;