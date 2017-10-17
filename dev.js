/**
 * Created by AnThen on 2016-11-24.
 */
'use strict'
var path = require("path");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackCfg = require("./webpack.config.hot.js");
var compiler = webpack(webpackCfg);
let filesOpt = require("./filesOpt.js");
filesOpt.copyFolder(path.resolve(__dirname,'./src/js'),path.resolve(__dirname,'./dist/js'))
filesOpt.copyFolder(path.resolve(__dirname,'./src/images'),path.resolve(__dirname,'./dist/images'))
filesOpt.copyFolder(path.resolve(__dirname,'./src/stylesheets'),path.resolve(__dirname,'./dist/js/stylesheets'))
//TODO create
filesOpt.copyFolder(path.resolve(__dirname,'./src/create'),path.resolve(__dirname,'./dist/create'))

var fs = require('fs');// 加载编码转换模块
var path = require("path");
function modifyLogin(){
    var login = "/login.html";

    var data = fs.readFileSync(__dirname + login,'utf-8');
    data = data + "";
    data = data.replace(/url:('|")?.+('|")?,?/g,function (word){
        return 'url:"http://bluesharpweb.dataengine.com/server/api/login/entry",';//"development",10.200.32.217:8888
    });
    fs.writeFile(__dirname + login, data, function(err){
        if(err){
            console.log("error! " + login);
            console.log(err);
        }else{
            console.log("login.html success! ");
        }
    });

}

function modifyConstant(){
    var file = "/src/js/utils/constant.js";
    var data = fs.readFileSync(__dirname + file,'utf-8');
    data = data + "";
    data = data.replace(/host:('|")?.+('|")?,?/g,function (word){
        return 'host:"http://bluesharpweb.dataengine.com/server",';
        //return '"development",'
    });
    data = data.replace(/fileDownload:('|")?.+('|")?,?/g,function (word){
        return 'fileDownload:"http://10.200.32.95:8080",';//"development",
    });
    data = data.replace(/fileUpload:('|")?.+('|")?,?/g,function (word){
        return 'fileUpload:"http://10.200.32.95:8080",';//"development",
    });
    data = data.replace(/laboratoryPageUrl:('|")?.+('|")?,?/g,function (word){
        return 'laboratoryPageUrl:"http://10.200.32.95/{projectCode}-{labCode}/#/notebook/2A94M5J1Z",';//"development",
    });
    fs.writeFile(__dirname + file, data, function(err){
        if(err){
            console.log("error! " + file);
            console.log(err);
        }else{
            console.log("dev.js success! ");
        }
    });
}

modifyLogin();
modifyConstant();
//init server
var app = new webpackDevServer(compiler, {
    //注意此处publicPath必填
    publicPath: webpackCfg.output.publicPath
});

console.log('start')
app.listen(8081, function (err) {
    if (err) {
        console.log(err);
    }else{
        console.log("listen at http://localhost:8081");
    }
});

