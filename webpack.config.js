const path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,

    entry:'./puzzled_ui/static/js/index.tsx',

    output: {
        path: path.resolve('./puzzled_ui/static/bundles/'),
        filename: '[name]-[hash].js'
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['awesome-typescript-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.scss']
    },

};
