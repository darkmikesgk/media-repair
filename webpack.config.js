const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

require('dotenv').config({
  path: path.join(
    process.cwd(),
    process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
  ),
});

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: {
    main: './src/scripts/index.js',
    pricing: './src/scripts/pricing.js', // Универсальный скрипт для страниц iphones и phones
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8081,
    watchFiles: ['src/pages/*.html'],
    hot: true,
    proxy: {
      '/server': 'http://localhost:8080',
    },
    static: {
      directory: path.join(__dirname, 'src'),
      publicPath: '/',
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/kontakty\/?$/, to: '/kontakty.html' },
        { from: /^\/privacy-policy\/?$/, to: '/privacy-policy.html' },
        { from: /^\/laptops\/?$/, to: '/laptops.html' },
        { from: /^\/tablets\/?$/, to: '/tablets.html' },
        { from: /^\/phones\/?$/, to: '/phones.html' },
        { from: /^\/iphones\/?$/, to: '/iphones.html' },
        { from: /^\/?$/, to: '/index.html' },
      ],
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/pages/index.html',
      filename: 'index.html',
      chunks: ['main'], // подключаем чанк для основной страницы
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/iphones.html',
      filename: 'iphones.html', // генерируем файл в корневой директории
      chunks: ['pricing'], // подключаем чанк для страницы iphones
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/phones.html',
      filename: 'phones.html', // генерируем файл в корневой директории
      chunks: ['pricing'], // подключаем чанк для страницы phones
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/tablets.html',
      filename: 'tablets.html', // генерируем файл в корневой директории
      chunks: ['pricing'], // подключаем чанк для страницы phones
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/laptops.html',
      filename: 'laptops.html', // генерируем файл в корневой директории
      chunks: ['pricing'], // подключаем чанк для страницы phones
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/privacy-policy.html',
      filename: 'privacy-policy.html', // генерируем файл в корневой директории
      chunks: ['main'], // подключаем чанк для страницы phones
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/kontakty.html',
      filename: 'kontakty.html', // генерируем файл в корневой директории
      chunks: ['main'], // подключаем чанк для страницы phones
    }),
    new MiniCssExtractPlugin(),
    new DefinePlugin({
      'process.env.DEVELOPMENT': !isProduction,
      'process.env.API_ORIGIN': JSON.stringify(process.env.API_ORIGIN ?? ''),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/data/pricingDataLaptops.json', to: 'data/pricingDataLaptops.json' },
        { from: 'src/data/pricingDataTablets.json', to: 'data/pricingDataTablets.json' },
        { from: 'src/data/pricingDataPhones.json', to: 'data/pricingDataPhones.json' },
        { from: 'src/data/pricingDataIphones.json', to: 'data/pricingDataIphones.json' },
        { from: 'src/data/cards.json', to: 'data/cards.json' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: ['babel-loader'],
        exclude: ['/node_modules/'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          stylesHandler,
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: ['src/styles'],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};