
//var rsaService = require('node-rsa');

function fetchEntry(pd,usr,$errMsg){
    $.ajax({
        url:"http://bluesharpweb.dataengine.com/server/api/login/entry",
        method:'POST',
        data:{
            password: pd,// $.md5(pd)
            login_name:usr
        },
        success:function(res){
            if(!res.code){
                window.location.href="/#/projectmanagement";
            }else{
                //屏蔽后端异常
                //$('#errMsg').text(res.msg)
                $errMsg.removeClass('msg-info').text("用户名或密码错误，请联系管理员")
            }
        }
    })
}
function doSubmit(){
    var $errMsg=$('#errMsg');
    $errMsg.addClass('msg-info').text("登录中...");
    var pd=$('#password').val();
    var usr=$('#username').val();
    if(!pd||!usr){
        $errMsg.removeClass('msg-info').text('用户名密码不能为空！')
        return;
    }
    let clientKey = new window.rsaService({b: 512});
    $.when( $.ajax({
        url:"http://bluesharpweb.dataengine.com/server/api/getPublicKey",
        method:'POST'
    }) ).then(function(data, textStatus, jqXHR){
        console.log( data); // alerts 200
        if(data&&data.publickey){
            clientKey.importKey(data.publickey);
            pd = clientKey.encrypt(pd, 'base64');
            usr=  clientKey.encrypt(usr, 'base64');
            fetchEntry(pd,usr,$errMsg)
        }
    });

}
