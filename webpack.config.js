const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
      simulation: './src/simulation/index.js',
      dashboard: './src/dashboard/dashboard.js',
    },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'simulation.html',
      template: 'src/simulation/html/simulation.html',
      chunks: ['simulation']
    }),
    new HtmlWebpackPlugin({
        filename: 'dashboard.html',
        template: 'src/dashboard/html/dashboard.html',
        chunks: ['dashboard']
      }),
  ],
  
};