/**
 * Created by AnThen on 2016-11-24.
 */
'use strict'
var login = "/login.html";
var fs = require('fs')
function modifyLogin(){
    var data = fs.readFileSync(__dirname + login,'utf-8');
    data = data + "";
    data = data.replace(/url:('|")?.+('|")?,?/g,function (word){
        return 'url:"http://localhost:8881/api/login/entry",';//"development",
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
        return 'host:"http://bluesharpweb.dataengine.com/server",';//"development",
    });
    fs.writeFile(__dirname + file, data, function(err){
        if(err){
            console.log("error! " + file);
            console.log(err);
        }else{
            console.log("constant.js success! ");
        }
    });
}
function modifyLoginBackGroudImg(){
    var file = "/src/stylesheets/login/assets/js/supersized-init.js";
    var data = fs.readFileSync(__dirname + file,'utf-8');
    data = data + "";
    data = data.replace(/dist\/stylesheets\/login\/assets\/img\/backgrounds/g,function (word){
        return 'stylesheets/login/assets/img/backgrounds';//"development",
    });
    fs.writeFile(__dirname + file, data, function(err){
        if(err){
            console.log("error! " + file);
            console.log(err);
        }else{
            console.log("supersized-init.js success! ");
        }
    });
}
modifyLogin();
modifyConstant();
modifyLoginBackGroudImg();
var path = require("path");
let filesOpt = require("./filesOpt.js");
filesOpt.copyFolder(path.resolve(__dirname,'./src/js'),path.resolve(__dirname,'./dist/js'))
filesOpt.copyFolder(path.resolve(__dirname,'./src/images'),path.resolve(__dirname,'./dist/images'))
filesOpt.copyFolder(path.resolve(__dirname,'./src/stylesheets'),path.resolve(__dirname,'./dist/stylesheets'))

