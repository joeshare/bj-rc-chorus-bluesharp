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
        return 'url:"http://bluesharpwebtest.dataengine.com/server/api/login/entry",';//"development",
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
        return 'host:"http://bluesharpwebtest.dataengine.com/server",';//"development",
    });
    data = data.replace(/fileDownload:('|")?.+('|")?,?/g,function (word){
        return 'fileDownload:"http://10.200.48.106:8080",';//"development",
    });
    data = data.replace(/fileUpload:('|")?.+('|")?,?/g,function (word){
        return 'fileUpload:"http://10.200.48.106:8080",';//"development",
    });
    data = data.replace(/laboratoryPageUrl:('|")?.+('|")?,?/g,function (word){
        return 'laboratoryPageUrl:"http://10.200.48.150/{projectCode}-{labCode}/#/notebook/2A94M5J1Z",';
    });
    data = data.replace(/dwConnectUrl:('|")?.+('|")?,?/g,function (word){
        return 'dwConnectUrl:"jdbc:hive2://dl-rc-optd-ambari-master-v-test-1.host.dataengine.com:10000",';
    });
    data = data.replace(/serverUrl:('|")?.+('|")?,?/g,function (word){
        return 'serverUrl:"jdbc:hive2://dl-rc-optd-ambari-master-v-test-1.host.dataengine.com:10000",';
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
function modifyLoginUrl(){
    var file = "/src/stylesheets/login/assets/js/scripts.js";
    var data = fs.readFileSync(__dirname + file,'utf-8');
    data = data + "";
    data = data.replace(/bluesharpweb/g,function (word){
        return 'bluesharpwebtest';//"development",
    });
    fs.writeFile(__dirname + file, data, function(err){
        if(err){
            console.log("error! " + file);
            console.log(err);
        }else{
            console.log("scripts.js success! ");
        }
    });
}
modifyLogin();
modifyConstant();
modifyLoginBackGroudImg();
modifyLoginUrl();




