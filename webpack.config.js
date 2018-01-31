'use strict';

// Modules
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'css/[name].css'
});

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  var config = {};

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  config.entry = isTest ? void 0 : {
    app: './src/app/app.js'
  };

  config.output = isTest ? {} : {
    // Absolute output directory
    path: __dirname + '/dist',

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: isProd ? '/' : 'http://localhost:8080/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  if (isTest) {
    config.devtool = 'inline-source-map';
  }
  else if (isProd) {
    config.devtool = 'source-map';
  }
  else {
    config.devtool = 'eval-source-map';
  }


  // Initialize module
  config.module = {
    rules: [{
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({
        fallback: 'style-loader',
        loader: [
          {loader: 'css-loader', query: {sourceMap: true}},
          {loader: 'postcss-loader'}
        ],
      })
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
          use: ['css-loader?-autoprefixer!postcss-loader', 'sass-loader?-autoprefixer!postcss-loader'],
          fallback: 'style-loader',
      })
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file-loader'
    }, {
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  };

  if (isTest) {
    config.module.rules.push({
      enforce: 'pre',
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.spec\.js$/
      ],
      loader: 'istanbul-instrumenter-loader',
      query: {
        esModules: true
      }
    })
  }

  config.plugins = [
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    })
  ];

  // Skip rendering index.html in test mode
  if (!isTest) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body'
      }),

      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files
      // Disabled when in test mode or not in build mode
      new ExtractTextPlugin({filename: 'css/[name].css', allChunks: true})
    )
  }

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin(),

      // Copy assets from the public folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([{
        from: __dirname + '/src/views'
      }])
    )
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src',
    stats: 'minimal'
  };

  return config;
}();
