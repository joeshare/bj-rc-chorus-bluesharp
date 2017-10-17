/**
 * Created by AnThen on 2017-4-10.
 */


//'必须是字母、数字、_，且以字母开头'
function validateAlphaNum_(v){
    return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(v);
}
//'必须是字母、数字、_，中文'
function validateAlphaNumChinese_(v){
    return /^([a-zA-Z0-9_]|[\u4e00-\u9fa5])*$/.test(v);
}
/**
 * 实体编码校验
 * @param v
 */
function entityCode(v){
    let success=true;
    let msg=null;
    let tmp=$.trim(v);
    if(!tmp){
        success=false;
        msg='请输入实体编码';
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
 * 实体编码长度限制
 * @param v
 */
function setEntityCodeLength(v){
    let tmp=v;
    if(tmp&&tmp.length>25){
        tmp=tmp.substr(0,25);
    }
    return tmp;
}
/**
 * 实体名称校验
 * @param v
 */
function entityName(v){
    let success=true;
    let msg=null;
    let tmp=$.trim(v);
    if(!tmp){
        success=false;
        msg='请输入实体名称';
    }
    return {
        success,
        msg
    }
};
/**
 * 实体名称长度限制
 * @param v
 * @returns {*}
 */
function setEntityNameLength(v){
    let tmp=v;
    if(tmp&&tmp.length>20){
        tmp=tmp.substr(0,20);
    }
    return tmp;
}
/**
 * 实体描述校验
 * @param v
 */
function entityDesc(v){
    return !!1;
};
/**
 * 实体描述长度限制
 * @param v
 * @returns {*}
 */
function setEntityDescLength(v){
    let tmp=v;
    if(tmp&&tmp.length>50){
        tmp=tmp.substr(0,50);
    }
    return tmp;
}
/**
 *  实体类型校验
 * @param v
 */
function entityType(v){
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
 * 设置属性编码长度
 * @param v
 */
function setPropertyCodeLength(v){
    let tmp=v;
    if(tmp&&tmp.length>20){
        tmp=tmp.substr(0,20);
    }
    return tmp;
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
 * 设置属性名称长度
 * @param v
 * @returns {*}
 */
function setPropertyNameLength(v){
    let tmp=v;
    if(tmp&&tmp.length>20){
        tmp=tmp.substr(0,20);
    }
    return tmp;
}
/**
 * 属性数据类型校验
 * @param v
 */
function propertyDatatype(v){
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
 * 设置属性描述长度
 * @param v
 * @returns {*}
 */
function setPropertyDesc(v){
    let tmp=v;
    if(tmp&&tmp.length>50){
        tmp=tmp.substr(0,50);
    }
    return tmp;
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
    entityCode,
    entityName,
    entityDesc,
    entityType,
    propertyCode,
    propertyName,
    propertyDatatype,
    securityLevel,
    propertyListCodeRepeat
}

