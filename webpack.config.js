const path = require('path');

module.exports = {
  entry: {
    popup: './src/popup.tsx',
    pageScript: './src/pageScript.ts',
    background: './src/background.ts',
    contentScript: './src/contentScript.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css?$/,
        use: 'css-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
};