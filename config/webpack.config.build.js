const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');

require('@babel/register')({
  rootMode: 'upward',
});

const PATH_SOURCE = path.join(__dirname, '../src');
const PATH_DIST = path.join(__dirname, '../build');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const fileName = process.env.NODE_ENV === 'production' ? 'static/js/bundle.[chunkhash:8].js' : 'static/js/bundle.[hash].js';
const chunkFileName = process.env.NODE_ENV === 'production' ? 'static/js/[name].[chunkhash:8].chunk.js' : 'static/js/[name].[hash].js';

const paths = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
};

const config = {
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  mode: process.env.NODE_ENV,
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux'
    ],
    app: [
      paths.appIndexJs,
    ]
  },
  output: {
    path: PATH_DIST,
    pathinfo: true,
    filename: fileName,
    chunkFilename: chunkFileName,
    publicPath: '/',
    devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      'node_modules',
    ],
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      styles: path.resolve(__dirname, '../src/styles'),
      views: path.resolve(__dirname, '../src/views'),
      assets: path.resolve(__dirname, '../src/assets'),
      lib: path.resolve(__dirname, '../src/lib'),
      store: path.resolve(__dirname, '../src/store'),
    },
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx|mjs)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
              rootMode: 'upward',
              cacheDirectory: true,
            },
          },
          {
            test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: paths.appPublic,
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      publicUrl: '',
      favicon: './public/favicon.ico',
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: '',
    }),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [new TerserPlugin({
      terserOptions: {
        cache: true,
        parallel: true,
        output: {
          comments: false,
        },
      },
    })],
  },
};

module.exports = config;
