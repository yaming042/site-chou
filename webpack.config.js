var webpack = require("webpack");
var path = require('path');

var productionEnv = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
        // NODE_ENV: JSON.stringify("development")
    }
});

module.exports = {
	entry: {
		index: './app/index.js',
        admin: './admin/index.js',
        login: './admin/login.js',
        reg: './admin/reg.js',
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
    plugins: [productionEnv,
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: true
            }
        })
    ]
    
}
