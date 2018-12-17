const { paths, IS_DEVELOPMENT } = require('./config');

const devServer = {
  contentBase: !IS_DEVELOPMENT ? paths.build : paths.source,
  historyApiFallback: true,
  port: 8001,
  compress: !IS_DEVELOPMENT,
  inline: IS_DEVELOPMENT,
  hot: IS_DEVELOPMENT,
  host: IS_DEVELOPMENT ? 'localhost' : '0.0.0.0',
  disableHostCheck: true, // To enable local network testing
  overlay: true,
  stats: {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    colors: true
  }
};

module.exports = {
  devServer
};