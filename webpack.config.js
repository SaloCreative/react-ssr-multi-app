const entryPoints = [
  'apollo'
];

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const {
  paths,
  outputFiles,
  rules,
  plugins,
  resolve,
  IS_PRODUCTION,
  IS_DEVELOPMENT
} = require('./webpack/config');
const { devServer } = require('./webpack/dev-server');

// Default client app entry files
const entries = entryPoints.map(app => {
  return {
    app,
    files: [
      path.join(paths.javascript, `./apps/${ app }/client.js`)
    ]
  };
});

// Return entry object
function buildEntry() {
  const entry = {};
  entries.forEach(item => {
    const ent = ['@babel/polyfill'];
    entry[item.app] = ent.concat(item.files);
  });
  return entry;
}

plugins.push(
  new CircularDependencyPlugin({
    // exclude detection of files based on a RegExp
    exclude: /a\.js|node_modules/,
    // add errors to webpack instead of warnings
    failOnError: false,
    // set the current working directory for displaying module paths
    cwd: process.cwd()
  }),
  // Builds index.html from template
  new HtmlWebpackPlugin({
    template: path.join(paths.source, 'index.html'),
    path: paths.build,
    filename: 'index.html',
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true
    }
  }),
  new CopyWebpackPlugin([
    { from: paths.locales, to: 'client/locales' },
    { from: paths.favicon, to: 'client/assets' }
  ])
);

if (IS_DEVELOPMENT) {
  // Development plugins
  plugins.push(
    // Enables HMR
    new webpack.HotModuleReplacementPlugin(),
    // Don't emmit build when there was an error while compiling
    // No assets are emitted that include errors
    new webpack.NoEmitOnErrorsPlugin()
  );
}

// Webpack config
module.exports = {
  mode: IS_DEVELOPMENT ? 'development' : 'production',
  devtool: IS_PRODUCTION ? false : 'cheap-eval-source-map',
  context: paths.javascript,
  watch: IS_DEVELOPMENT,
  entry: buildEntry(),
  output: {
    path: paths.build,
    publicPath: '/',
    filename: outputFiles.client.replace(':name', '[name]')
  },
  module: {
    rules
  },
  resolve,
  plugins,
  devServer,
  optimization: {
    usedExports: true,
    // Minification
    minimize: IS_PRODUCTION,
    // Creates vendor chunk from modules coming from node_modules folder
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: path.resolve(__dirname, 'node_modules'),
          name: 'vendor',
          filename: outputFiles.vendor,
          enforce: true
        }
      }
    }
  }
};