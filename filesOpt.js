/**
 * Created by AnThen on 2016-11-24.
 */
'use strict';
let fs = require("fs");
let path = require("path");
/**
 * 删除文件夹
 * @param path
 */
let deleteFolder =(path)=> {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
/**
 * 清空文件夹
 * @param path
 */
let emptyFolder =(path)=> {
    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isFile()) { // recurse
                // delete file
                fs.unlinkSync(curPath);
            }
        });
    }
}
/**
 * 创建多级文件夹
 * @param dirpath
 * @param mode
 * @returns {boolean}
 */
function mkdirsSync(dirpath, mode) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }else {
                pathtmp = dirname;
            }
            if(!pathtmp){//Linux 下第一个是空字符串""
                return ;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true;
}
/**
 * 复制文件夹（在复制目录前需要判断该目录是否存在，不存在需要先创建目录）
 * @param src
 * @param dst
 */
let copyFolder = ( src, dst )=>{
    //目标路径判断，没有就新建
    if(!fs.existsSync(dst)){
        mkdirsSync(dst);
    }
    //源路径判断
    if( fs.existsSync(src)) {
        // 读取目录中的所有文件/目录
        let files = fs.readdirSync(src);
        files.forEach(function( file ){
            let _src = src + '/' + file;
            let _dst = dst + '/' + file;
            let  readable=null;
            let  writable=null;
            if(fs.statSync(_src).isDirectory()) { // recurse
                if( !fs.existsSync(_dst)){
                    fs.mkdirSync(_dst);
                }
                copyFolder(_src,_dst);
            }else { // copy file
                // 创建读取流
                readable = fs.createReadStream( _src );
                // 创建写入流
                writable = fs.createWriteStream( _dst );
                // 通过管道来传输流
                readable.pipe( writable );
            }
        });
    }
};
/**
 * 复制文件
 * @param srcFile 文件
 * @param dst 目标路径
 */
let copyFile=(srcFile,dst)=>{
    //源路径判断
    if( fs.existsSync(srcFile)) {
       //目标路径判断，没有就新建
        if(!fs.existsSync(dst)){
            mkdirsSync(dst);
        }
        let tmpArr=srcFile.split(path.sep);
        let fileName = tmpArr[tmpArr.length-1];
        let dstFile =  path.join(dst, fileName);
        let  readable=null;
        let  writable=null;
        // 创建读取流
        readable = fs.createReadStream( srcFile );
        // 创建写入流
        writable = fs.createWriteStream( dstFile );
        // 通过管道来传输流
        readable.pipe( writable );
    }
}
let copyReplaceFile=(srcFile,dst,reg,replaceStr)=>{
    let tmpArr=srcFile.split(path.sep);
    let fileName = tmpArr[tmpArr.length-1];
    let dstFile =  path.join(dst, fileName);
    var data = fs.readFileSync(srcFile,'utf-8');
    //console.log(data)
    //console.log(reg,replaceStr)
    //console.log("dstFile",dstFile)
    data = data + "";
    data = data.replace(reg,function (word){
        console.log("---------",word)
        console.log("---------",replaceStr)
        return replaceStr;
    });
    fs.writeFile(dstFile, data, function(err){
        if(err){
            console.log(err);
        }else{
            console.log(`copyReplaceFile ${srcFile} success! `);
        }
    });
}
//example
//deleteFolder(path.resolve(__dirname,'./dist/css'));
//copyFolder(path.resolve(__dirname,'./src/css'),path.resolve(__dirname,'./dist/css'));
//copyFolder(path.resolve(__dirname,'./src/js/lib'),path.resolve(__dirname,'./dist/js/lib'));
//copyFile(path.resolve(__dirname,'./src/js/lib/bootstrap/bootstrap.min.css'),path.resolve(__dirname,'./dist/js/lib/bootstrap/'));
//emptyFolder(path.resolve(__dirname,'./dist/js/lib/bootstrap/'))
module.exports={
    deleteFolder:deleteFolder,
    copyFolder:copyFolder,
    copyFile:copyFile,
    emptyFolder:emptyFolder,
    copyReplaceFile:copyReplaceFile
};