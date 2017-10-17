'use strict'
var webpack = require('webpack')
let path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        "app": './src/app.js',
        "vendor": ['jquery','easeljs','brushjs']
    },
    output: {
        filename: "[name].js",
        publicPath: '/',
        path: __dirname + "/dist"
    },
    module: {
        // avoid webpack trying to shim process
        noParse: /es6-promise\.js$/,
        loaders: [
            {
                test: /\.vue$/,loader: 'vue'
            },
            { test: /\.css$/,  exclude: /(node_modules|bower_components)/,loader: 'style-loader!css-loader' },
            { test: /\.(scss|sass)$/, loader: 'style-loader!css-loader!sass-loader'},
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            },
            {test: /\.json$/,loader: 'json'},
            { test: /\.(html|tpl)$/, loader: 'html-loader' },
            //{ test: /\.(gif|jpe?g|png)\??.*$/, loader: 'url-loader?limit=50000&name=./images/[name].[ext]'},
            { test: /\.(gif|jpe?g|png)\??.*$/, loader: 'url-loader?limit=50000&name=name=./img/[name].[ext]'},
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    mimetype: "application/font-woff",
                    name: './admin-ui/components/style/ionicons/fonts/[name].[ext]'
                    //name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.vue','sass','scss'],
        alias: {
            vue: 'vue/dist/vue.js',
            'jquery': path.resolve(__dirname, './src/js/jquery/dist/jquery.min.js'),
            'appUtil': path.resolve(__dirname, './src/js/utils/appUtil.js'),
            'Utils': path.resolve(__dirname, './src/js/utils'),
            'Plugins': path.resolve(__dirname, './src/js/plugins'),
            'adminUI': path.resolve(__dirname, './src/admin-ui'),
            'images': path.resolve(__dirname, './src/images'),
            'js': path.resolve(__dirname, './src/js'),
            'easeljs': path.resolve(__dirname, './src/js/easeljs/easeljs-0.8.2.combined.js'),
            'brushjs': path.resolve(__dirname, './src/js/easeljs/easeljs-brush.plugin.js')
        }
    },
    "babel": {
        "presets": ["es2015","stage-0"]
    },
    vue: {
        loaders: {
            js: 'babel',
            scss: ['vue-style-loader','css', 'sass'].join('!')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery",
            "_":"appUtil",
            "appUtil":"appUtil"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "js/vendor.js"
        })
        //,
        //extractCSS
    ]
};

