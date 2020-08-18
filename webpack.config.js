const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDir = '/dist';

module.exports = {
  entry: './src/client/index.js',
  output: {
	path: path.join(__dirname, outputDir),
	filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
	],
  },
  resolve: {
	  extensions: ["*", ".js", ".jsx"]
	},
  devServer: {
    port: 3000,
	open: true,
	proxy: {
		'/api':	'http://localhost:8080'
	},
  },
  devtool: 'eval-source-map',
  plugins: [
	  new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [outputDir] }),
	  new HtmlWebPackPlugin({
		template: './src/client/index.html',
		filename: './index.html'
	  }),
	  new MiniCssExtractPlugin({
		filename: '[name].css',
		chunkFilename: '[id].css'
	  })
	],
	stats: {
		assetsSort: '!size',
		children: false,
		chunks: false,
		colors: true,
		entrypoints: false,
		modules: false
	}
};