const path = require('path');
// const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: ['./src/index.js', './style.css'], // Ваш основной JS файл
	output: {
		filename: 'bundle.js', // Выходной файл, который Webpack создаст
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	mode: 'development', // Для удобства при разработке
	plugins: [
		new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
		new MiniCssExtractPlugin({
			filename: 'bundle.css'
		})
	],

	devServer: {
		static: {
			directory: path.join(__dirname, 'public')
		},

		compress: true,
		port: 8080
	},

	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					}
				]
			}
		]
	}
};
