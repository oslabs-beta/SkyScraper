import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  // mode: process.env.NODE_ENV || 'development',
  mode: 'development',
  // entry: './client/src/index.tsx',
  // entry: '.dist/client/src/index.tsx',
  // entry: './src/index.tsx',
  entry: path.resolve(__dirname, 'src/index.tsx'),
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
        test: /\.(ts|tsx)$/,
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
  },
  devServer: {
    historyApiFallback: true,
    static: [
      {
        directory: path.resolve(__dirname, '../../dist/client'),
        publicPath: '/',
      },
    ],
    // proxy: [
    //   {
    //     context: ['/api'],
    //     target: 'http://localhost:8080',
    //   },
    // ],
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    port: 8080, // Explicitly set the port for the webpack dev server
  },
};

export default config;
