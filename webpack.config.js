const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = (environmentVariables, options) => {
  const isProdMode = options.mode === 'production';

  const serverConfig = {
    name: 'Server Bundle',
    target: 'node',
    entry: './src/server.js',
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2'
    },
    externals: [nodeExternals()],
    devtool: false,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          include: path.resolve(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    debug: true,
                    useBuiltIns: 'usage',
                    corejs: {
                      version: '3'
                    },
                    targets: {
                      node: '10'
                    }
                  }
                ],
                '@babel/preset-react'
              ]
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    plugins: [new CleanWebpackPlugin()]
  };

  const clientConfig = {
    name: 'Client Bundle',
    target: 'web',
    entry: {
      oneapp: './src/client.jsx'
    },
    output: {
      path: path.join(__dirname, 'assets'),
      filename: isProdMode ? 'js/[name].[contenthash].js' : 'js/[name].js',
      library: 'OneApp',
      libraryTarget: 'var'
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      luxon: 'luxon'
    },
    devtool: isProdMode ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          include: path.resolve(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    debug: true,
                    useBuiltIns: 'usage',
                    corejs: {
                      version: '3'
                    },
                    targets: {
                      browsers: ['last 2 versions', 'iOS >= 10', 'not dead']
                    }
                  }
                ],
                '@babel/preset-react'
              ],
              plugins: ['@babel/plugin-syntax-dynamic-import']
            }
          }
        },
        {
          test: /\.s?css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: isProdMode ? 'css/[name].[contenthash].css' : 'css/[name].css'
      }),
      new ManifestPlugin({
        seed: {},
        map(file) {
          const newFile = file;
          newFile.name = file.name.replace(/\.[a-f0-9]{10}\./, '.');
          return newFile;
        },
        fileName: 'manifest.json'
      })
    ]
  };

  if (!isProdMode) {
    serverConfig.plugins.push(
      new NodemonPlugin({
        watch: path.resolve(__dirname, 'dist'),
        script: './dist/server.js'
      })
    );
  }

  if (isProdMode) {
    clientConfig.optimization = {
      // https://webpack.js.org/configuration/optimization/#optimizationminimize
      minimizer: [
        // https://webpack.js.org/plugins/terser-webpack-plugin
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          exclude: /node_modules/,
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            output: {
              comments: false
            }
          }
        }),
        new OptimizeCSSAssetsPlugin()
      ]
    };
  }

  return [serverConfig, clientConfig];
};
