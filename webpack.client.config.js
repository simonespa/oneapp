const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (env, options) => {
  const isProdMode = options.mode === 'production';

  const webpackConfig = {
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
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-router-dom': 'ReactRouterDOM',
      'axios': 'axios',
      'redux': 'Redux',
      'react-redux': 'ReactRedux',
      'redux-thunk': 'ReduxThunk',
      'prop-types': 'PropTypes'
    },
    // https://webpack.js.org/configuration/optimization/
    // https://webpack.js.org/plugins/split-chunks-plugin/
    optimization: {
      /**
       * An optimization feature to split runtime code into a separate chunk
       * Set it to single to create a single runtime bundle for all chunks.
       */
      runtimeChunk: 'single', // https://webpack.js.org/configuration/optimization/#optimizationruntimechunk
      splitChunks: {
        chunks: 'all', // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks
        maxInitialRequests: Infinity, // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksmaxinitialrequests
        minSize: 0, // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksminsize
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `${packageName.replace('@', '')}`;
            }
          }
        }
      }
    },
    devtool: isProdMode ? 'source-map' : 'inline-source-map',
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
    plugins: [
      new CleanWebpackPlugin(),
      new ManifestPlugin({
        fileName: 'assets-manifest.json'
      })
    ]
  };

  if (env.inspect) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
  }

  return webpackConfig;
};
