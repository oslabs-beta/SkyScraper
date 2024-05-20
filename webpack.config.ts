import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import process from 'node:process';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const config = {
  // mode: process.env.NODE_ENV || 'development',
  mode: 'development',
  // entry: './client/src/index.tsx',
  // entry: '.dist/client/src/index.tsx',
  // entry: './src/index.tsx',
  entry: './client/src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
      // template: './src/index.html',
      // template: path.resolve(__dirname, '../dist/client/index.html'), // Update template path if necessary
      // template: path.resolve(__dirname, 'dist/client/src/index.html'), // Update template path to correct location

      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'client/src/index.html', to: '' }, // Copy index.html to dist/client
    //   ],
    // }),
  ],
  devServer: {
    historyApiFallback: true,
    proxy: [
      {
        '/api': 'http://localhost:3000', // Adjust the port if your backend server runs on a different port
      },
    ],
    static: {
      directory: path.join(__dirname, '../dist/client'),
    },

    // contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: true,
  },
};

export default config;
