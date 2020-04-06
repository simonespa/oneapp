const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (env, options) => {
  const isDevMode = options.mode === 'development';

  const webpackConfig = {
    name: 'Server Bundle',
    target: 'node',
    entry: './src/server',
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
          include: /src/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    plugins: [new CleanWebpackPlugin()]
  };

  if (isDevMode) {
    webpackConfig.plugins.push(
      new NodemonPlugin({
        watch: path.resolve(__dirname, 'dist'),
        script: './dist/server.js'
      })
    );
  }

  if (env.inspect) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
  }

  return webpackConfig;
};
