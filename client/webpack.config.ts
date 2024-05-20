import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const config = {
  // mode: process.env.NODE_ENV || 'development',
  mode: 'development',
  // entry: './client/src/index.tsx',
  // entry: '.dist/client/src/index.tsx',
  // entry: './src/index.tsx',
  entry: path.resolve('dist/client/src/index.js'),
  output: {
    filename: '[name].js',
    // path: path.resolve(__dirname, 'dist', 'client'),
    path: path.resolve(__dirname, '../../dist/client'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: './client/src/index.html',
      // template: './src/index.html',
      // template: path.resolve(__dirname, '../dist/client/index.html'), // Update template path if necessary
      template: path.resolve(__dirname, 'src/index.html'), // Update template path to correct location

      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        //potentially add 'style loader ' to array in line above
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@src': path.resolve(__dirname, 'client/'),
    },
  },
  // devServer: {
  //   historyApiFallback: true,
  //   static: [
  //     {
  //       directory: path.resolve(__dirname, '../../dist/client'),
  //       publicPath: '/',
  //     },
  //   ],
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //     },
  //   },

  //   // port: 8080, // Explicitly set the port for the webpack dev server
  // },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    static: {
      directory: path.join(__dirname, '../../dist/client'),
    },
    compress: true,
    port: 8080,
    open: true,
  },
};

export default config;
