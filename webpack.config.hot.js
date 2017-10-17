/**
 * Created by AnThen on 2016-11-23.
 */
'use strict';
var path = require("path");
var webpack = require("webpack");
var webpackBase = require("./webpack.config.base.js");
let filesOpt = require("./filesOpt.js");
filesOpt.copyFolder(path.resolve(__dirname,'./src/js'),path.resolve(__dirname,'./dist/js'))
filesOpt.copyFolder(path.resolve(__dirname,'./src/stylesheets'),path.resolve(__dirname,'./dist/stylesheets'))
var cfg = Object.assign(webpackBase, {
    devtool: "eval-source-map",
    cache: true,
    debug: true
});
cfg.output.publicPath='/dist';
//entry
Object.getOwnPropertyNames((webpackBase.entry || {})).map(function (name) {
    cfg.entry[name] = []
        //添加HMR文件
        .concat("webpack/hot/dev-server")
        //添加webpack-dev-server客户端
        .concat("webpack-dev-server/client?http://localhost:8081")
        .concat(webpackBase.entry[name])
});

//plugins
cfg.plugins = (webpackBase.plugins || []).concat(
    new webpack.optimize.OccurrenceOrderPlugin(),
    //添加HMR插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    })
)
module.exports = cfg;