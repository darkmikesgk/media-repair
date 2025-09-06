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
		filename: 'js/[name].bundle.js',
		publicPath: '/',
		assetModuleFilename: 'images/[name][ext]', // для png, jpg и т.п.
	},

	devServer: {
		// cloudflared tunnel --url http://localhost:8081
		open: true,
		// host: 'localhost',
		host: '0.0.0.0',
		port: 8081,
		allowedHosts: 'all',
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
				{
					from: /^\/services__glass-replacement\/?$/,
					to: '/services__glass-replacement.html',
				},
				{ from: /^\/services__battery\/?$/, to: '/services__battery.html' },
				{ from: /^\/services\/?$/, to: '/services.html' },
				{ from: /^\/kontakty\/?$/, to: '/kontakty.html' },
				{ from: /^\/privacy-policy\/?$/, to: '/privacy-policy.html' },
				{ from: /^\/computer-assembly\/?$/, to: '/computer-assembly.html' },
				{ from: /^\/computers\/?$/, to: '/computers.html' },
				{ from: /^\/e-scooters\/?$/, to: '/e-scooters.html' },
				{ from: /^\/ps\/?$/, to: '/ps.html' },
				{ from: /^\/audio\/?$/, to: '/audio.html' },
				{ from: /^\/monitors\/?$/, to: '/monitors.html' },
				{ from: /^\/tv\/?$/, to: '/tv.html' },
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
			template: 'src/pages/tv.html',
			filename: 'tv.html', // генерируем файл в корневой директории
			chunks: ['pricing'], // подключаем чанк для страницы phones
		}),
		new HtmlWebpackPlugin({
			template: 'src/pages/monitors.html',
			filename: 'monitors.html', // генерируем файл в корневой директории
			chunks: ['pricing'], // подключаем чанк для страницы phones
		}),
		new HtmlWebpackPlugin({
			template: 'src/pages/audio.html',
			filename: 'audio.html', // генерируем файл в корневой директории
			chunks: ['pricing'], // подключаем чанк для страницы phones
		}),
		new HtmlWebpackPlugin({
			template: 'src/pages/ps.html',
			filename: 'ps.html', // генерируем файл в корневой директории
			chunks: ['pricing'], // подключаем чанк для страницы phones
		}),
		new HtmlWebpackPlugin({
			template: 'src/pages/computers.html',
			filename: 'computers.html', // генерируем файл в корневой директории
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
		new HtmlWebpackPlugin({
			template: 'src/pages/e-scooters.html',
			filename: 'e-scooters.html', // генерируем файл в корневой директории
			chunks: ['main'], // подключаем чанк для страницы phones
		}),
		new HtmlWebpackPlugin({
			template: 'src/pages/computer-assembly.html',
			filename: 'computer-assembly.html', // генерируем файл в корневой директории
			chunks: ['main'], // подключаем чанк для страницы phones
		}),
		new HtmlWebpackPlugin({
			template: 'src/pages/services.html',
			filename: 'services.html', // генерируем файл в корневой директории
			chunks: ['pricing'], // подключаем чанк для страницы phones
		}),
		new HtmlWebpackPlugin({
			template: 'src/pages/services__battery.html',
			filename: 'services__battery.html', // генерируем файл в корневой директории
			chunks: ['pricing'], // подключаем чанк для страницы phones
		}),
		new HtmlWebpackPlugin({
			template: 'src/pages/services__glass-replacement.html',
			filename: 'services__glass-replacement.html', // генерируем файл в корневой директории
			chunks: ['pricing'], // подключаем чанк для страницы phones
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
		new DefinePlugin({
			'process.env.DEVELOPMENT': !isProduction,
			'process.env.API_ORIGIN': JSON.stringify(process.env.API_ORIGIN ?? ''),
		}),
		// new CopyWebpackPlugin({
		// 	patterns: [
		// 		{
		// 			from: 'src/data/pricingDataPs.json',
		// 			to: 'data/pricingDataPs.json',
		// 		},
		// 		{
		// 			from: 'src/data/pricingDataAudio.json',
		// 			to: 'data/pricingDataAudio.json',
		// 		},
		// 		{
		// 			from: 'src/data/pricingDataMonitors.json',
		// 			to: 'data/pricingDataMonitors.json',
		// 		},
		// 		{
		// 			from: 'src/data/pricingDataTv.json',
		// 			to: 'data/pricingDataTv.json',
		// 		},
		// 		{
		// 			from: 'src/data/pricingDataLaptops.json',
		// 			to: 'data/pricingDataLaptops.json',
		// 		},
		// 		{
		// 			from: 'src/data/pricingDataTablets.json',
		// 			to: 'data/pricingDataTablets.json',
		// 		},
		// 		{
		// 			from: 'src/data/pricingDataPhones.json',
		// 			to: 'data/pricingDataPhones.json',
		// 		},
		// 		{
		// 			from: 'src/data/pricingDataIphones.json',
		// 			to: 'data/pricingDataIphones.json',
		// 		},
		// 		{ from: 'src/data/cards.json', to: 'data/cards.json' },
		// 	],
		// }),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'src/data',
					to: 'data',
				},
				{
					from: 'src/images',
					to: 'images',
				},
				{
					from: 'src/fonts',
					to: 'fonts',
				},
				{
					from: 'src/svg',
					to: 'svg',
				},
				{ from: 'src/components', to: 'components' },
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					sources: false, // отключает обработку src в <img>, <source> и т.п.
				},
			},
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
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},
			{
				test: /\.svg$/i,
				type: 'asset/resource',
				generator: {
					filename: 'svg/[name][ext]',
				},
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
