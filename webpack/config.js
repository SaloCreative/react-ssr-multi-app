const webpack = require('webpack');
const path = require('path');

const packageFile = require('../package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const paths = {
  source: path.join(__dirname, '../source'),
  javascript: path.join(__dirname, '../source/js'),
  images: path.join(__dirname, '../source/assets/img'),
  fonts: path.join(__dirname, '../source/assets/fonts'),
  svg: path.join(__dirname, '../source/assets/svg'),
  build: path.join(__dirname, '../build'),
  locales: path.join(__dirname, '../source/locales'),
  favicon: path.join(__dirname, '../source/assets/img/favicon.png')
};

const { outputFiles } = require('./output-files');

const NODE_ENV = process.env.NODE_ENV || 'development';
const SERVER_RENDER = process.env.SERVER_RENDER === 'true';
const IS_DEVELOPMENT = NODE_ENV === 'development';
const IS_PRODUCTION = NODE_ENV === 'production';
const IS_STAGING = NODE_ENV === 'staging';

// ----------
// PLUGINS
// ----------

// Shared plugins
const plugins = [
  // Extracts CSS to a file
  new MiniCssExtractPlugin({
    filename: outputFiles.css
  }),
  // Injects env variables to our app
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      SERVER_RENDER: JSON.stringify(SERVER_RENDER) === 'true'
    },
    'webpackVars': {
      VERSION: JSON.stringify(packageFile.codename)
    }
  })
];

if (IS_DEVELOPMENT) {
  // Shared development plugins
  plugins.push(new webpack.NamedModulesPlugin()); // Enables pretty names instead of index
}

// ----------
// RULES
// ----------

// Shared rules
const rules = [
  // Babel loader without react hot loader
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader']
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [
              {
                removeTitle: true
              }
            ],
            floatPrecision: 2
          }
        }
      }
    ],
    include: paths.svg
  },
  {
    test: /\.(html)$/,
    use: {
      loader: 'html-loader'
    }
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: paths.images,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'client/assets/[name]-[hash].[ext]'
        }
      }
    ]
  },
  {
    test: /\.(woff|ttf|woff2|otf|eot)$/,
    include: paths.fonts,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'client/assets/[name]-[hash].[ext]'
        }
      }
    ]
  }
];

// Almost the same rule is used in both development and production
// only diffence is source map param and ExtractTextPlugin
// so we are using this method to avoid redundant code
const getSassRule = () => {
  const autoprefixerOptions = {
    browsers: [
      'last 3 version',
      'ie >= 10'
    ]
  };

  const sassLoaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: IS_DEVELOPMENT,
        minimize: !IS_DEVELOPMENT
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: IS_DEVELOPMENT,
        plugins: () => [
          autoprefixer(autoprefixerOptions)
        ]
      }
    },
    {
      loader: 'sass-loader',
      options: { sourceMap: IS_DEVELOPMENT }
    }
  ];

  if (IS_PRODUCTION || IS_STAGING || SERVER_RENDER) {
    return {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        ...sassLoaders
      ]
    };
  }

  return {
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader'
      }
    ].concat(sassLoaders)
  };
};

// Add SASS rule to common rules
rules.push(getSassRule());


// ----------
// RESOLVE
// ----------

const resolve = {
  extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
  modules: [
    path.join(__dirname, '../node_modules'),
    paths.javascript
  ]
};

// ----------
// CLI STATS
// ----------

const stats = {
  colors: true,
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true
};

module.exports = {
  outputFiles,
  paths,
  plugins,
  resolve,
  rules,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  NODE_ENV,
  SERVER_RENDER,
  stats
};