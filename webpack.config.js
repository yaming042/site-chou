var webpack = require("webpack");
var path = require('path');

module.exports = {
	entry: {
		index: './app/index.js',
        admin: './admin/index.js',
        detail: './app/detail.js',
	},
	output: {
		path: path.resolve(__dirname, 'public/dist'),
		filename: '[name]_bundle.js',
	},
	module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['stage-0','es2015','react']
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!less-loader',
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader',
                exclude: /node_modules/
            },
        ],
    },
    
}
