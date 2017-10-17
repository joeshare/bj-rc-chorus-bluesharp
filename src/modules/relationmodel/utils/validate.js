/**
 * Created by AnThen on 2017-4-10.
 */


//'必须是字母、数字、_，且以字母开头'
function validateAlphaNum_(v){
    return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(v);
}
//'必须是字母、数字、_，中文'
function validateAlphaNumChinese_(v){
    return /^[a-zA-Z]*[\u4e00-\u9fa5]*[a-zA-Z0-9_]*$/.test(v);
}
/**
 * 关系编码校验
 * @param v
 */
function relationCode(v){
    let success=true;
    let msg=null;
    let tmp=$.trim(v);
    if(!tmp){
        success=false;
        msg='请输入关系编码';
    }else if(!validateAlphaNum_(tmp)){
        success=false;
        msg='必须是字母、数字、_，且以字母开头';
    }
    return {
        success,
        msg
    }
};

/**
 * 关系名称校验
 * @param v
 */
function relationName(v){
    let success=true;
    let msg=null;
    let tmp=$.trim(v);
    if(!tmp){
        success=false;
        msg='输入关系名称';
    }
    return {
        success,
        msg
    }
};

/**
 * 关系描述校验
 * @param v
 */
function relationDesc(v){
    return !!1;
};


/**
 * 属性编码校验
 * @param v
 */
function propertyCode(v){
    let success=true;
    let msg=null;
    let tmp=$.trim(v);
    if(!tmp){
        success=false;
        msg='必填项';
    }else if(!validateAlphaNum_(tmp)){
        success=false;
        msg='必须是字母、数字、_，且以字母开头';
    }
    return {
        success,
        msg
    }
}
/**
 * 属性名称校验
 * @param v
 */
function propertyName(v){
    let success=true;
    let msg=null;
    let tmp=$.trim(v);
    if(!tmp){
        success=false;
        msg='必填项';
    }else if(!validateAlphaNumChinese_(tmp)){
        success=false;
        msg='必须是字母、数字、_、中文';
    }
    return {
        success,
        msg
    }
}
/**
 * 属性数据类型校验
 * @param v
 */
function propertyType(v){
    let success=true;
    let msg=null;
    if(!v){
        success=false;
        msg='必填项';
    }
    return {
        success,
        msg
    }
}

/**
 * 安全等级
 * @param v
 */
function securityLevel(v){
    let success=true;
    let msg=null;
    if(!v){
        success=false;
        msg='必填项';
    }
    return {
        success,
        msg
    }
}
function arrRepeat(arr) {
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        var index=arr.lastIndexOf(str);
        if (arr.indexOf(str) != arr.lastIndexOf(str)) {
            return {success:true,index};
        }
    };
    return {success:false,index:-1};
}
function propertyListCodeRepeat(list){
    let arr=[];
    list.forEach(o=>{
        arr.push(o.propertyCode);
    })
    console.log(arr)
    return arrRepeat(arr)

}
export default {
    relationCode,
    relationName,
    relationDesc,
    propertyCode,
    propertyName,
    propertyType,
    securityLevel,
    propertyListCodeRepeat
}

