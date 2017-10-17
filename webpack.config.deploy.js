/**
 * Created by AnThen on 2016-11-23.
 */
'use strict';
let path = require("path");
let webpack = require("webpack");
let webpackBase = require("./webpack.config.base.js");
let filesOpt = require("./filesOpt.js");
let fs = require("fs");
function replaceFile(srcFile,dst,reg1,reg2,replaceStr1,replaceStr2,reg3,replaceStr3){
    let tmpArr=srcFile.split(path.sep);
    let fileName = tmpArr[tmpArr.length-1];
    let dstFile =  path.join(dst, fileName );
    var data = fs.readFileSync(srcFile,'utf-8');
    //console.log(data)
    //console.log(reg,replaceStr)
    //console.log("dstFile",dstFile)
    data = data + "";
    data = data.replace(reg1,function (word){
        return replaceStr1;
    });
    data = data.replace(reg2,function (word){
        return replaceStr2;
    });

    if(reg3)
    {
        data = data.replace(reg3,function (word){
            return replaceStr3;
        });
    }
    fs.writeFile(dstFile, data, function(err){
        if(err){
            console.log(err);
        }else{
            console.log(`copyReplaceFile ${srcFile} success! `);
        }
    });
}
replaceFile(path.resolve(__dirname,'./index.html'),path.resolve(__dirname,'./dist'),/src="\/dist/g,/href="\/dist/g,'src=".','href=".')
replaceFile(path.resolve(__dirname,'./login.html'),path.resolve(__dirname,'./dist'),/src="\/dist/g,/href="\/dist/g,'src=".','href=".',/url\(\/dist/g,'url(\.')
replaceFile(path.resolve(__dirname,'./welcome.html'),path.resolve(__dirname,'./dist'),/src="\/dist/g,/href="\/dist/g,'src=".','href=".')

let cfg = Object.assign(webpackBase, {
});
//entry
Object.getOwnPropertyNames((webpackBase.entry || {})).map(function (name) {
    cfg.entry[name] = [].concat(webpackBase.entry[name])
});

//plugins
cfg.plugins = (webpackBase.plugins || []).concat(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
)
module.exports = cfg;