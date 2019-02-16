const { paths, IS_DEVELOPMENT, stats } = require('./config');

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
  stats
};

module.exports = {
  devServer
};